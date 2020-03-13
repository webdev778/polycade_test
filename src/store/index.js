import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import machine from './machine';
import penderMiddleware, { penderReducer } from 'redux-pender';

const store = createStore(combineReducers({machine, pender: penderReducer}), 
    compose(applyMiddleware(penderMiddleware()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;

