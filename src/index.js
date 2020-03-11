import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './socket';
import { fetchMachineListThunk } from './store/machine';
import axios from 'axios';

store.dispatch(fetchMachineListThunk()).then(
    function(){
        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
    }
)
