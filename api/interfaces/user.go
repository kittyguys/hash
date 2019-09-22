package interfaces

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"github.com/kittyguys/hash/api/model"
	"github.com/kittyguys/hash/api/repository"
	"github.com/kittyguys/hash/api/utils"
	"github.com/labstack/echo"
	"github.com/rs/xid"
)

// NewUserRepo Initialize user repository
func NewUserRepo(conn *gorm.DB) repository.UserRepository {
	return &UserRepository{
		Conn: conn,
	}
}

// UserRepository Handler with DB
type UserRepository struct {
	Conn *gorm.DB
}

// SignUp SignUp
func (h *UserRepository) SignUp(u *model.User) error {

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
func (h *UserRepository) Login(t *string, b echo.Map) error {
	u := &model.User{}

	// Validate
	if u.Email == "" || u.Password == "" {
		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid cred")
	}

	h.Conn.Find(&u, model.User{Name: b["name"].(string)})
	pwd := []byte(b["password"].(string))

	if utils.ComparePasswords(u.Password, pwd) {
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["admin"] = true
		claims["sub"] = u.UID
		claims["name"] = u.Name
		claims["iat"] = time.Now()
		claims["exp"] = time.Now().Add(time.Hour * 24 * 90).Unix()
		tokenString, _ := token.SignedString([]byte("secret"))

		*t = tokenString
	}

	return nil
}
