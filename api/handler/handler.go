package handler

import (
	"database/sql"

	"github.com/labstack/echo"
)

// NewRouter Init Router
func NewRouter(db *sql.DB, e *echo.Echo) *echo.Echo {
	user := NewUserHandler(db)
	// Auth
	e.POST("/signup", user.SignUp)
	e.POST("/signin", user.Signin)
	// // User
	// e.GET("/users/:id", user.GetUser)
	// e.POST("/users/:id/tags", user.CreateTag)
	// // Tag
	// e.GET("/tags/:name/users", tag.GetUsers)
	return e
}
