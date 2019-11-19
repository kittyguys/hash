package main

import (
	"github.com/kittyguys/hash/api/common"
	"github.com/kittyguys/hash/api/config"
	"github.com/kittyguys/hash/api/db"
	"github.com/kittyguys/hash/api/handler"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"

	_ "github.com/go-sql-driver/mysql"
)

func init() {
	config := config.New()

	db.New(config)
}

func main() {
	config := config.New()
	db := db.GetDB()
	defer db.Close()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.CORS())
	e.Use(middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(config.KEY.JWT),
		Skipper:    common.IsAllowdPath,
	}))

	// // Initialize handler
	handler.NewRouter(db, e)

	// Start server
	e.Logger.Fatal(e.Start(":8080"))
}
