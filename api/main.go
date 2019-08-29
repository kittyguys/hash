package main

import (
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/kittyguys/hash/api/auth"
	"github.com/kittyguys/hash/api/model"
)

func init() {
	model.New()
	model.Init()
}

func main() {
	defer model.DB.Close()

	r := mux.NewRouter()
	r.Handle("/signup", auth.Login).Methods("POST")

	// サーバー起動
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal("ListenAndServe:", nil)
	}
	fmt.Println("Server starts on 8080")
}
