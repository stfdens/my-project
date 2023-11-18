package login

import (
	"ApiWithDb/api/middlewares"
	"ApiWithDb/api/models"
	database "ApiWithDb/config"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodPost {
		http.Error(w, "methode not allowed", http.StatusMethodNotAllowed)
		return
	}

	// isniail data buat login
	// var dataSlice []models.Login
	var newData models.Login
	err := json.NewDecoder(r.Body).Decode(&newData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// hashpassword
	data := newData.Password
	hash := sha256.New()
	hash.Write([]byte(data))
	passwordHashed := hash.Sum(nil)
	passwordHash := hex.EncodeToString(passwordHashed)

	var username int
	query := database.DB.QueryRow("SELECT COUNT(*) FROM account WHERE username = $1", newData.Username).Scan(&username)
	if query != nil {
		http.Error(w, query.Error(), http.StatusInternalServerError)
		return
	}

	if username == 0 {
		dataJson, err := json.Marshal("data tidak ada")
		if err != nil {
			http.Error(w, query.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNotFound)
		w.Write(dataJson)
		return
	}

	var password string
	quer := database.DB.QueryRow("SELECT password FROM account WHERE username = $1", newData.Username).Scan(&password)
	if quer != nil {
		http.Error(w, quer.Error(), http.StatusInternalServerError)
		return
	}

	if passwordHash != password {
		dataJson, err := json.Marshal("login gagal")
		if err != nil {
			http.Error(w, quer.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(dataJson)
		return
	}

	token, err := middlewares.GenerateToken(newData.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// set the cookie
	cookie := http.Cookie{
		Name:    "Authorization",
		Value:   token,
		Path:    "/data",
		Expires: time.Now().Add(5 * time.Hour),
	}

	datajson, err := json.Marshal(cookie)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println(cookie)

	http.SetCookie(w, &cookie)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(datajson))
}
