package router

import (
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"../handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	//serving
	Route{
		"Index",
		"GET",
		"/",
		handlers.Index,
	},
	//auth
	Route{
		"login",
		"POST",
		"/api/login",
		handlers.Login,
	},

	//region Catalog
	Route{
		"login",
		"GET",
		"/api/catalog",
		handlers.CatalogGet,
	},
	Route{
		"login",
		"POST",
		"/api/catalog",
		handlers.CatalogAdd,
	},
	Route{
		"login",
		"PUT",
		"/api/catalog",
		handlers.CatalogUpdate,
	},
	Route{
		"login",
		"DELETE",
		"/api/catalog/{id}",
		handlers.CatalogRemove,
	},
	//endregion

	//region Category
	Route{
		"login",
		"GET",
		"/api/category",
		handlers.CategoryGet,
	},
	Route{
		"login",
		"GET",
		"/api/category/{id}",
		handlers.CategoryGet,
	},
	Route{
		"login",
		"GET",
		"/api/category/{id}/{isView}",
		handlers.CategoryGet,
	},
	Route{
		"login",
		"POST",
		"/api/category",
		handlers.CategoryAdd,
	},
	Route{
		"login",
		"PUT",
		"/api/category",
		handlers.CategoryUpdate,
	},
	Route{
		"login",
		"DELETE",
		"/api/category/{id}",
		handlers.CategoryRemove,
	},
	//endregion

	//region SubCategory
	Route{
		"login",
		"GET",
		"/api/subCategory",
		handlers.SubCategoryGet,
	},
	Route{
		"login",
		"GET",
		"/api/subCategory/{id}",
		handlers.SubCategoryGet,
	},
	Route{
		"login",
		"GET",
		"/api/subCategory/{id}/{isView}",
		handlers.SubCategoryGet,
	},
	Route{
		"login",
		"POST",
		"/api/subCategory",
		handlers.SubCategoryAdd,
	},
	Route{
		"login",
		"PUT",
		"/api/subCategory",
		handlers.SubCategoryUpdate,
	},
	Route{
		"login",
		"DELETE",
		"/api/subCategory/{id}",
		handlers.SubCategoryRemove,
	},
	//endregion

	//region Product
	Route{
		"login",
		"GET",
		"/api/product",
		handlers.ProductGet,
	},
	Route{
		"login",
		"GET",
		"/api/product/{id}",
		handlers.ProductGet,
	},
	Route{
		"login",
		"GET",
		"/api/product/{id}/{isView}",
		handlers.ProductGet,
	},
	Route{
		"login",
		"GET",
		"/api/product/{id}/{isView}/{isProduct}",
		handlers.ProductGet,
	},
	Route{
		"login",
		"GET",
		"/api/product/{isView}",
		handlers.ProductGet,
	},
	Route{
		"login",
		"POST",
		"/api/product",
		handlers.ProductAdd,
	},
	Route{
		"login",
		"PUT",
		"/api/product",
		handlers.ProductUpdate,
	},
	Route{
		"login",
		"DELETE",
		"/api/product/{id}",
		handlers.ProductRemove,
	},
	//endregion

	//region Shop
	Route{
		"login",
		"GET",
		"/api/shop/{id}",
		handlers.ShopGet,
	},
	Route{
		"login",
		"GET",
		"/api/shop",
		handlers.ShopGet,
	},
	Route{
		"login",
		"POST",
		"/api/shop",
		handlers.ShopAdd,
	},
	Route{
		"login",
		"PUT",
		"/api/shop",
		handlers.ShopUpdate,
	},
	Route{
		"login",
		"DELETE",
		"/api/shop/{id}",
		handlers.ShopRemove,
	},
	//endregion
	Route{
		"named",
		"GET",
		"/api/main",
		handlers.GetMainView,
	},
	Route{
		"named",
		"GET",
		"/api/statistics",
		handlers.GetStatistics,
	},
	Route{
		"named",
		"GET",
		"/api/sale",
		handlers.GetSale,
	},
	Route{
		"named",
		"POST",
		"/api/admins",
		handlers.AdminAdd,
	},
	Route{
		"named",
		"PUT",
		"/api/admins",
		handlers.AdminUpdate,
	},
	Route{
		"named",
		"DELETE",
		"/api/admins/{id}",
		handlers.AdminRemove,
	},
	Route{
		"named",
		"GET",
		"/api/admins",
		handlers.AdminGet,
	},
}

func NewRouter() http.Handler {
	router := mux.NewRouter().StrictSlash(true)
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // All origins
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})
	router.PathPrefix("/public/js/").Handler(http.StripPrefix("/public/js/", http.FileServer(http.Dir("./public/js/"))))
	router.PathPrefix("/public/css/").Handler(http.StripPrefix("/public/css/", http.FileServer(http.Dir("./public/css/"))))
	router.PathPrefix("/public/uploads/").Handler(http.StripPrefix("/public/uploads/", http.FileServer(http.Dir("./public/uploads/"))))
	router.NotFoundHandler = http.HandlerFunc(handlers.NotFound)
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return c.Handler(router)
}
