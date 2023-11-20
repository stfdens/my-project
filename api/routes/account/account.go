package account

import (
	"Banking/api/controller/account"

	"github.com/gorilla/mux"
)

func RouteAccount() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/account", account.AddAccount).Methods("POST")
	r.HandleFunc("/account", account.GetAccount).Methods("GET")
	r.HandleFunc("/account/{id}", account.GetAccountId).Methods("GET")
	r.HandleFunc("/account/{id}", account.UpdateAccount).Methods("PUT")
	r.HandleFunc("/account/{id}", account.DeleteAccount).Methods("DELETE")

	return r
}
