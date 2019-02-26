package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"../models"
)

var DB *gorm.DB

func ConnectAndCreate(databaseType, connectionString string) {
	var err error
	DB, err = gorm.Open(databaseType, connectionString)
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Catalog{})
	DB.AutoMigrate(&models.Category{})
	DB.AutoMigrate(&models.SubCategory{})
	DB.AutoMigrate(&models.Product{})
	DB.AutoMigrate(&models.Property{})
	DB.AutoMigrate(&models.Image{})
	if err != nil {
		panic(err)
	}
	DB.LogMode(true)
}

func Close() {
	DB.Close()
}
