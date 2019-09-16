package handler

import (
	"net/http"

	"github.com/kittyguys/hash/api/model"
	"github.com/labstack/echo"
)

// Create ユーザーにタグを追加する
func (h *Handler) Create(c echo.Context) (err error) {
	var u model.User
	var t model.Tag
	var tt []model.Tag
	var users []model.User
	uu := model.User{}
	params := &model.Create{}

	if err = c.Bind(params); err != nil {
		return
	}

	h.DB.Find(&u, model.User{UID: params.UID})
	h.DB.Model(&uu).Related(&tt, "Tags")
	h.DB.Model(&model.Tag{}).Related(&users, "Users")

	t.Name = params.Tag

	var res []model.Tag
	h.DB.Model(&u).Association("Tags").Append(&t)
	h.DB.Model(&t).Association("Users").Append(&u)
	h.DB.Model(&u).Association("Tags").Find(&res)

	if err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}
	return c.JSON(http.StatusCreated, res)
}
