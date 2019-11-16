package interfaces

import (
	"log"

	"database/sql"

	"github.com/kittyguys/hash/api/common"
	"github.com/kittyguys/hash/api/repository"
	"github.com/shgysd/hash/api/utils/crypto"
)

// UserRepository contains db
type UserRepository struct {
	Conn *sql.DB
}

// NewUserRepo returns user repository that contains db
func NewUserRepo(conn *sql.DB) repository.UserRepository {
	return &UserRepository{
		Conn: conn,
	}
}

// SignUp inserts user data into mysql and returns JWT
func (h *UserRepository) SignUp(d *repository.SignUp) int {

	stmt, err := h.Conn.Prepare("INSERT INTO users(user_name,display_name, email, password) VALUES(?,?,?,?)")
	if err != nil {
		log.Fatal(err)
	}

	pwd := []byte(d.Password)
	hashedPassword := common.HashAndSalt(pwd)

	res, err := stmt.Exec(d.UserName, d.UserName, d.Email, hashedPassword)
	if err != nil {
		log.Fatal(err)
	}
	lastID, err := res.LastInsertId() // 挿入した行のIDを返却
	if err != nil {
		log.Fatal(err)
	}
	rowCnt, err := res.RowsAffected() // 影響を受けた行数
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("ID = %d, affected = %d\n", lastID, rowCnt)

	return int(lastID)
}

// SignIn returns JWT
func (h *UserRepository) SignIn(d *repository.SignIn) int {
	var (
		id       int
		password string
	)
	rows, err := h.Conn.Query("SELECT id, password FROM users WHERE user_name = ?", d.ID)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&id, &password)
		if err != nil {
			log.Fatal(err)
		}
		log.Println(password)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	pwd := []byte(d.Password)

	err = crypto.ComparePasswords(password, pwd)
	if err != nil {
		log.Fatal(err)
	}

	return id
}

// // Login Login
// func (h *UserRepository) Login(t *string, b echo.Map) error {
// 	u := &model.User{}

// 	// Validate
// 	if b["loginID"] == "" {
// 		return echo.NewHTTPError(http.StatusUnauthorized, "Please provide valid cred")
// 	}

// 	if strings.Contains(b["loginID"].(string), "@") {
// 		h.Conn.First(&u, model.User{Email: b["loginID"].(string)})
// 	} else {
// 		h.Conn.First(&u, model.User{HashID: b["loginID"].(string)})
// 	}

// 	pwd := []byte(b["password"].(string))

// 	if common.ComparePasswords(u.Password, pwd) {
// 		token := jwt.New(jwt.SigningMethodHS256)
// 		claims := token.Claims.(jwt.MapClaims)
// 		claims["admin"] = true
// 		claims["hashID"] = u.HashID
// 		claims["displayName"] = u.DisplayName
// 		claims["iat"] = time.Now()
// 		claims["exp"] = time.Now().Add(time.Hour * 24 * 90).Unix()
// 		tokenString, _ := token.SignedString([]byte("secret"))

// 		*t = tokenString
// 	}

// 	return nil
// }

// // GetUser GetUser
// func (h *UserRepository) GetUser(u *model.User, t *[]model.Tag, id string) error {
// 	h.Conn.First(&u, model.User{HashID: id})
// 	h.Conn.Model(&u).Association("Tags").Find(&t)

// 	return nil
// }

// // CreateTag CreateTag
// func (h *UserRepository) CreateTag(u *model.User, t *[]model.Tag, b map[string]interface{}) error {
// 	var tag model.Tag

// 	tag.Name = b["tags"].(string)

// 	h.Conn.First(&u, model.User{HashID: b["id"].(string)})
// 	h.Conn.Model(&u).Related(&t, "Tags")

// 	if !isDuplicate(t, tag.Name) {
// 		h.Conn.Model(&u).Association("Tags").Append(&tag)
// 	}

// 	h.Conn.Model(&u).Association("Tags").Find(&t)

// 	return nil
// }

// func isDuplicate(tags *[]model.Tag, tag string) bool {
// 	var result bool
// 	for _, v := range *tags {
// 		if v.Name == tag {
// 			result = true
// 			break
// 		}
// 	}
// 	return result
// }
