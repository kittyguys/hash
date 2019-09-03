package route

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/rs/xid"

	"github.com/gorilla/mux"
	"github.com/kittyguys/hash/api/model"
)

// GetUserByID UIDでユーザー情報を取得
var GetUserByID = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var u model.User
	var body model.AddTagBody
	var tags []model.Tag
	db := model.DB
	params := mux.Vars(r)
	id := params["id"]
	uid, _ := xid.FromString(id)

	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	db.First(&u, model.User{UID: uid})
	db.Model(&u).Association("Tags").Find(&tags)

	data := map[string]interface{}{"uid": u.UID, "name": u.Name, "tags": tags}

	json, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
})

// GetUserByTag UIDでユーザー情報を取得
var GetUserByTag = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	var body model.AddTagBody
	var users []model.User
	var uid []xid.ID
	db := model.DB

	if r.Body == nil {
		http.Error(w, "Please send a request body", 400)
		return
	}
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	db.Where("tags.name=?", body.Name).Select("DISTINCT(uid)").Joins("JOIN user_tags ON user_tags.user_id = users.id").
		Joins("JOIN tags ON user_tags.tag_id=tags.id").Find(&users)

	for _, v := range users {
		fmt.Println(v.UID)
		uid = append(uid, v.UID)
	}

	data := map[string]interface{}{"uid": uid}

	json, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(json)
})
