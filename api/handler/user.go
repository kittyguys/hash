package handler

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/kittyguys/hash/api/common"
	"github.com/kittyguys/hash/api/interfaces"
	"github.com/kittyguys/hash/api/repository"

	"github.com/labstack/echo"
)

// NewUserHandler Initialize user repository
func NewUserHandler(conn *sql.DB) *UserHandler {
	return &UserHandler{
		repo: interfaces.NewUserRepo(conn),
	}
}

// UserHandler Handler with DB
type UserHandler struct {
	repo repository.UserRepository
}

// SignUp sign up
func (h *UserHandler) SignUp(c echo.Context) (err error) {
	var data repository.SignUp
	if err := c.Bind(&data); err != nil {
		return err
	}

	id := h.repo.SignUp(&data)

	tokenString, err := common.CreateJSONWebToken(id)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	resp := map[string]interface{}{"token": tokenString}
	return c.JSON(http.StatusCreated, resp)
}

// SignIn returns JWT
func (h *UserHandler) SignIn(c echo.Context) (err error) {
	var data repository.SignIn
	var token string
	if err = c.Bind(&data); err != nil {
		return
	}

	id := h.repo.SignIn(&data)

	token, err = common.CreateJSONWebToken(id)
	if err != nil {
		log.Println(err.Error())
		return err
	}

	resp := map[string]interface{}{"token": token}

	return c.JSON(http.StatusCreated, resp)
}

// // Login log in
// func (h *UserHandler) Login(c echo.Context) (err error) {
// 	var body echo.Map
// 	var token string
// 	if err = c.Bind(&body); err != nil {
// 		return
// 	}

// 	h.repo.Login(&token, body)

// 	if token != "" {
// 		data := map[string]interface{}{"token": token}

// 		return c.JSON(http.StatusCreated, data)
// 	}

// 	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
// }

// // GetUser for getting user info by ID
// func (h *UserHandler) GetUser(c echo.Context) (err error) {
// 	var u model.User
// 	var tags []model.Tag
// 	id := c.Param("id")

// 	h.repo.GetUser(&u, &tags, id)

// 	data := map[string]interface{}{"hashID": u.HashID, "displayName": u.DisplayName, "tags": tags}

// 	return c.JSON(http.StatusCreated, data)
// }

// // CreateTag for getting user info by ID
// func (h *UserHandler) CreateTag(c echo.Context) (err error) {
// 	var user model.User
// 	var tags []model.Tag
// 	body := map[string]interface{}{}

// 	if err = c.Bind(&body); err != nil {
// 		return
// 	}

// 	h.repo.CreateTag(&user, &tags, body)

// 	data := map[string]interface{}{"tags": tags}

// 	return c.JSON(http.StatusCreated, data)
// }
