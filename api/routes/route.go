package routes

import (
	"Banking/api/routes/account"
	"net/http"
)

func Route() {
	data := account.RouteAccount()
	http.Handle("/", data)
	http.ListenAndServe(":8080", nil)
}
