package repo

import "github.com/kittyguys/hash/api/model"

type UserRepo interface {
	SignUp(u *model.User) error
	Login(u *model.User) error
}
