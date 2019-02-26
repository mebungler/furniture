package handlers

import (
	"net/http"
	"../decoder"
	"../models"
	"encoding/json"
	"../database"
)

func Login(w http.ResponseWriter, r *http.Request) {
	user := models.User{}
	err := decoder.Get(r.Body, &user)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		if erro := json.NewEncoder(w).Encode("Invalid credentials"); erro != nil {
			panic(erro)
		}
		return
	}
	localUser := models.User{}
	database.GetWithQuery(&localUser, "username=?",user.Username)
	if localUser.Password==user.Password {
		w.WriteHeader(http.StatusOK)
		if err:=json.NewEncoder(w).Encode(localUser); err!=nil{
			panic(err)
		}
		return
	} else {
		w.WriteHeader(http.StatusBadRequest)
		if erro := json.NewEncoder(w).Encode("Invalid credentials"); erro != nil {
			panic(erro)
		}
		return
	}
}
