package controller

import (
	"ApiWithDb/api/models"
	database "ApiWithDb/config"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func GetData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	rows, err := database.DB.Query("select * from account")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	defer rows.Close()

	var account []models.Account

	for rows.Next() {
		var a models.Account
		err := rows.Scan(&a.Id, &a.Email, &a.Username, &a.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		account = append(account, a)
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	dataJson, err := json.Marshal(account)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}

func AddData(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	if r.Method != http.MethodPost {
		http.Error(w, "methode not allowed", http.StatusMethodNotAllowed)
	}

	var dataNew models.Account
	err := json.NewDecoder(r.Body).Decode(&dataNew)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	var email int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM account WHERE email = $1", dataNew.Email).Scan(&email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if email == 1 {
		datajson, err := json.Marshal("DATA SUDAH ADA !")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Write(datajson)
		return
	}

	// hashing password
	// Hash the password
	dataHash := dataNew.Password
	hasher := sha256.New()
	hasher.Write([]byte(dataHash))
	hashed := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashed)

	// Insert data into the database
	err = database.DB.QueryRow("INSERT INTO account (email, username, password) VALUES ($1, $2, $3) RETURNING id", dataNew.Email, dataNew.Username, hashedPassword).Scan(&dataNew.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]int{
		"Id": dataNew.Id,
	}
	dataJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(dataJson)
}

func GetDataById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	id := vars["id"]
	ids, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	// Gunakan Query, bukan QueryRow
	rows, err := database.DB.Query("SELECT * FROM account WHERE id = $1", ids)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Inisialisasi slice untuk menyimpan hasil query
	var a []models.Account

	for rows.Next() {
		var b models.Account
		err := rows.Scan(&b.Id, &b.Email, &b.Username, &b.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		a = append(a, b)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Periksa apakah ada data yang ditemukan
	if len(a) == 0 {
		http.Error(w, "Data not found", http.StatusNotFound)
		return
	}

	// Kirimkan data sebagai respons JSON
	dataJson, err := json.Marshal(a)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}

func DeleteById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "Aplication/Json")

	if r.Method != http.MethodDelete {
		http.Error(w, "methode not allowed", http.StatusMethodNotAllowed)
	}

	vars := mux.Vars(r)
	id := vars["id"]
	ids, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM account WHERE id = $1", ids).Scan(&count)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if count == 0 {
		dataJson, err := json.Marshal("data tidak ditemukan")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNotFound)
		w.Write(dataJson)
		return
	}

	if _, err := database.DB.Query("DELETE FROM account WHERE id = $1", ids); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.WriteHeader(http.StatusOK)
	dataJson, err := json.Marshal("data berhasil dihapus")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(dataJson)
}

func UpdataDataById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPut {
		http.Error(w, "methode not allowed", http.StatusMethodNotAllowed)
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]
	ids, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var count int
	err = database.DB.QueryRow("SELECT COUNT(*) FROM account WHERE id = $1", ids).Scan(&count)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if count == 0 {
		dataJson, err := json.Marshal("data tidak ditemukan")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNotFound)
		w.Write(dataJson)
		return
	}

	var dataNew models.Account
	errs := json.NewDecoder(r.Body).Decode(&dataNew)
	if errs != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	_, err = database.DB.Exec("UPDATE account SET email = $1, username = $2, password = $3 where id = $4", dataNew.Email, dataNew.Username, dataNew.Password, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dataJson, err := json.Marshal("data berhasil di update")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}
