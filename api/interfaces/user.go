package interfaces

import (
	"fmt"
	"net/http"

	repo "github.com/kittyguys/hash/api/repository"

	"github.com/jinzhu/gorm"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/utils"
	"github.com/labstack/echo"
	"github.com/rs/xid"
)

// NewUserRepo Initialize user repository
func NewUserRepo(conn *gorm.DB) repo.UserRepo {
	return &UserRepo{
		Conn: conn,
	}
}

// UserHandler Handler with DB
type UserRepo struct {
	Conn *gorm.DB
}

// Signup sign up
func (h *UserRepo) SignUp(c echo.Context) (err error) {
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
	if !h.Conn.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := h.Conn.Create(&u).Error; err != nil {
		panic(err.Error())
	}
	fmt.Println(u)

	return c.JSON(http.StatusCreated, u)
}

func (h *UserRepo) Login(c echo.Context) (err error) {
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
	if !h.Conn.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := h.Conn.Create(&u).Error; err != nil {
		panic(err.Error())
	}
	fmt.Println(u)

	return c.JSON(http.StatusCreated, u)
}
