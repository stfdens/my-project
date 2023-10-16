package routes

import (
	login "taskone/Controller/Authenticatons"
	books "taskone/Controller/Books"
	"taskone/Controller/account"

	"github.com/labstack/echo/v4"
)

func Routeserver() {
	server := echo.New()
	// daftar
	server.POST("/daftar", account.PostAccount)
	server.GET("/daftar", account.GetAccount)
	server.GET("/daftar/:username", account.GetAccountByIdAndUsername)
	server.PUT("/daftar/:id", account.UpdateAccountById)
	server.DELETE("/daftar/:id", account.DeleteAccountById)
	// login
	server.POST("/login", login.LoginAccount)
	// books
	server.POST("/books", books.PostBooks)
	server.GET("/books", books.GetBooks)
	// grup atuhentication
	server.Start(":8080")
}
