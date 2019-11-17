package common

import (
	"golang.org/x/crypto/bcrypt"
)

// HashAndSalt パスワードをハッシュ化
func HashAndSalt(pwd []byte) (string, error) {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	return string(hash), err
}

// ComparePasswords ハッシュ化されたパスワードと入力されたパスワードを比較する
func ComparePasswords(hashedPwd string, plainPwd []byte) error {
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	if err != nil {
		return err
	}
	return nil
}
