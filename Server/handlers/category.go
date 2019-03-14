package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
	"../decoder"
	"encoding/base64"
	"os"
	"strings"
	"github.com/gorilla/mux"
)

func CategoryGet(w http.ResponseWriter, r *http.Request) {
	var categories []models.Category
	id := mux.Vars(r)["id"]
	isView := mux.Vars(r)["isView"]
	if id != "" {
		catalog := models.Catalog{ID: id}
		database.GetRelated(&catalog, &categories)
		if isView == "true" {
			database.Get(&catalog)
			catalog.Views = catalog.Views + 1
			database.Update(&catalog)
		}
		w.WriteHeader(http.StatusOK)
		if err := json.NewEncoder(w).Encode(categories); err != nil {
			panic(err)
		}
		return
	}
	database.GetWithQuery(&categories, "is_sale is ? OR is_sale = ?", nil, false)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(categories); err != nil {
		panic(err)
	}
	return
}

func CategoryAdd(w http.ResponseWriter, r *http.Request) {
	var category models.Category
	err := decoder.Get(r.Body, &category)
	category.Photo = SaveFile(category.ID+".jpg", category.Photo)
	database.Add(&category)
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

func CategoryUpdate(w http.ResponseWriter, r *http.Request) {
	var category models.Category
	err := decoder.Get(r.Body, &category)
	category.Photo = SaveFile(category.ID+".jpg", category.Photo)
	database.Update(&category)
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

func CategoryRemove(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]
	category := models.Category{ID: id}
	database.Remove(&category)
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

func SaveFile(name, data string) string {
	if data == "" {
		return ""
	}
	if _, err := os.Stat("." + data); err == nil {
		return data
	} else {
		b64data := data[strings.IndexByte(data, ',')+1:]
		dec, err := base64.StdEncoding.DecodeString(b64data)
		if err != nil {
			panic(err)
		}
		f, err := os.Create("./public/uploads/" + name)
		if err != nil {
			panic(err)
		}
		defer f.Close()
		if _, err := f.Write(dec); err != nil {
			panic(err)
		}
		if err := f.Sync(); err != nil {
			panic(err)
		}
		return "/public/uploads/" + name
	}
}
