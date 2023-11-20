package account

import (
	"ApiWithDb/api/models"
	"Banking/api/config/connection"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/labstack/gommon/log"
)

func AddAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodPost {
		http.Error(w, "methode not allowed", http.StatusOK)
		return
	}

	var Account models.Account
	err := json.NewDecoder(r.Body).Decode(&Account)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// cek apakah data dengan nama tersebut sudah ada
	var User int
	datas := connection.DB.QueryRow("SELECT COUNT(*) FROM account WHERE email = $1", Account.Email).Scan(&User)
	if datas != nil {
		http.Error(w, datas.Error(), http.StatusInternalServerError)
		return
	}

	if User == 1 {
		dataJson, err := json.Marshal("data sudah ada")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		w.WriteHeader(http.StatusBadRequest)
		w.Write(dataJson)
		return
	}

	// hash password
	password := Account.Password
	hasher := sha256.New()
	hasher.Write([]byte(password))
	hashed := hasher.Sum(nil)
	hashedPassword := hex.EncodeToString(hashed)

	// melakukan insert
	err = connection.DB.QueryRow("INSERT INTO account (username, email, password) VALUES ($1, $2, $3) RETURNING id", Account.Username, Account.Email, hashedPassword).Scan(&Account.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Error(err)
		return
	}

	response := map[string]int{
		"Id": Account.Id,
	}

	dataJson, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		fmt.Println("as")
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write(dataJson)
}

func GetAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodGet {
		http.Error(w, "Methode not allowed", http.StatusInternalServerError)
		return
	}

	query, err := connection.DB.Query("SELECT * FROM account")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer query.Close()

	var data []models.Account

	for query.Next() {
		var a models.Account
		err := query.Scan(&a.Id, &a.Username, &a.Email, &a.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		data = append(data, a)
	}

	dataJson, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}

func GetAccountId(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodGet {
		http.Error(w, "Methode not allowed", http.StatusInternalServerError)
		return
	}

	muxId := mux.Vars(r)
	ids := muxId["id"]
	id, err := strconv.Atoi(ids)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	query, err := connection.DB.Query("SELECT * FROM account WHERE id = $1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer query.Close()

	var data []models.Account

	for query.Next() {
		var a models.Account
		err := query.Scan(&a.Id, &a.Username, &a.Email, &a.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		data = append(data, a)
	}

	dataJson, err := json.Marshal(data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}

func UpdateAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodPut {
		http.Error(w, "methode not allowed", http.StatusInternalServerError)
		return
	}

	muxId := mux.Vars(r)
	ids := muxId["id"]
	id, err := strconv.Atoi(ids)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// cek database apakah ada
	var Id int
	query := connection.DB.QueryRow("SELECT COUNT(*) FROM account WHERE id = $1", id).Scan(&Id)
	if query != nil {
		http.Error(w, query.Error(), http.StatusInternalServerError)
		return
	}

	// cek apakah data ada atau tidak
	if Id == 0 {
		dataJson, err := json.Marshal("data tidak ada")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
		w.Write(dataJson)
		return
	}

	// inisial database models
	var data models.Account
	errs := json.NewDecoder(r.Body).Decode(&data)
	if errs != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Simpan email lama
	var oldEmail string
	err = connection.DB.QueryRow("SELECT email FROM account WHERE id = $1", id).Scan(&oldEmail)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// mengecek email apakh sama tidak dengan yang lama
	if data.Email != oldEmail {
		// Periksa apakah email yang baru sudah ada di database
		var count int
		err = connection.DB.QueryRow("SELECT COUNT(*) FROM account WHERE email = $1 AND id != $2", data.Email, id).Scan(&count)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if count > 0 {
			// Email baru sudah ada, tindakan yang diperlukan
			// Misalnya, kirim response bahwa email baru sudah ada
			dataJson, err := json.Marshal("Email baru sudah ada")
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.WriteHeader(http.StatusOK)
			w.Write(dataJson)
			return
		}
	}

	// query untuk update
	pass := data.Password
	passHash := sha256.New()
	passHash.Write([]byte(pass))
	hashed := passHash.Sum(nil)
	hashedPassword := hex.EncodeToString(hashed)

	// query untuk hash password
	_, err = connection.DB.Exec("UPDATE account SET username = $1, email = $2, password = $3 WHERE id = $4", data.Username, data.Email, hashedPassword, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dataJson, err := json.Marshal("DATA BERHASIL DI UPDATE")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Write(dataJson)
}

func DeleteAccount(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	if r.Method != http.MethodDelete {
		http.Error(w, "methode not allowed", http.StatusInternalServerError)
		return
	}

	// var account models.Account

	muxId := mux.Vars(r)
	ids := muxId["id"]
	id, err := strconv.Atoi(ids)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var data int
	query := connection.DB.QueryRow("SELECT COUNT(*) FROM account WHERE id = $1", id).Scan(&data)
	if query != nil {
		http.Error(w, query.Error(), http.StatusInternalServerError)
		return
	}

	if data == 0 {
		dataJson, err := json.Marshal("data tidak ada")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.WriteHeader(http.StatusNotFound)
		w.Write(dataJson)
		return
	}

	_, err = connection.DB.Exec("DELETE FROM account WHERE id = $1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	dataJson, err := json.Marshal("data berhasil dihapus")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(dataJson)
}
