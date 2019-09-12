package main

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/kittyguys/hash/api/db"
	"github.com/kittyguys/hash/api/handler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func init() {
	db.New()
	db.Init()
}

func main() {
	db := db.GetDB()
	defer db.Close()

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(handler.Key),
		Skipper: func(c echo.Context) bool {
			// Skip authentication for and signup login requests
			if c.Path() == "/login" || c.Path() == "/signup" {
				return true
			}
			return false
		},
	}))

	// Initialize handler
	handler.InitializeRouter(db, e)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
