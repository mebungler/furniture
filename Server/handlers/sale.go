package handlers

import (
	"net/http"
	"../database"
	"../models"
	"encoding/json"
)

func GetSale(w http.ResponseWriter, r *http.Request) {
	temp := models.Category{}
	database.GetWithQuery(&temp, "is_sale=?", true)
	if err := json.NewEncoder(w).Encode(temp); err != nil {
		panic(err)
	}
}
