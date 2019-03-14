package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"github.com/gorilla/mux"
)

func SubCategoryGet(w http.ResponseWriter, r *http.Request) {
	var subCategories []models.SubCategory
	id := mux.Vars(r)["id"]
	isView := mux.Vars(r)["isView"]
	if id != "" {
		category := models.Category{ID: id}
		database.GetRelated(&category, &subCategories)
		if isView == "true" {
			database.Get(&category)
			category.Views=category.Views+1
			database.Update(&category)
		}
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(subCategories); err != nil {
			panic(err)
		}
		return
	}
	database.GetAll(&subCategories)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(subCategories); err != nil {
		panic(err)
	}
	return
}

func SubCategoryAdd(w http.ResponseWriter, r *http.Request) {
	var subCategory models.SubCategory
	err := decoder.Get(r.Body, &subCategory)
	subCategory.Photo = SaveFile(subCategory.ID+".jpg", subCategory.Photo)
	database.Add(&subCategory)
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

func SubCategoryUpdate(w http.ResponseWriter, r *http.Request) {
	var subCategory models.SubCategory
	err := decoder.Get(r.Body, &subCategory)
	database.Update(&subCategory)
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

func SubCategoryRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	subCategory := models.SubCategory{ID: id}
	database.Remove(&subCategory)
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
