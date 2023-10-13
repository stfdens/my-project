package login

import (
	"net/http"
	db "taskone/Db"

	"github.com/labstack/echo/v4"
)

func LoginAccount(c echo.Context) error {
	username := c.FormValue("username")
	password := c.FormValue("password")
	for i := range db.NewAccount {
		if db.NewAccount[i].Username == username && db.NewAccount[i].Password == password {
			return c.JSON(http.StatusOK, "anda berhasil login")
		}
	}
	return c.JSON(http.StatusNotFound, "masukan data yang benar")
}
