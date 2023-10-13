package account

import (
	"net/http"
	"strconv"
	db "taskone/Db"

	"github.com/labstack/echo/v4"
)

func PostAccount(c echo.Context) error {
	data := new(db.Account)

	if err := c.Bind(data); err != nil {
		return (err)
	}

	data.ID = len(db.NewAccount) + 1
	db.NewAccount = append(db.NewAccount, *data)
	return c.JSON(http.StatusCreated, data)
}

func GetAccount(c echo.Context) error {
	data := db.NewAccount
	return c.JSON(http.StatusOK, data)
}

func GetAccountByIdAndUsername(c echo.Context) error {
	username := c.Param("username")
	id, _ := strconv.Atoi(c.Param("id"))
	for _, data := range db.NewAccount {
		// mencara data dengan username atau id
		if data.Username == username && data.ID == id {
			return c.JSON(http.StatusOK, data)
		}
	}
	return c.JSON(http.StatusNotFound, "data dengan username tersebut tidak ada")
}

func UpdateAccountById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for i := range db.NewAccount {
		if db.NewAccount[i].ID == id {
			updateAccount := new(db.Account)
			if err := c.Bind(updateAccount); err != nil {
				return err
			}

			db.NewAccount[i].Email = updateAccount.Email
			db.NewAccount[i].Username = updateAccount.Username
			db.NewAccount[i].Password = updateAccount.Password
			return c.JSON(http.StatusOK, db.NewAccount[i])
		}
	}
	return c.JSON(http.StatusNotFound, "data tidak ditemukan")
}

func DeleteAccountById(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	for i := range db.NewAccount {
		if db.NewAccount[i].ID == id {
			db.NewAccount = append(db.NewAccount[:i], db.NewAccount[i+1:]...)
			return c.JSON(http.StatusOK, "data telah terhapus")
		}
	}
	return c.JSON(http.StatusNotFound, "data dengan id tersebut tidak ada")
}
