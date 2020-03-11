import { createStore } from 'redux';
import api from '../api';

// ACTION_TYPE
const FETCH_MACHINE_INFO_PENDING = 'FETCH_MACHINE_INFO_PENDING';
const FETCH_MACHINE_INFO_FAILURE = 'FETCH_MACHINE_INFO_FAILURE';
const FETCH_MACHINE_INFO_SUCCESS = 'FETCH_MACHINE_INFO_SUCCESS';

// ACTION CREATORS
export const fetchMachineInfoPending = () => ({ type: FETCH_MACHINE_INFO_PENDING });
export const fetchMachineInfoFailure = (error) => ({ type: FETCH_MACHINE_INFO_FAILURE, error });
export const fetchMachineInfoSuccess = (resp) =>({ type: FETCH_MACHINE_INFO_SUCCESS, resp });


// INIT STATE

const initialState = {
    fetchStatus: 'INIT',
    error: null,
    resp: null
};

// REDUCER
export default function reducer( state = initialState, action ) {
    switch (action.type){      
        case FETCH_MACHINE_INFO_PENDING:
            return { ...state, ...{fetchStatus: 'PENDING'} };
            return { ...state };
        case FETCH_MACHINE_INFO_FAILURE:
            state.fetchStatus = 'FAILED';
            state.error = action.error;
            return { ...state };            
        case FETCH_MACHINE_INFO_SUCCESS:
            return { ...state, ...{fetchStatus: 'SUCCESS', resp: action.resp} };
        default:
            return state;
    }
}


