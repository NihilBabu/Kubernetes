package gofun

import "net/http"

func ping(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hlo"))
}
