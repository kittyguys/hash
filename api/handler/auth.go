package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

// TwitterLogin TwitterLogin
func (h *TagHandler) TwitterLogin(c echo.Context) (err error) {

	return c.JSON(http.StatusCreated, "data")
}
