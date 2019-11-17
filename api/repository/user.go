package repository

// SignUp contains default user info
type SignUp struct {
	UserName string `json:"userName" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

// SignIn contains login data
type SignIn struct {
	ID       string `json:"signinID" validate:"required"`
	Password string `json:"password" validate:"required"`
}

// IsUnique contains UserName
type IsUnique struct {
	UserName string `json:"userName" validate:"required"`
}

// UserRepository defines user method
type UserRepository interface {
	SignUp(d *SignUp) (int, error)
	SignIn(d *SignIn) (int, error)
	IsUnique(d interface{}) bool
}
