package books

import (
	"io"
	"net/http"
	db "taskone/Db"

	"github.com/labstack/echo/v4"
)

func PostBooks(c echo.Context) error {
	// input image
	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	// membuka gambar
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	// copy
	dataImage, err := io.ReadAll(src)
	if err != nil {
		return err
	}

	newbok := db.Books{
		Judul:  c.FormValue("Judul"),
		Genre:  c.FormValue("Genre"),
		Author: c.FormValue("Author"),
		Image:  dataImage,
	}

	newbok.ID = len(db.NewBooks) + 1
	db.NewBooks = append(db.NewBooks, newbok)

	return c.JSON(http.StatusCreated, "data telah di simpan")
}

func GetBooks(c echo.Context) error {
	data := db.NewBooks
	return c.JSON(http.StatusOK, data)
}
