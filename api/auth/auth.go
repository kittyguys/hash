package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/utils"
	"github.com/rs/xid"
)

// SignUp ユーザー登録
var SignUp = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(&w)
	var u model.User
	db := model.New()
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
})

// Login ログイン
var Login = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	var u model.User
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&u)
	fmt.Println(u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
	pws := []byte(u.Password)
	hash := utils.HashAndSalt(pws)

	fmt.Println(utils.ComparePasswords(hash, []byte("a")))

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["sub"] = "54546557354"
	claims["name"] = "taro"
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	tokenString, _ := token.SignedString([]byte(os.Getenv("YOUONLYLIVEONCE")))
	w.Write([]byte(tokenString))
})

// JwtMiddleware トークンを確認
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("YOUONLYLIVEONCE")), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})
