package model

import (
	"github.com/jinzhu/gorm"
)

// User UserModel
type User struct {
	gorm.Model
	HashID      string `json:"hashID"`
	DisplayName string `json:"displayName"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Tags        []Tag  `gorm:"many2many:user_tags;"`
}

// Users Slice of User
var Users []User
