package model

import (
	"github.com/jinzhu/gorm"
	"github.com/rs/xid"
)

// Tag TagSchema
type Tag struct {
	gorm.Model
	Name    string   `json:"name"`
	Subtags []Subtag `gorm:"many2many:tag_subtags;"`
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
