package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"github.com/gorilla/mux"
)

func ShopGet(w http.ResponseWriter, r *http.Request) {
	var shops []models.Shop
	id := mux.Vars(r)["id"]
	if id != "" {
		shop := models.Shop{ID: id}
		database.Get(&shop)
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(shop); err != nil {
			panic(err)
		}
		return
	}
	database.GetAll(&shops)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(shops); err != nil {
		panic(err)
	}
	return
}

func ShopAdd(w http.ResponseWriter, r *http.Request) {
	var shop models.Shop
	err := decoder.Get(r.Body, &shop)
	shop.Photo = SaveFile(shop.ID+".jpg", shop.Photo)
	database.Add(&shop)
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

func ShopUpdate(w http.ResponseWriter, r *http.Request) {
	var shop models.Shop
	err := decoder.Get(r.Body, &shop)
	shop.Photo = SaveFile(shop.ID+".jpg", shop.Photo)
	database.Update(&shop)
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

func ShopRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	shop := models.Shop{ID: id}
	database.Remove(&shop)
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
