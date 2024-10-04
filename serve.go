package main

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strings"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, req *http.Request) {
		path := strings.TrimPrefix(req.URL.Path, "/")
		if path == "" {
			http.ServeFile(w, req, "index.html")
		} else {
			ext := filepath.Ext(path)
			fmt.Println(ext)
			switch ext {
			case ".js":
			case ".ts":
			case ".svelte":
				w.Header().Set("Content-Type", "application/javascript")
			case ".css":
				w.Header().Set("Content-Type", "text/css")
			}
			http.ServeFile(w, req, path)
		}
	})

	fmt.Println("listening on port 80...")
	http.ListenAndServe(":80", nil)
}
