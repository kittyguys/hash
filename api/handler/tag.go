package handler

import (
	"net/http"

	"github.com/kittyguys/hash/api/db"

	"github.com/kittyguys/hash/api/model"
	"github.com/labstack/echo"
)

// AddTag ユーザーにタグを追加する
func (h *Handler) AddTag(c echo.Context) (err error) {
	var u model.User
	var t model.Tag
	body := &model.AddTagBody{}
	var tt []model.Tag
	uu := model.User{}
	var users []model.User
	db := db.GetDB()
	if err = c.Bind(body); err != nil {
		return
	}

	db.Find(&u, model.User{UID: body.UID})
	db.Model(&uu).Related(&tt, "Tags")
	db.Model(&model.Tag{}).Related(&users, "Users")

	t.Name = body.Name

	var res []model.Tag
	db.Model(&u).Association("Tags").Append(&t)
	db.Model(&t).Association("Users").Append(&u)
	db.Model(&u).Association("Tags").Find(&res)

	if err != nil {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}
	return c.JSON(http.StatusCreated, res)
}
