package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"github.com/gorilla/mux"
)

func AdminGet(w http.ResponseWriter, r *http.Request) {
	var catalogs []models.User
	database.GetAll(&catalogs)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(catalogs); err != nil {
		panic(err)
	}
	return
}

func AdminAdd(w http.ResponseWriter, r *http.Request) {
	var catalog models.User
	err := decoder.Get(r.Body, &catalog)
	database.Add(&catalog)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if erro := json.NewEncoder(w).Encode("Server error"); erro != nil {
			panic(erro)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	return
}

func AdminUpdate(w http.ResponseWriter, r *http.Request) {
	var catalog models.User
	err := decoder.Get(r.Body, &catalog)
	database.Update(&catalog)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if erro := json.NewEncoder(w).Encode("Server error"); erro != nil {
			panic(erro)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	return
}

func AdminRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	catalog := models.User{ID: id}
	database.Remove(&catalog)
	if database.DB.Error != nil {
		w.WriteHeader(http.StatusInternalServerError)
		if erro := json.NewEncoder(w).Encode("Server error"); erro != nil {
			panic(erro)
		}
		return
	}
	w.WriteHeader(http.StatusOK)
	return
}
