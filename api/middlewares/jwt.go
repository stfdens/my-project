package middlewares

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
)

var secret_key = []byte("Authorization")

func GenerateToken(username string) (string, error) {
	// Set up the claims
	claims := jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 24).Unix(), // Token expires in 24 hours
		"iat":      time.Now().Unix(),
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(secret_key) // Replace with your secret key
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Mengambil token dari header Authorization
		tokenString := r.Header.Get("Authorization")

		// Pemeriksaan token
		token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
			return secret_key, nil
		})

		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Memeriksa apakah token valid
		if !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Jika token valid, lanjutkan ke handler berikutnya
		next.ServeHTTP(w, r)
	})
}
