package handler

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/kittyguys/hash/api/interfaces"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/repository"

	"github.com/jinzhu/gorm"

	"github.com/labstack/echo"
)

// NewUserHandler Initialize user repository
func NewUserHandler(conn *gorm.DB) *UserHandler {
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
	u := &model.User{}
	if err := c.Bind(u); err != nil {
		return err
	}

	if err := h.repo.SignUp(u); err != nil {
		return err
	}

	if u.Email != "" || u.Password != "" {

		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["admin"] = true
		claims["uid"] = u.UID
		claims["name"] = u.Name
		claims["iat"] = time.Now()
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
		tokenString, _ := token.SignedString([]byte(Key))
		data := map[string]interface{}{"token": tokenString}

		return c.JSON(http.StatusCreated, data)
	}

	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
}

// Login log in
func (h *UserHandler) Login(c echo.Context) (err error) {
	var body echo.Map
	var token string
	if err = c.Bind(&body); err != nil {
		return
	}

	h.repo.Login(&token, body)

	if token != "" {
		data := map[string]interface{}{"token": token}

		return c.JSON(http.StatusCreated, data)
	}

	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
}

// // GetUserByID for getting user info by ID
// func (h *UserHandler) GetUserByID(c echo.Context) (err error) {
// 	var u model.User
// 	var tags []model.Tag
// 	var id string
// 	uid, _ := xid.FromString(id)

// 	h.Conn.First(&u, model.User{UID: uid})
// 	h.Conn.Model(&u).Association("Tags").Find(&tags)

// 	data := map[string]interface{}{"uid": u.UID, "name": u.Name, "tags": tags}

// 	if err != nil {
// 		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
// 	}

// 	return c.JSON(http.StatusCreated, data)
// }

// // GetUserByTag UIDでユーザー情報を取得
// func (h *UserHandler) GetUserByTag(c echo.Context) (err error) {
// 	var users []model.User
// 	var uid []xid.ID
// 	t := &model.Tag{}
// 	if err = c.Bind(t); err != nil {
// 		return
// 	}

// 	h.Conn.Where("tags.name=?", t.Name).Select("DISTINCT(uid)").Joins("JOIN user_tags ON user_tags.user_id = users.id").
// 		Joins("JOIN tags ON user_tags.tag_id=tags.id").Find(&users)
// 	for _, v := range users {
// 		uid = append(uid, v.UID)
// 	}

// 	data := map[string]interface{}{"uid": uid}

// 	if err != nil {
// 		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
// 	}

// 	return c.JSON(http.StatusCreated, data)
// }
