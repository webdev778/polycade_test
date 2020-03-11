import { createStore, combineReducers } from 'redux';
import machine from './machine';
import test from './test';

const store = createStore(combineReducers({machine, test}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

