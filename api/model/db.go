package model

import (
	"github.com/jinzhu/gorm"
)

type model struct {
	Host     string
	Username string
	Password string
	DBName   string
}

// DB global variable
var DB *gorm.DB

// New MySQLに接続する
func New() *gorm.DB {
	d := &model{
		Host:     "localhost",
		Username: "root",
		Password: "",
		DBName:   "hash",
	}
	db, err := gorm.Open("mysql", d.Username+":"+d.Password+"@tcp("+d.Host+")/"+d.DBName+"?charset=utf8&parseTime=True&loc=Local")
	if err != nil {
		panic(err.Error())
	}
	DB = db
	return DB
}

// Init マイグレーション
func Init() {
	DB.AutoMigrate(&User{})
	return
}

// func (d *DB) connect() *gorm.DB {
// 	db, err := gorm.Open("mysql", d.Username+":"+d.Password+"@tcp("+d.Host+")/"+d.DBName+"?charset=utf8&parseTime=True&loc=Local")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	return db
// }

// func (db *DB) Create(value interface{}) *gorm.DB {
// 	return db.Connect.Create(value)
// }

// func (db *DB) Exec(sql string, values ...interface{}) *gorm.DB {
// 	return db.Connect.Exec(sql, values...)
// }

// func (db *DB) Find(out interface{}, where ...interface{}) *gorm.DB {
// 	return db.Connect.Find(out, where...)
// }

// func (db *DB) First(out interface{}, where ...interface{}) *gorm.DB {
// 	return db.Connect.First(out, where...)
// }

// func (db *DB) NewRecord(value interface{}) bool {
// 	fmt.Println(value)
// 	return db.Connect.NewRecord(value)
// }

// func (db *DB) Raw(sql string, values ...interface{}) *gorm.DB {
// 	return db.Connect.Raw(sql, values...)
// }

// func (db *DB) Save(value interface{}) *gorm.DB {
// 	return db.Connect.Save(value)
// }

// func (db *DB) Where(query interface{}, args ...interface{}) *gorm.DB {
// 	return db.Connect.Where(query, args...)
// }
