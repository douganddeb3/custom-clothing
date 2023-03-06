import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// for redux, Provider is redux version of Provider which uses context:
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import {store, persistor } from './store/store';

import App from './App';
// import {UserProvider} from './contexts/user.context';
// import {CategoriesProvider} from './contexts/categories.context';

import reportWebVitals from './reportWebVitals';
// import {CartProvider} from './contexts/cart.context';
// import './index.scss';

import { GlobalStyle} from './global.styles';

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://crwn-clothing.com/',
    cache: new InMemoryCache(),
    headers: {
      'Access-Control-Allow-Origin':'*',
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
          <BrowserRouter>
          <Elements stripe={stripePromise}>
            <GlobalStyle />
                <App />
              
          </Elements >
          </BrowserRouter>
        
      </PersistGate>
    </Provider>
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorkerRegistration.register();
