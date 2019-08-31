package model

import "github.com/rs/xid"

// User UserSchema
type User struct {
	UID      xid.ID `json:"uid"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
