import { createStore } from 'redux';
import api from '../api';
import _ from 'lodash';

// ACTION_TYPE

const ADD_MACHINE = 'ADD_MACHINE';
const FETCH_MACHINE_LIST = 'FETCH_MACHINE_LIST';
const UPDATE_MACHINE_HEALTH = 'UPDATE_MACHINE_HELATH';
const UPDATE_MACHINE_INFO = 'UPDATE_MACHINE_INFO';

// ACTIONS

export const addMachine = (payload) => ({ type: ADD_MACHINE, payload });
export const fetchMachineList = (payload) => ({ type: FETCH_MACHINE_LIST, payload });
export const updateMachineHealth = (payload) => ({ type: UPDATE_MACHINE_HEALTH, payload });
export const updateMachineInfo = (id, payload) => ({ type: UPDATE_MACHINE_INFO, id, payload });

// INIT STATE

const initialState = [];

// REDUCER
export default function reducer( state = initialState, action ) {
    switch (action.type){
        case ADD_MACHINE:
            return [...state, action.payload];
        case FETCH_MACHINE_LIST:
            return action.payload;
        case UPDATE_MACHINE_HEALTH:
            const { id, health } = action.payload;
            return state.map(m => ({...m, health: m.id === id ? health : m.health})) ;
        case UPDATE_MACHINE_INFO:            
            return state.map(m => m.id === action.id ? {...m, ...action.payload} : m);
        default:
            return state;
    }
}
