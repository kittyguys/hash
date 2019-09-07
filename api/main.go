package main

import (
	"fmt"
	"log"
	"net"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/route"
	"github.com/rs/cors"
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
	handler := cors.Default().Handler(route.HandleRoutes())
	fmt.Println("Server is running")
	if err := http.Serve(l, handler); err != nil {
		log.Fatal("ListenAndServe:", nil)
	}
}
