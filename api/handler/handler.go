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
	user := NewUserHandler(db)
	//tag := NewTagHandler(db)
	// Auth
	e.POST("/signup", user.SignUp)
	e.POST("/login", user.Login)
	// // User
	e.GET("/users/:id", user.GetUser)
	e.POST("/users/:id/tags", user.CreateTag)
	//e.GET("/tags/:name/users", h.GetUserByTag)
	return e
}
