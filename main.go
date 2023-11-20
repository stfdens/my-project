package main

import (
	"Banking/api/config/connection"
	"Banking/api/routes"
	"fmt"
	"os"
)

func main() {
	db := connection.InitDB()
	defer db.Close()

	fmt.Printf("sever listen in localhost:%s", os.Getenv("port"))

	// route
	routes.Route()
}
