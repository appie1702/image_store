import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './store'
import { fetchImages } from './components/actions';
import ToastProvider from './components/Toast/ToastProvider';


store.dispatch(fetchImages());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <BrowserRouter>
                <Provider store={store}>
                        <ToastProvider>
                                <App />
                        </ToastProvider>
                </Provider>
        </BrowserRouter>
);