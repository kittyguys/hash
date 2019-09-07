package route

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/utils"
	"github.com/rs/xid"
)

var router *mux.Router

// HandleRoutes 認証用のルートを定義
func HandleRoutes() *mux.Router {
	router = mux.NewRouter()
	router.HandleFunc("/signup", signUp).Methods("POST")
	router.HandleFunc("/login", login).Methods("POST")
	router.HandleFunc("/tags/create", AddTag).Methods("POST")
	router.HandleFunc("/users/{id}", GetUserByID).Methods("GET")
	router.HandleFunc("/tags", GetUserByTag).Methods("GET")
	return router
}

// SignUp ユーザー登録
var signUp = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u model.User
	db := model.DB
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
var login = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u model.User
	db := model.DB
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
})

// JwtMiddleware トークンを確認
var JwtMiddleware = jwtmiddleware.New(jwtmiddleware.Options{
	ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("YOUONLYLIVEONCE")), nil
	},
	SigningMethod: jwt.SigningMethodHS256,
})
