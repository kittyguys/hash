package handler

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/kittyguys/hash/api/db"
	repo "github.com/kittyguys/hash/api/repository"

	"github.com/dgrijalva/jwt-go"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/utils"
	"github.com/rs/xid"
)

// UserHandler as a handler for user
type UserHandler struct {
	users repo.UserRepo
}

func (handler *UserHandler) signUp(w http.ResponseWriter, r *http.Request) {
	var u model.User
	db := db.GetDB()
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	pwd := []byte(u.Password)
	hash := utils.HashAndSalt(pwd)
	uid := xid.New()

	u.UID = uid
	u.Password = hash

	if !db.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := db.Create(&u).Error; err != nil {
		panic(err.Error())
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["sub"] = u.UID
	claims["name"] = u.Name
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, _ := token.SignedString([]byte(os.Getenv("SUSHI")))

	w.Write([]byte(tokenString))
}

func (handler *UserHandler) login(w http.ResponseWriter, r *http.Request) {
	var u model.User
	db := db.GetDB()
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	pwd := []byte(u.Password)

	db.Find(&u, model.User{Name: u.Name})

	if utils.ComparePasswords(u.Password, pwd) {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["admin"] = true
		claims["sub"] = u.UID
		claims["name"] = u.Name
		claims["iat"] = time.Now()
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
		tokenString, _ := token.SignedString([]byte(os.Getenv("YOUONLYLIVEONCE")))
		w.Write([]byte(tokenString))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("401 - Unauthorized"))
	}
}

// JwtMiddleware トークンを確認
// var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
// 	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
// 		return []byte(os.Getenv("YOUONLYLIVEONCE")), nil
// 	},
// 	SigningMethod: jwt.SigningMethodHS256,
// })
