import React from 'react';
import api from '../api/admin'

export const userLoggedIn = (user) => ({
    type: "USER_LOGGED_IN",
    user
});

export const authError = (error) => ({
    type: "AUTH_ERROR",
    error
});

export const serverError = (error) => ({
    type: "AUTH_ERROR",
    error
});

export const catalogsLoaded = catalogs => ({
    type: 'CATALOGS_LOADED',
    catalogs
});
export const categoriesLoaded = categories => ({
    type: 'CATEGORIES_LOADED',
    categories
});

export const subCategoriesLoaded = subCategories => ({
    type: 'SUBCATEGORIES_LOADED',
    subCategories
});

export const productsLoaded = products => ({
    type: 'PRODUCTS_LOADED',
    products
});

export const shopsLoaded = shops => ({
    type: 'SHOPS_LOADED',
    shops
});

export const loginAsync = (credentials) => ((dispatch) => (
    api.auth.login(credentials)
        .then((res) => {
            dispatch(userLoggedIn(res.data));
            return res;
        })
        .catch(({data}) => dispatch(authError(data)))
));

export const populateCatalogsAsync = () => ((dispatch) => (
    api.catalog.get()
        .then(res => {
            dispatch(catalogsLoaded(res.data));
            return res
        }).catch(({data}) => dispatch(serverError(data)))
));

export const populateSubCategoriesAsync = () => ((dispatch) => (
    api.subCategory.get()
        .then(res => {
            dispatch(subCategoriesLoaded(res.data));
            return res
        }).catch(({data}) => dispatch(serverError(data)))
));

export const populateCategoriesAsync = (id) => ((dispatch) => {
    let str = !id ? "" : "/" + id;
    return (
        api.category.get(str)
            .then(res => {
                dispatch(categoriesLoaded(res.data));
                return res
            }).catch(({data}) => dispatch(serverError(data)))
    )
});

export const populateProductsAsync = () => ((dispatch) => (
    api.product.get()
        .then(res => {
            dispatch(productsLoaded(res.data));
            return res
        }).catch(({data}) => dispatch(serverError(data)))
));

export const populateShopsAsync = (id) => ((dispatch) => {
    return (
        api.shop.get(id ? "/" + id : "")
            .then(res => {
                dispatch(shopsLoaded(res.data));
                return res
            }).catch(({data}) => dispatch(serverError(data)))
    )
});

export const populateShopAsync = (id) => ((dispatch) => {
    return (
        api.shop.get("/" + id)
            .then(res => {
                dispatch(storeShop(res.data));
                return res
            }).catch(({data}) => dispatch(serverError(data)))
    )
});

export const storeCatalog = catalog => ({type: "STORE_CATALOG", catalog});
export const storeCategory = category => ({type: "STORE_CATEGORY", category});
export const storeSubCategory = subCategory => ({type: "STORE_SUBCATEGORY", subCategory});
export const storeProduct = product => ({type: "STORE_PRODUCT", product});
export const storeShop = shop => ({type: "STORE_SHOP", shop});
