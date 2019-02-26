import React from "react";
import {Route, Switch} from "react-router-dom";
import LoginPage from '../views/login/LoginPage';
import AdminRoute from "../components/routes/AdminRoute";
import DashboardPage from "../views/dashboard/DashboardPage";
import CatalogPage from "../views/catalog/CatalogPage";
import CatalogDetailPage from '../views/catalog/CatalogDetailPage'
import CatalogAddOrEditPage from '../views/catalog/CatalogAddOrEditPage'
import CategoryPage from "../views/category/CategoryPage";
import CategoryDetailPage from "../views/category/CategoryDetailPage";
import CategoryAddOrEditPage from "../views/category/CategoryAddOrEditPage";
import SubCategoryPage from '../views/subCategory/SubCategoryPage'
import SubCategoryDetailPage from "../views/subCategory/SubCategoryDetailPage";
import SubCategoryAddOrEditPage from "../views/subCategory/SubCategoryAddOrEditPage";
import ProductDetailPage from "../views/product/ProductDetailPage";
import ProductPage from "../views/product/ProductPage";
import ProductAddOrEditPage from "../views/product/ProductAddOrEditPage";
import ShopPage from "../views/shop/ShopPage";
import ShopDetailPage from "../views/shop/ShopDetailPage";
import ShopAddOrEditPage from "../views/shop/ShopAddOrEditPage";

const AppRouter = () => (
    <Switch>
        <Route path="/admin" component={LoginPage}/>
        <AdminRoute path="/dashboard" component={DashboardPage}/>
        <AdminRoute path="/catalog" component={CatalogPage}/>
        <AdminRoute path="/catalogDetail" component={CatalogDetailPage}/>
        <AdminRoute path="/catalogAddOrEdit" component={CatalogAddOrEditPage}/>
        <AdminRoute path="/category" component={CategoryPage}/>
        <AdminRoute path="/categoryDetail" component={CategoryDetailPage}/>
        <AdminRoute path="/categoryAddOrEdit" component={CategoryAddOrEditPage}/>
        <AdminRoute path="/subCategory" component={SubCategoryPage}/>
        <AdminRoute path="/subCategoryDetail" component={SubCategoryDetailPage}/>
        <AdminRoute path="/subCategoryAddOrEdit" component={SubCategoryAddOrEditPage}/>
        <AdminRoute path="/product" component={ProductPage}/>
        <AdminRoute path="/productDetail" component={ProductDetailPage}/>
        <AdminRoute path="/productAddOrEdit" component={ProductAddOrEditPage}/>
        <AdminRoute path="/shop" component={ShopPage}/>
        <AdminRoute path="/shopDetail" component={ShopDetailPage}/>
        <AdminRoute path="/shopAddOrEdit" component={ShopAddOrEditPage}/>
    </Switch>
);

export const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export default AppRouter;