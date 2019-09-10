package handler

import (
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

var router *mux.Router

type (
	Handler struct {
		DB *gorm.DB
	}
)

const (
	Key = "secret"
)

// // InitializeRouter Init Router
// func InitializeRouter() *mux.Router {
// 	router = mux.NewRouter()

// 	router.HandleFunc("/signup", signUp).Methods("POST")
// 	// router.HandleFunc("/login", login).Methods("POST")
// 	// router.HandleFunc("/tags/create", AddTag).Methods("POST")
// 	// router.HandleFunc("/users/{id}", GetUserByID).Methods("GET")
// 	// router.HandleFunc("/tags", GetUserByTag).Methods("GET")
// 	return router
// }
