package main

import (
	"ApiWithDb/api/router"
	database "ApiWithDb/config"
	"net/http"
)

func main() {
	db := database.InitDB()
	defer db.Close()

	r := router.Routes()
	http.Handle("/", r)
	http.ListenAndServe(":8080", nil)
}
