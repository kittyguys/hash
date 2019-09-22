package handler

import (
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

var router *mux.Router

type (
	// Handler Handler
	Handler struct {
		DB *gorm.DB
	}
)

const (
	// Key This should be imported from somewhere else
	Key = "secret"
)

// InitializeRouter Init Router
func InitializeRouter(db *gorm.DB, e *echo.Echo) *echo.Echo {
	// h := &Handler{DB: db}
	u := NewUserHandler(db)
	// Auth
	e.POST("/signup", u.SignUp)
	e.POST("/login", u.Login)
	// // User
	e.GET("/users/:id", u.GetUser)
	// // Tag
	// e.POST("/tags", h.Create)
	//e.GET("/tags/:name/users", h.GetUserByTag)
	return e
}
