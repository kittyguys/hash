package interfaces

import (
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

// UserRepo Handler with DB
type UserRepo struct {
	Conn *gorm.DB
}

// SignUp SignUp
func (h *UserRepo) SignUp(u *model.User) error {

	// Validate
	if u.Email == "" || u.Password == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid cred")
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

	return nil
}

// Login Login
func (h *UserRepo) Login(u *model.User) error {

	// Validate
	if u.Email == "" || u.Password == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid cred")
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

	return nil
}
