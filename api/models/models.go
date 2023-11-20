package models

type Account struct {
	Id       int    `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type card struct {
	Card_id int    `json:"card_id"`
	Email   string `json:"email"`
}
