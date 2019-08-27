package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Conn() (db *sql.DB) {
	db, err := sql.Open("mysql", "root:@/hash")
	if err != nil {
		log.Fatal("db error.")
	}
	return db
}

func Insert(db *sql.DB) int64 {
	stmt, err := db.Prepare("INSERT userinfo SET username=?,departname=?,created=?")
	if err != nil {
		fmt.Println(err)
		log.Fatal("db error.1")
	}
	res, err := stmt.Exec("finalize", "software", "2019-08-11")
	if err != nil {
		fmt.Println(err)
		log.Fatal("db error.2")
	}
	id, err := res.LastInsertId()
	if err != nil {
		log.Fatal("db error.3")
	}
	return id
}
