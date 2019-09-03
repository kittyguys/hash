package route

import (
	"encoding/json"
	"net/http"

	"github.com/kittyguys/hash/api/model"
)

// AddTag ユーザーにタグを追加する
var AddTag = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u model.User
	var t model.Tag
	var body model.AddTagBody
	db := model.DB
	var tt []model.Tag
	uu := model.User{}
	var users []model.User

	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), 400)
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

	json, err := json.Marshal(res)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
})
