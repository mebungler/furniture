package database

import (
	"reflect"
)

func Get(object interface{}, query ...string) error {
	temp := DB.Set("gorm:auto_preload", true)
	for _, el := range query {
		temp = temp.Preload(el)
	}
	r := reflect.ValueOf(object)
	f := reflect.Indirect(r).FieldByName("ID")
	id := string(f.String())
	temp.Where("ID = ?", id).First(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func GetAll(object interface{}) error {
	DB.Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func Remove(object interface{}) error {
	DB.Delete(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}
func Add(object interface{}) error {
	if !DB.HasTable(object) {
		DB.CreateTable(object)
	}
	DB.Create(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func Update(object interface{}) error {
	DB.Save(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}
func GetWithQuery(object interface{}, property, value string) error {
	DB.Where(property, value).Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func GetComplete(object interface{}, query ...string) error {
	temp := DB.Set("gorm:auto_preload", true)
	for _, el := range query {
		temp = temp.Preload(el)
	}
	temp.Find(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}

func GetRelated(parent,object interface{}) error{
	DB.Model(parent).Related(object)
	if DB.Error != nil {
		return DB.Error
	}
	return nil
}