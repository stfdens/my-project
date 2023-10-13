package db

// account struct
type Account struct {
	ID       int    `json: "id"`
	Email    string `json: "emai"`
	Username string `json: "username"`
	Password string `json: "password"`
}

var NewAccount []Account
