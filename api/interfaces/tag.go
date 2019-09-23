package interfaces

import (
	"github.com/jinzhu/gorm"
	"github.com/kittyguys/hash/api/repository"
)

// NewUserRepo Initialize user repository
func NewTagRepo(conn *gorm.DB) repository.TagRepository {
	return &TagRepository{
		Conn: conn,
	}
}

// TagRepository Handler with DB
type TagRepository struct {
	Conn *gorm.DB
}

// Create Create
func (h *TagRepository) Create() error {

	return nil
}
