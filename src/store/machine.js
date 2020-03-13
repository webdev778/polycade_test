import axios from 'axios';
import { handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

// ACTION_TYPE
const FETCH_MACHINE_LIST = 'FETCH_MACHINE_LIST';

const UPDATE_MACHINE_HEALTH = 'UPDATE_MACHINE_HELATH';
const UPDATE_MACHINE_INFO = 'UPDATE_MACHINE_INFO';

// ACTIONS
export const fetchMachineList = () => ({ type: FETCH_MACHINE_LIST, payload: axios.get('/machines').then(
                                                                                    (resp) => new Promise(resolve=> setTimeout(() => resolve(resp), 3000)))});

export const updateMachineHealth = (payload) => ({ type: UPDATE_MACHINE_HEALTH, payload });
export const updateMachineInfo = (id, payload) => ({ type: UPDATE_MACHINE_INFO, id, payload });

// INIT STATE
const initialState = {
    loading: false,
    loaded: false,
    error: null,
    data: []
};

// REDUCER
export default handleActions({
    ...pender({
        type: FETCH_MACHINE_LIST,
        onPending: (state, action) => ({ ...state, loading: true }),
        onSuccess: (state, action) => ({ ...state, loading: false, loaded: true, data: action.payload.data || [] }),
        onFailure: (state, action) => ({ ...state, loading: false, error: action.error }),
    }),
    [UPDATE_MACHINE_HEALTH]: (state, action) => ({ ...state, data: state.map(m => ({...m, health: m.id === action.payload.id ? action.payload.health : m.health}))}),
    [UPDATE_MACHINE_INFO]: (state, action) => ({ ...state, data: state.map(m => m.id === action.id ? {...m, ...action.payload} : m)})
}, initialState);
