package model

import (
	"github.com/jinzhu/gorm"
	"github.com/rs/xid"
)

// User UserModel
type User struct {
	gorm.Model
	UID      xid.ID `json:"uid"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Tags     []Tag  `gorm:"many2many:user_tags;"`
}

// Users Slice of User
var Users []User
