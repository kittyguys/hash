package handler

import (
	"net/http"

	"github.com/kittyguys/hash/api/db"
	"github.com/kittyguys/hash/api/model"
	"github.com/labstack/echo"
)

func (h *Handler) Signup(c echo.Context) (err error) {
	// Bind
	u := &model.User{}
	if err = c.Bind(u); err != nil {
		return
	}

	// Validate
	if u.Email == "" || u.Password == "" {
		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
	}

	if !db.NewRecord(&u) {
		panic("could not create new record")
	}
	if err := db.Create(&u).Error; err != nil {
		panic(err.Error())
	}

	return c.JSON(http.StatusCreated, u)
}

// func (h *Handler) Signup(c echo.Context) (err error) {
// 	// Bind
// 	u := &model.User{ID: bson.NewObjectId()}
// 	if err = c.Bind(u); err != nil {
// 		return
// 	}

// 	// Validate
// 	if u.Email == "" || u.Password == "" {
// 		return &echo.HTTPError{Code: http.StatusBadRequest, Message: "invalid email or password"}
// 	}

// 	// Save user
// 	db := db.GetDB()
// 	if err = db.DB("twitter").C("users").Insert(u); err != nil {
// 		return
// 	}

// 	return c.JSON(http.StatusCreated, u)
// }

// var u model.User
// db :=
// if r.Body == nil {
// 	http.Error(w, "Please send a request body", 400)
// 	return
// }

// err := json.NewDecoder(r.Body).Decode(&u)
// if err != nil {
// 	http.Error(w, err.Error(), 400)
// 	return
// }

// pwd := []byte(u.Password)
// hash := utils.HashAndSalt(pwd)
// uid := xid.New()

// u.UID = uid
// u.Password = hash

// if !db.NewRecord(&u) {
// 	panic("could not create new record")
// }
// if err := db.Create(&u).Error; err != nil {
// 	panic(err.Error())
// }

// token := jwt.New(jwt.SigningMethodHS256)

// claims := token.Claims.(jwt.MapClaims)
// claims["sub"] = u.UID
// claims["name"] = u.Name
// claims["iat"] = time.Now()
// claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

// tokenString, _ := token.SignedString([]byte(os.Getenv("SUSHI")))

// w.Write([]byte(tokenString))

// // // GetUserByID for getting user info by ID
// // var GetUserByID = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// // 	var u model.User
// // 	var tags []model.Tag
// // 	db := model.DB
// // 	params := mux.Vars(r)
// // 	id := params["id"]
// // 	uid, _ := xid.FromString(id)

// // 	db.First(&u, model.User{UID: uid})
// // 	db.Model(&u).Association("Tags").Find(&tags)

// // 	data := map[string]interface{}{"uid": u.UID, "name": u.Name, "tags": tags}

// // 	json, err := json.Marshal(data)
// // 	if err != nil {
// // 		http.Error(w, err.Error(), http.StatusInternalServerError)
// // 		return
// // 	}

// // 	w.Header().Set("Content-Type", "application/json")
// // 	w.Write(json)
// // })

// // GetUserByTag UIDでユーザー情報を取得
// var GetUserByTag = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 	var body model.AddTagBody
// 	var users []model.User
// 	var uid []xid.ID
// 	db := model.DB

// 	if r.Body == nil {
// 		http.Error(w, "Please send a request body", 400)
// 		return
// 	}
// 	err := json.NewDecoder(r.Body).Decode(&body)
// 	if err != nil {
// 		http.Error(w, err.Error(), 400)
// 		return
// 	}

// 	db.Where("tags.name=?", body.Name).Select("DISTINCT(uid)").Joins("JOIN user_tags ON user_tags.user_id = users.id").
// 		Joins("JOIN tags ON user_tags.tag_id=tags.id").Find(&users)

// 	for _, v := range users {
// 		fmt.Println(v.UID)
// 		uid = append(uid, v.UID)
// 	}

// 	data := map[string]interface{}{"uid": uid}

// 	json, err := json.Marshal(data)
// 	if err != nil {
// 		http.Error(w, err.Error(), http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.Write(json)
// })
