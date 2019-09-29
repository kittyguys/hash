package handler

import (
	"net/http"

	"github.com/dghubble/oauth1"
	twitterOAuth1 "github.com/dghubble/oauth1/twitter"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

var router *mux.Router

type (
	// Handler Handler
	Handler struct {
		DB *gorm.DB
	}
)

const (
	// Key This should be imported from somewhere else
	Key = "secret"
)

// InitializeRouter Init Router
func InitializeRouter(db *gorm.DB, e *echo.Echo) *echo.Echo {
	user := NewUserHandler(db)
	tag := NewTagHandler(db)
	// Auth
	e.POST("/signup", user.SignUp)
	e.POST("/login", user.Login)
	// oauth
	e.GET("/auth/twitter", twitterLogin)
	//e.GET("/auth/twitter/callback", twitter.CallbackHandler(config, issueSession(), nil))
	// // User
	e.GET("/users/:id", user.GetUser)
	e.POST("/users/:id/tags", user.CreateTag)
	e.GET("/tags/:name/users", tag.GetUsers)
	return e
}

func twitterLogin(c echo.Context) (err error) {
	config := &oauth1.Config{
		ConsumerKey:    "uAjRHZgFIbldz2iuydiNZ9p7D",
		ConsumerSecret: "yskjfqaewYbnJY9t3GDXA2l6qDXPhGltosca0hnKpDFcsOEjbp",
		CallbackURL:    "http://127.0.0.1:8080/auth/twitter/callback",
		Endpoint:       twitterOAuth1.AuthorizeEndpoint,
	}
	// fmt.Println("#")
	// twi := twitter.LoginHandler(config, nil)
	// fmt.Println("#")
	// fmt.Println(strconv.Itoa(twi))
	// fmt.Println("#")

	// return twi
	requestToken, _, _ := config.RequestToken()
	authorizationURL, err := config.AuthorizationURL(requestToken)
	data := map[string]interface{}{"authorizationURL": authorizationURL.String()}
	return c.JSON(http.StatusCreated, data)
}
