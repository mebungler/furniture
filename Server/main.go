package main

import (
	"net/http"
	"./templates"
	"./database"
	"./router"
	"./models"
)

func init() {
	templates.Init()
}

func main() {
	database.ConnectAndCreate("sqlite3", "d.db")
	database.Add(&models.User{Username:"admin",Password:"1234",ID:"123",FirstName:"Admin"})
	r := router.NewRouter()
	http.ListenAndServe(":8080", r)
}
