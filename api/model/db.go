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
	DB.AutoMigrate(&User{}, &Tag{})
	return
}

// func (d *DB) connect() *gorm.DB {
// 	db, err := gorm.Open("mysql", d.Username+":"+d.Password+"@tcp("+d.Host+")/"+d.DBName+"?charset=utf8&parseTime=True&loc=Local")
// 	if err != nil {
// 		panic(err.Error())
// 	}
// 	return db
// }

// Create 保存
func Create(value interface{}) *gorm.DB {
	return DB.Create(value)
}

// func (db *DB) Exec(sql string, values ...interface{}) *gorm.DB {
// 	return db.Connect.Exec(sql, values...)
// }

// Find 検索
func Find(out interface{}, where ...interface{}) *gorm.DB {
	return DB.Find(out, where...)
}

// func (db *DB) First(out interface{}, where ...interface{}) *gorm.DB {
// 	return db.Connect.First(out, where...)
// }

// NewRecord 新しいレコード
func NewRecord(value interface{}) bool {
	return DB.NewRecord(value)
}

// func (db *DB) Raw(sql string, values ...interface{}) *gorm.DB {
// 	return db.Connect.Raw(sql, values...)
// }

// Save SAVE
func Save(value interface{}) *gorm.DB {
	return DB.Save(value)
}

// func (db *DB) Where(query interface{}, args ...interface{}) *gorm.DB {
// 	return db.Connect.Where(query, args...)
// }
