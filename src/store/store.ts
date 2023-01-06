import { compose, applyMiddleware, Middleware } from 'redux';
//note createStore had a deprecation warning which said to use:
import { legacy_createStore as createStore} from 'redux';
// legacy_createStore as 
import logger from 'redux-logger';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './root-reducer';

// import { loggerMiddleware } from './middleware/logger';

import { rootSaga } from './root-saga';


declare global{
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
};

export type RootState = ReturnType<typeof rootReducer>; 

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// this shows state before and after reducer
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    // thunk,
    sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
 
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ )|| compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);