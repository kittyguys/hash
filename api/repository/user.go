package repository

import (
	"github.com/kittyguys/hash/api/model"
	"github.com/labstack/echo"
)

// UserRepository Define user method
type UserRepository interface {
	SignUp(u *model.User) error
	Login(t *string, n echo.Map) error
}
