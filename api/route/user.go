package route

import (
	"encoding/json"
	"net/http"

	"github.com/kittyguys/hash/api/model"
)

// GetUserByID UIDでユーザー情報を取得
var GetUserByID = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u model.User
	var t model.Tag
	var body model.AddTagBody
	db := model.DB
	var tt []model.Tag
	uu := model.User{}

	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	db.First(&u, model.User{UID: body.UID})
	db.Model(&uu).Related(&tt, "Tags")

	t.Name = body.Name

	var res []model.Tag
	db.Model(&u).Association("Tags").Append(&t)
	db.Model(&u).Association("Tags").Find(&res)

	type response struct {
		user model.User
		resp []model.Tag
	}

	rr := response{user: u, resp: res}

	json, err := json.Marshal(rr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
})
