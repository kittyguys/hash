package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"

	"github.com/gorilla/mux"
	"github.com/kittyguys/hash/api/auth"
	"github.com/kittyguys/hash/api/db"
)

var private = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r)
	post := &post{
		Title: "VGolangとGoogle Cloud Vision APIで画像から文字認識するCLIを速攻でつくる",
		Tag:   "Go",
		URL:   "https://qiita.com/po3rin/items/bf439424e38757c1e69b",
	}
	json.NewEncoder(w).Encode(post)
})

type post struct {
	Title string `json:"title"`
	Tag   string `json:"tag"`
	URL   string `json:"url"`
}

func main() {
	mysql := db.Conn()
	db.Insert(mysql)
	defer func() {
		fmt.Println("Disconnected from db")
		mysql.Close()
	}()

	r := mux.NewRouter()
	// localhost:8080/publicでpublicハンドラーを実行
	r.Handle("/public", public).Methods("GET", "POST")
	r.Handle("/private", auth.JwtMiddleware.Handler(private))
	r.Handle("/login", auth.Login).Methods("POST")
	fmt.Println("Server starts on 8080")

	//サーバー起動
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal("ListenAndServe:", nil)
	}
}

type User interface{}

var public = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	post := &post{
		Title: "VueCLIからVue.js入門①【VueCLIで出てくるファイルを概要図で理解】",
		Tag:   "Vue.js",
		URL:   "https://qiita.com/po3rin/items/3968f825f3c86f9c4e21",
	}
	json.NewEncoder(w).Encode(post)
})
