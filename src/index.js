import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// for redux, Provider is redux version of Provider which uses context:
import { Provider } from 'react-redux';
import {store } from './store/store';

import App from './App';
// import {UserProvider} from './contexts/user.context';
// import {CategoriesProvider} from './contexts/categories.context';
import reportWebVitals from './reportWebVitals';
// import {CartProvider} from './contexts/cart.context';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
              <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
