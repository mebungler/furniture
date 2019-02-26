package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"github.com/gorilla/mux"
	"fmt"
)

func ProductGet(w http.ResponseWriter, r *http.Request) {
	var categories []models.Product
	database.GetComplete(&categories, "Properties", "Photos")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(categories); err != nil {
		panic(err)
	}
	return
}

func ProductAdd(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	err := decoder.Get(r.Body, &product)
	product.Photo = SaveFile(product.ID+".jpg", product.Photo)
	for index, item := range product.Photos {
		product.Photos[index].Path = SaveFile(product.ID+fmt.Sprint(index)+".jpg", item.Path)
	}
	database.Add(&product)
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

func ProductUpdate(w http.ResponseWriter, r *http.Request) {
	var product models.Product
	err := decoder.Get(r.Body, &product)
	database.Update(&product)
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

func ProductRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	product := models.Product{ID: id}
	database.Remove(&product)
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
