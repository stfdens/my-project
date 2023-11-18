package middlewares

// func Auth(w http.ResponseWriter, r *http.Request) {
// 	// Mengambil token dari header Authorization
// 	tokenString := r.Header.Get("Authorization")

// 	// Pemeriksaan token
// 	token, err := jwt.ParseWithClaims(tokenString, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
// 		return jwtKey, nil
// 	})

// 	if err != nil {
// 		http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 		return
// 	}

// 	// Memeriksa apakah token valid
// 	if !token.Valid {
// 		http.Error(w, "Invalid token", http.StatusUnauthorized)
// 		return
// 	}

// 	// Jika token valid, lakukan operasi yang diizinkan
// 	w.Write([]byte("Welcome to the restricted area!"))
// }
