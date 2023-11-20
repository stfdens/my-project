package connection

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() *sql.DB {
	godotenv.Load()
	consStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=%s", os.Getenv("user"), os.Getenv("password"), os.Getenv("dbname"), os.Getenv("sslmode"))
	db, err := sql.Open("postgres", consStr)
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Koneksi ke PostgreSQL sukses!")

	DB = db
	return db
}
