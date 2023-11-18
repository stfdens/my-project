// database/database.go

package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() *sql.DB {
	connStr := "user=postgres password=stfden dbname=golearn sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	// Menguji koneksi ke database
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Koneksi ke PostgreSQL sukses!")

	DB = db
	return db
}
