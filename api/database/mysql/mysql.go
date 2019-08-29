package database

import (
	"fmt"

	"github.com/jinzhu/gorm"

	_ "github.com/go-sql-driver/mysql"
)

type DB struct {
	Host     string
	Username string
	Password string
	DBName   string
	Connect  *gorm.DB
}

func NewDB() *DB {

	db := &DB{
		Host:     "localhost",
		Username: "root",
		Password: "",
		DBName:   "hash",
	}

	db.Connect = db.connect()

	return db
}

func (d *DB) connect() *gorm.DB {
	db, err := gorm.Open("mysql", d.Username+":"+d.Password+"@tcp("+d.Host+")/"+d.DBName+"?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err.Error())
	}
	return db
}

func (db *DB) Create(value interface{}) *gorm.DB {
	return db.Connect.Create(value)
}

func (db *DB) Exec(sql string, values ...interface{}) *gorm.DB {
	return db.Connect.Exec(sql, values...)
}

func (db *DB) Find(out interface{}, where ...interface{}) *gorm.DB {
	return db.Connect.Find(out, where...)
}

func (db *DB) First(out interface{}, where ...interface{}) *gorm.DB {
	return db.Connect.First(out, where...)
}

func (db *DB) NewRecord(value interface{}) bool {
	fmt.Println(value)
	return db.Connect.NewRecord(value)
}

func (db *DB) Raw(sql string, values ...interface{}) *gorm.DB {
	return db.Connect.Raw(sql, values...)
}

func (db *DB) Save(value interface{}) *gorm.DB {
	return db.Connect.Save(value)
}

func (db *DB) Where(query interface{}, args ...interface{}) *gorm.DB {
	return db.Connect.Where(query, args...)
}
