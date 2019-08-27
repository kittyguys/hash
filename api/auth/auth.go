package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	jwt "github.com/dgrijalva/jwt-go"
	utils "github.com/kittyguys/hash/api/utils/crypto"
)

type User struct {
	Uid      string `json:"uid"`
	Password string `json:"password"`
}

// GetTokenHandler get token
var Login = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	var u User
	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	pws := []byte(u.Password)
	hash := utils.HashAndSalt(pws)
	fmt.Println(hash)

	fmt.Println(utils.ComparePasswords(hash, []byte("a")))

	// headerのセット
	token := jwt.New(jwt.SigningMethodHS256)

	// claimsのセット
	claims := token.Claims.(jwt.MapClaims)
	claims["admin"] = true
	claims["sub"] = "54546557354"
	claims["name"] = "taro"
	claims["iat"] = time.Now()
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	// 電子署名
	tokenString, _ := token.SignedString([]byte(os.Getenv("SUSHI")))

	// JWTを返却
	w.Write([]byte(tokenString))
})

// JwtMiddleware check token
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SUSHI")), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})
