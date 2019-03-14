package handlers

import (
	"net/http"
	"encoding/json"
	"../models"
	"../database"
)

func GetStatistics(w http.ResponseWriter, r *http.Request) {
	catalog := []models.Catalog{}
	category := []models.Category{}
	//sales := []models.Product{}
	shop := []models.Shop{}
	product := []models.Product{}
	subCategory := []models.SubCategory{}
	catalogCount := database.GetCount(&catalog)
	categoryCount := database.GetCount(&category)
	subCategoryCount := database.GetCount(&subCategory)
	productCount := database.GetCount(&product)
	shopCount := database.GetCount(&shop)
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(struct {
		Catalog     int
		Category    int
		Product     int
		SubCategory int
		Shop        int
		Sale        int
	}{
		Catalog:     catalogCount,
		Category:    categoryCount,
		SubCategory: subCategoryCount,
		Product:     productCount,
		Shop:        shopCount,
	}); err != nil {
		panic(err)
	}
	return
}
