package handler

import (
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/kittyguys/hash/api/db"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/utils"
	"github.com/labstack/echo"
	"github.com/rs/xid"
)

// Signup sign up
func (h *Handler) Signup(c echo.Context) (err error) {
	u := &model.User{}
	if err = c.Bind(u); err != nil {
		return
	}

	// Validate
	if u.Email == "" || u.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}

	pwd := []byte(u.Password)
	hash := utils.HashAndSalt(pwd)
	uid := xid.New()

	u.UID = uid
	u.Password = hash

	if !db.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := db.Create(&u).Error; err != nil {
		panic(err.Error())
	}

	return c.JSON(http.StatusCreated, u)
}

// Login log in
func (h *Handler) Login(c echo.Context) (err error) {
	u := &model.User{}
	if err = c.Bind(u); err != nil {
		return
	}
	pwd := []byte(u.Password)
	fmt.Println(c.Request().Body)

	db.Find(&u, model.User{Name: u.Name})

	if utils.ComparePasswords(u.Password, pwd) {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["admin"] = true
		claims["sub"] = u.UID
		claims["name"] = u.Name
		claims["iat"] = time.Now()
		claims["exp"] = time.Now().Add(time.Hour * 24).Unix()
		tokenString, _ := token.SignedString([]byte(Key))
		return c.JSON(http.StatusCreated, tokenString)
	}

	return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
}

// GetUserByID for getting user info by ID
func (h *Handler) GetUserByID(c echo.Context) (err error) {
	var u model.User
	var tags []model.Tag
	var id string
	uid, _ := xid.FromString(id)
	db := db.GetDB()

	db.First(&u, model.User{UID: uid})
	db.Model(&u).Association("Tags").Find(&tags)

	data := map[string]interface{}{"uid": u.UID, "name": u.Name, "tags": tags}

	if err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}

	return c.JSON(http.StatusCreated, data)
}

// GetUserByTag UIDでユーザー情報を取得
func (h *Handler) GetUserByTag(c echo.Context) (err error) {
	var users []model.User
	var uid []xid.ID
	t := &model.Tag{}
	if err = c.Bind(t); err != nil {
		return
	}
	db := db.GetDB()
	db.Where("tags.name=?", t.Name).Select("DISTINCT(uid)").Joins("JOIN user_tags ON user_tags.user_id = users.id").
		Joins("JOIN tags ON user_tags.tag_id=tags.id").Find(&users)
	for _, v := range users {
		uid = append(uid, v.UID)
	}

	data := map[string]interface{}{"uid": uid}

	if err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}

	return c.JSON(http.StatusCreated, data)
}
