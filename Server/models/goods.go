package models

type Catalog struct {
	ID               string `gorm:"primary_key"`
	Name             string
	Views            int
	Categories       []Category
	Photo            string
	Description      string
	ShortDescription string
	ShopID           string
}

type Category struct {
	ID               string `gorm:"primary_key"`
	CatalogID        string
	Name             string
	Views            int
	SubCategories    []SubCategory
	Photo            string
	ShortDescription string
	Description      string
	IsSale           bool
	ShopID           string
}

type SubCategory struct {
	ID               string `gorm:"primary_key"`
	CategoryID       string
	CatalogID        string
	Name             string
	Views            int
	Products         []Product
	Photo            string
	Description      string
	ShortDescription string
	ShopID           string
}

type Product struct {
	ID               string `gorm:"primary_key"`
	CategoryID       string
	CatalogID        string
	SubCategoryID    string
	Photo            string
	Description      string
	ShortDescription string
	Views            int
	Photos           []Image
	PriceNew         string
	PriceOld         string
	Name             string
	Properties       []Property
}

type Property struct {
	ID        string `gorm:"primary_key"`
	ProductID string
	Name      string
	Value     string
	IsUnique  bool
}

type Shop struct {
	ID       string `gorm:primary_key`
	Name     string
	Address  string
	Location string
	Photo    string
}

type Image struct {
	ID        string `gorm:primary_key`
	ProductID string
	Path      string
}
