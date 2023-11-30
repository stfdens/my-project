package service

import (
	"servicelayerpatren/api/config"
	"servicelayerpatren/api/models"

	"github.com/labstack/gommon/log"
)

type UserService struct {
	// Bisa ditambahkan properti atau metode-metode lain terkait pengelolaan pengguna
}

func NewUserService() *UserService {
	return &UserService{}
}

func (us *UserService) GetUserById(Id int) (*models.Account, error) {
	var dasta int
	cekData := config.DB.QueryRow("SELECT COUNT(*) FROM account WHERE id = $1", Id).Scan(&dasta)
	if cekData != nil {
		log.Error(cekData)
		return nil, nil
	}

	if dasta == 0 {
		return nil, nil
	}

	var user models.Account
	row := config.DB.QueryRow("SELECT * FROM account WHERE id = $1", Id)
	err := row.Scan(&user.Id, &user.Username, &user.Email, &user.Password)
	if err != nil {
		log.Error(err)
		return nil, err
	}

	return &user, nil
}
