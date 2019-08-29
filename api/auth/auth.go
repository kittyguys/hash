package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/kittyguys/hash/api/database/schema"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	database "github.com/kittyguys/hash/api/database/mysql"
	utils "github.com/kittyguys/hash/api/utils/crypto"
)

var SignUp = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	var u schema.User
	db := database.NewDB()
	if r.Body == nil {
		fmt.Println("a")

		http.Error(w, "Please send a request body", 400)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		fmt.Println("a")

		http.Error(w, err.Error(), 400)
		return
	}

	pwd := []byte(u.Password)
	hash := utils.HashAndSalt(pwd)

	u.Password = hash

	if !db.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := db.Create(&u).Error; err != nil {
		panic(err.Error())
	}

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["sub"] = "54546557354"
	claims["name"] = "taro"
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, _ := token.SignedString([]byte(os.Getenv("SUSHI")))

	w.Write([]byte(tokenString))
})

var Login = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u schema.User
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
	fmt.Println(u)
	pws := []byte(u.Password)
	hash := utils.HashAndSalt(pws)
	fmt.Println(hash)

	fmt.Println(utils.ComparePasswords(hash, []byte("a")))

	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["sub"] = "54546557354"
	claims["name"] = "taro"
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
	tokenString, _ := token.SignedString([]byte(os.Getenv("SUSHI")))
	w.Write([]byte(tokenString))
})

// JwtMiddleware check token
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SUSHI")), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})
