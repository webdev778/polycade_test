import { createStore } from 'redux';
import machine from './machine';

const store = createStore(machine, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

