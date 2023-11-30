package config

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/gommon/log"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func DbInit() *sql.DB {
	godotenv.Load()
	data := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=%s", os.Getenv("user"), os.Getenv("password"), os.Getenv("dbname"), os.Getenv("sslmode"))
	db, err := sql.Open("postgres", data)
	if err != nil {
		log.Error(err)
	}

	dbEerr := db.Ping()
	if dbEerr != nil {
		log.Error(dbEerr)
	}

	fmt.Println("db connected")

	DB = db
	return db
}
