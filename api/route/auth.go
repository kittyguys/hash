package route

import (
	"github.com/gorilla/mux"
	"github.com/kittyguys/hash/api/auth"
)

var router *mux.Router

func HandleRoutes() *mux.Router {
	router = mux.NewRouter()
	router.HandleFunc("/signup", auth.SignUp).Methods("POST")
	router.HandleFunc("/login", auth.Login).Methods("POST")
	return router
}
