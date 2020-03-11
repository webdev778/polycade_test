import { createStore } from 'redux';
import * as api from '../api';

// ACTION_TYPE

const ADD_MACHINE = 'ADD_MACHINE';
const FETCH_MACHINE_LIST = 'FETCH_MACHINE_LIST';
const UPDATE_MACHINE_INFO = 'UPDATE_MACHINE_INFO';

// ACTIONS

export const addMachine = (payload) => ({ type: ADD_MACHINE, payload });
export const fetchMachineList = (payload) => ({ type: FETCH_MACHINE_LIST, payload });
export const updateMachineInfo = (id, payload) => ({ type: UPDATE_MACHINE_INFO, id, payload });

// REDUX-THUNK
export const updateMachine = (id, data) => {

    return (dispatch) => {
            //dispatch({type: UPDATE_MACHINE_INFO_PENDING});
            return api.updateMachineInfo(id, data)
            .then((result)=>{
                dispatch(updateMachineInfo(id, data));
            }).catch(e=>{
                //dispatch({type: UPDATE_MACHINE_INFO_FAILED, error:e});
            });                        
    }
}

export const fetchMachineListThunk = () => {
    return dispatch => {
        return api.getMachineList().then(
            (resp) => dispatch(fetchMachineList(resp.data))
        )
    }
}


// INIT STATE

const initialState = [];

// REDUCER
export default function reducer( state = initialState, action ) {
    switch (action.type){
        case ADD_MACHINE:
            return [...state, action.payload];
        case FETCH_MACHINE_LIST:
            return action.payload;
        case UPDATE_MACHINE_INFO:            
            return state.map(m => m.id === action.id ? {...m, ...action.payload} : m);
        default:
            return state;
    }
}
