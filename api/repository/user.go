package repo

import "github.com/labstack/echo"

type UserRepo interface {
	SignUp(c echo.Context) error
	Login(c echo.Context) error
}
