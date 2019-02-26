import React from 'react';
import axios from 'axios'

export const url = "http://localhost:8080";
export const urlResolve = param => (url + param);

export default {
    auth: {
        login: (credentials) => axios.post(url + '/api/login', credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
    catalog: {
        get: () => axios.get(url + '/api/catalog')
            .then(res => res)
            .catch(({response}) => response),
        add: credentials => axios.post(url + "/api/catalog", credentials)
            .then(res => res)
            .catch(({response}) => response),
        update: credentials => axios.put(url + "/api/catalog", credentials)
            .then(res => res)
            .catch(({response}) => response),
        delete: credentials => axios.delete(url + "/api/catalog/" + credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
    category: {
        get: credentials => axios.get(url + '/api/category' + credentials)
            .then(res => res)
            .catch(({response}) => response),
        add: credentials => axios.post(url + "/api/category", credentials)
            .then(res => res)
            .catch(({response}) => response),
        update: credentials => axios.put(url + "/api/category", credentials)
            .then(res => res)
            .catch(({response}) => response),
        delete: credentials => axios.delete(url + "/api/category/" + credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
    subCategory: {
        get: () => axios.get(url + '/api/subCategory')
            .then(res => res)
            .catch(({response}) => response),
        add: credentials => axios.post(url + "/api/subCategory", credentials)
            .then(res => res)
            .catch(({response}) => response),
        update: credentials => axios.put(url + "/api/subCategory", credentials)
            .then(res => res)
            .catch(({response}) => response),
        delete: credentials => axios.delete(url + "/api/subCategory/" + credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
    product: {
        get: () => axios.get(url + '/api/product')
            .then(res => res)
            .catch(({response}) => response),
        add: credentials => axios.post(url + "/api/product", credentials)
            .then(res => res)
            .catch(({response}) => response),
        update: credentials => axios.put(url + "/api/product", credentials)
            .then(res => res)
            .catch(({response}) => response),
        delete: credentials => axios.delete(url + "/api/product/" + credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
    shop: {
        get: credentials => axios.get(url + '/api/shop' + credentials)
            .then(res => res)
            .catch(({response}) => response),
        add: credentials => axios.post(url + "/api/shop", credentials)
            .then(res => res)
            .catch(({response}) => response),
        update: credentials => axios.put(url + "/api/shop", credentials)
            .then(res => res)
            .catch(({response}) => response),
        delete: credentials => axios.delete(url + "/api/shop/" + credentials)
            .then(res => res)
            .catch(({response}) => response),
    },
}