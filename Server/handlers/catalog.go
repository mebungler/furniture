package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"github.com/gorilla/mux"
)

func CatalogGet(w http.ResponseWriter, r *http.Request) {
	var catalogs []models.Catalog
	database.GetAll(&catalogs)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(catalogs); err != nil {
		panic(err)
	}
	return
}

func CatalogAdd(w http.ResponseWriter, r *http.Request) {
	var catalog models.Catalog
	err := decoder.Get(r.Body, &catalog)
	catalog.Photo = SaveFile(catalog.ID+".jpg", catalog.Photo)
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

func CatalogUpdate(w http.ResponseWriter, r *http.Request) {
	var catalog models.Catalog
	err := decoder.Get(r.Body, &catalog)
	catalog.Photo = SaveFile(catalog.ID+".jpg", catalog.Photo)
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

func CatalogRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	catalog := models.Catalog{ID: id}
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
