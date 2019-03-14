package handlers

import (
	"encoding/json"
	"net/http"
	"../models"
	"../database"
)

func GetMainView(w http.ResponseWriter, r *http.Request) {
	catalog := models.Catalog{}
	category := models.Category{}
	sales := []models.Product{}
	product := models.Product{}
	subCategory := models.SubCategory{}
	database.GetByOrder(&catalog, "views desc", )
	database.GetByOrder(&category, "views desc")
	database.GetByOrder(&subCategory, "views desc")
	database.GetByOrder(&product, "views desc", "Photos", "Properties")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode([]MainView{
		{Type: "catalog", Title: "Популярная категория", Name: catalog.Name, Catalog: catalog},
		{Type: "sale", Title: "Товары со скидкой", Name: "Скидка до 70%", Sales: sales},
		{Type: "category", Category: category, Name: category.Name},
		{Type: "subCategory", SubCategory: subCategory, Name: subCategory.Name},
		{Type: "product", Product: product, Name: product.Name},
	}); err != nil {
		panic(err)
	}
	return
}

type MainView struct {
	Type        string
	Title       string
	Name        string
	Product     models.Product
	SubCategory models.SubCategory
	Catalog     models.Catalog
	Category    models.Category
	Sales       []models.Product
}
