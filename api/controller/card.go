// controller/user_controller.go

package controller

import (
	"encoding/json"
	"net/http"
	"servicelayerpatren/api/service"
	"strconv"

	"github.com/gorilla/mux"
)

type UserController struct {
	UserService *service.UserService
}

func NewUserController(userService *service.UserService) *UserController {
	return &UserController{
		UserService: userService,
	}
}

func (uc *UserController) GetUserByIdHandler(w http.ResponseWriter, r *http.Request) {
	muxId := mux.Vars(r)
	idStr := muxId["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	user, err := uc.UserService.GetUserById(id)
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	if user == nil {
		// Data tidak ditemukan
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
