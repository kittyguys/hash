package handler

import (
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

var router *mux.Router

type (
	Handler struct {
		DB *gorm.DB
	}
)

const (
	Key = "secret"
)

// InitializeRouter Init Router
func InitializeRouter(db *gorm.DB, e *echo.Echo) *echo.Echo {
	h := &Handler{DB: db}

	e.POST("/signup", h.Signup)
	e.POST("/login", h.Login)
	e.POST("/tags/create", h.AddTag)
	// e.POST("/posts", h.CreatePost)
	// e.GET("/feed", h.FetchPost)

	return e
}
