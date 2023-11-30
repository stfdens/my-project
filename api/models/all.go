package models

type Account struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CardId struct {
	Id int `json:"id"`
}
