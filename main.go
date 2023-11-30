package main

import (
	"fmt"
	"net/http"
	"servicelayerpatren/api/config"
	"servicelayerpatren/api/controller"
	"servicelayerpatren/api/service"

	"github.com/gorilla/mux"
)

func main() {
	// db
	config.DbInit()

	userService := service.NewUserService()

	// Inisialisasi controller dengan menyertakan service yang diperlukan
	userController := controller.NewUserController(userService)

	// Inisialisasi router menggunakan Gorilla Mux
	router := mux.NewRouter()

	// Tambahkan rute untuk UserController
	router.HandleFunc("/user/{id}", userController.GetUserByIdHandler).Methods("GET")

	// Atur port dan jalankan server
	port := 8080
	fmt.Printf("Server started on port %d\n", port)
	http.ListenAndServe(fmt.Sprintf(":%d", port), router)
}
