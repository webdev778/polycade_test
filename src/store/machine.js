// ACTION_TYPE
const FETCH_MACHINE_LIST_PENDING = 'FETCH_MACHINE_LIST_PENDING';
const FETCH_MACHINE_LIST_FAILURE = 'FETCH_MACHINE_LIST_FAILURE';
const FETCH_MACHINE_LIST_SUCCESS = 'FETCH_MACHINE_LIST_SUCCESS';

const UPDATE_MACHINE_HEALTH = 'UPDATE_MACHINE_HELATH';
const UPDATE_MACHINE_INFO = 'UPDATE_MACHINE_INFO';

// ACTIONS
export const fetchMachineListPending = () => ({ type: FETCH_MACHINE_LIST_PENDING });
export const fetchMachineListSuccess = (resp) =>({ type: FETCH_MACHINE_LIST_SUCCESS, resp });
export const fetchMachineListFailure = (error) => ({ type: FETCH_MACHINE_LIST_FAILURE, error });

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
export default function reducer( state = initialState, action ) {
    switch (action.type){
        case FETCH_MACHINE_LIST_PENDING:
            return { ...state, loading: true };
        case FETCH_MACHINE_LIST_SUCCESS:
            return { ...state, loading: false, loaded: true, data: action.resp };
        case FETCH_MACHINE_LIST_FAILURE:
            return { ...state, loading: false, error: action.error };  

        case UPDATE_MACHINE_HEALTH:
            const { id, health } = action.payload;
            return { ...state, data: state.map(m => ({...m, health: m.id === id ? health : m.health}))}
        case UPDATE_MACHINE_INFO:            
            return { ...state, data: state.map(m => m.id === action.id ? {...m, ...action.payload} : m)}
        default:
            return state;
    }
}
