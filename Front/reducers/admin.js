import React from 'react';
import localStorage from 'local-storage';

const defaultState = {};

export const user = (state = defaultState, action) => {
    switch (action.type) {
        case "USER_LOGGED_IN":
            return {
                ...action.user
            };
        default :
            let usr = localStorage.get("User");
            if (usr) {
                return JSON.parse(usr);
            }
            return state;
    }
};

export const catalog = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_CATALOG":
            return {...action.catalog};
        default :
            return state
    }
};


export const catalogs = (state = [], action) => {
    switch (action.type) {
        case "CATALOGS_LOADED":
            return action.catalogs;
        default :
            return state
    }
};

export const category = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_CATEGORY":
            return {...action.category};
        default :
            return state
    }
};


export const categories = (state = [], action) => {
    switch (action.type) {
        case "CATEGORIES_LOADED":
            return action.categories;
        default :
            return state
    }
};

export const subCategories = (state = [], action) => {
    switch (action.type) {
        case "SUBCATEGORIES_LOADED":
            return action.subCategories;
        default :
            return state
    }
};

export const subCategory = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_SUBCATEGORY":
            return {...action.subCategory};
        default :
            return state
    }
};

export const product = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_PRODUCT":
            return {...action.product};
        default :
            return state
    }
};

export const products = (state = [], action) => {
    switch (action.type) {
        case "PRODUCTS_LOADED":
            return action.products;
        default :
            return state
    }
};

export const shop = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_SHOP":
            return {...action.shop};
        default :
            return state
    }
};

export const sale = (state = defaultState, action) => {
    switch (action.type) {
        case "STORE_SALE":
            return {...action.sale};
        default :
            return state
    }
};


export const shops = (state = [], action) => {
    switch (action.type) {
        case "SHOPS_LOADED":
            return action.shops;
        default :
            return state
    }
};

export const dashboard = (state = {}, action) => {
    switch (action.type) {
        case "STORE_MAIN":
            return {...state, main: action.main};
        case "STORE_STATISTICS":
            return {...state, statistics: action.statistics};
        default :
            return state
    }
};