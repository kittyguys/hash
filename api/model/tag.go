package model

import (
	"github.com/jinzhu/gorm"
	"github.com/rs/xid"
)

// Tag TagSchema
type Tag struct {
	gorm.Model
	Name  string `json:"name"`
	Users []User `gorm:"many2many:user_tags;"`
}

// Tags List of Tag
type Tags struct {
	T []Tag
}

// Create リクエストBODY
type Create struct {
	Tag string `json:"tag"`
	UID xid.ID `json:"uid"`
}
