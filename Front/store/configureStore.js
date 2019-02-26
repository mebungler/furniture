import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {
    catalog,
    catalogs,
    categories,
    category,
    product,
    products,
    shop,
    shops,
    subCategories,
    subCategory,
    user
} from '../reducers/admin';

export default () => {
    return createStore(
        combineReducers({
            user,
            catalog,
            catalogs,
            category,
            categories,
            subCategory,
            subCategories,
            product,
            products,
            shops,
            shop
        }),
        applyMiddleware(thunk)
    );
};