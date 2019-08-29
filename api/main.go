package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/route"
)

func init() {
	model.New()
	model.Init()
}

func main() {
	defer model.DB.Close()

	// サーバー起動
	l, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server is running")
	if err := http.Serve(l, route.HandleRoutes()); err != nil {
		log.Fatal("ListenAndServe:", nil)
	} else {
		fmt.Println("Server starts on 8080")
	}
}
