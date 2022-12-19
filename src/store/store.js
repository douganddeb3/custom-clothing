import { compose, applyMiddleware } from 'redux';
//note createStore had a deprecation warning which said to use:
import { legacy_createStore as createStore} from 'redux';
// legacy_createStore as 
// import logger from 'redux-logger';


import { rootReducer } from './root-reducer';

// currying
const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState:', store.getState());

    next(action);
    console.log('next state: ', store.getState());


};

// this shows state before and after reducer
const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);