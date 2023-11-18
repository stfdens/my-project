package router

import (
	"ApiWithDb/api/controller"
	"ApiWithDb/api/controller/login"
	"ApiWithDb/api/middlewares"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func Routes() *mux.Router {
	r := mux.NewRouter()

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	r.Use(corsHandler.Handler)
	r.HandleFunc("/data", controller.AddData).Methods("POST")
	r.HandleFunc("/data/{id:[0-9]+}", controller.GetDataById).Methods("GET")
	r.HandleFunc("/data/{id:[0-9]+}", controller.DeleteById).Methods("DELETE")
	r.HandleFunc("/data/{id:[0-9]+}", controller.UpdataDataById).Methods("PUT")

	// Router khusus untuk rute dengan middleware
	dataRouter := r.PathPrefix("/data").Subrouter()
	dataRouter.Use(middlewares.Auth)
	dataRouter.HandleFunc("", controller.GetData).Methods("GET")

	r.HandleFunc("/login", login.Login).Methods("POST")

	return r
}
