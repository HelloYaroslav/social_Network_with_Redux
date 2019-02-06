import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import {Provider} from "react-redux";
import {CookiesProvider} from "react-cookie";


const renderAll = () => {
    ReactDOM.render((
        <Provider store={store}>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </Provider>
    ), document.getElementById('root'));
};
renderAll();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA7
serviceWorker.unregister();
