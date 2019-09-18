package model

import (
	"github.com/jinzhu/gorm"
)

// Subtag TagSchema
type Subtag struct {
	gorm.Model
	Name string `json:"name"`
	Tags []Tag  `gorm:"many2many:tag_subtags;"`
}

// Subtag List of Tag
type Subtags struct {
	T []Tag
}
