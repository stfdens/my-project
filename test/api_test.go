package test

import (
	"ApiWithDb/api/router"
	database "ApiWithDb/config"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestApi(t *testing.T) {
	db := database.InitDB()
	defer db.Close()

	r := router.Routes()

	t.Run("created data", func(t *testing.T) {
		reqBody := `{"email": "dendisamp@gmail.com", "username": "stfden", "password": "password"}`
		req := httptest.NewRequest(http.MethodPost, "/data", strings.NewReader(reqBody))
		req.Header.Set("Content-Type", "application/json")
		res := httptest.NewRecorder()
		r.ServeHTTP(res, req)
		assert.NoError(t, res.Result().Body.Close())
		assert.Equal(t, http.StatusCreated, res.Code)
	})

	t.Run("get data", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/data", nil)
		req.Header.Set("Content-Type", "application/json")
		res := httptest.NewRecorder()
		r.ServeHTTP(res, req)
		assert.NoError(t, res.Result().Body.Close())
		assert.Equal(t, http.StatusOK, res.Code)
	})

	t.Run("get data by id", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/data/66", nil)
		req.Header.Set("Content-Type", "application/json")
		res := httptest.NewRecorder()
		r.ServeHTTP(res, req)
		assert.NoError(t, res.Result().Body.Close())
		assert.Equal(t, http.StatusOK, res.Code)
	})

	t.Run("update data by id", func(t *testing.T) {
		reqBody := `{"email": "densdi@gmail.com","username": "Stff", "password": "Stff"}`
		req := httptest.NewRequest(http.MethodPut, "/data/66", strings.NewReader(reqBody))
		req.Header.Set("Contenct-Type", "Application/json")
		res := httptest.NewRecorder()
		r.ServeHTTP(res, req)
		assert.NoError(t, res.Result().Body.Close())
		assert.Equal(t, http.StatusOK, res.Code)
	})
}
