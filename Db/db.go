package db

// account struct
type Account struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type Books struct {
	ID     int    `json:"id"`
	Judul  string `json:"judul"`
	Genre  string `json:"genre"`
	Author string `json:"author"`
	Image  []byte `json:"image"`
}

var NewAccount []Account

var NewBooks []Books
