import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {BrowserRouter, Route} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import {Provider} from "react-redux";

const store = configureStore();
const App = (
    <Provider store={store}>
        <BrowserRouter>
            <Route component={AppRouter}/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(App, document.getElementById('app'));