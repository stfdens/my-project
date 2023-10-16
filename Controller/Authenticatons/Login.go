package login

import (
	"net/http"
	db "taskone/Db"

	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func LoginAccount(c echo.Context) error {
	var LoginData struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.Bind(&LoginData); err != nil {
		return err
	}

	for i := range db.NewAccount {
		if db.NewAccount[i].Username == LoginData.Username {
			if CheckPassword(LoginData.Password, db.NewAccount[i].Password) {
				return c.JSON(http.StatusOK, "login success")
			}
		}
	}

	return c.JSON(http.StatusNotFound, "masukan data yang benar")
}
