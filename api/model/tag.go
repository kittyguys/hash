package model

import (
	"github.com/jinzhu/gorm"
	"github.com/rs/xid"
)

// Tag TagSchema
type Tag struct {
	gorm.Model
	Name string `json:"name"`
}

// AddTagBody リクエストBODY
type AddTagBody struct {
	Name string `json:"name"`
	UID  xid.ID `json:"uid"`
}
