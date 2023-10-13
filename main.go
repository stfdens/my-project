package main

import (
	login "taskone/Controller/Login"
	"taskone/Controller/account"

	"github.com/labstack/echo/v4"
)

func main() {
	server := echo.New()
	// daftar
	server.POST("/daftar", account.PostAccount)
	server.GET("/daftar", account.GetAccount)
	server.GET("/daftar/:username", account.GetAccountByIdAndUsername)
	server.PUT("/daftar/:id", account.UpdateAccountById)
	server.DELETE("/daftar/:id", account.DeleteAccountById)
	// login
	server.POST("/login", login.LoginAccount)
	server.Start(":8080")
}
