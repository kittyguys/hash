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
	h := &Handler{DB: db}
	// Auth
	e.POST("/signup", h.Signup)
	e.POST("/login", h.Login)
	// User
	e.GET("/users/:id", h.GetUserByID)
	// Tag
	e.GET("/tags/:name/users", h.GetUserByTag)
	e.POST("/tags", h.Create)
	return e
}
