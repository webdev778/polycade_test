import { createStore } from "redux";
import { createAction, handleActions } from "redux-actions";
import { pender } from "redux-pender";
import * as api from "../lib/api";

// ACTION_TYPE
const GET_ALL_MACHINES = "machine/GET_ALL_MACHINES";
const GET_MACHINE = "machine/GET_MACHINE";
const UPDATE_MACHINE = "machine/UPDATE_MACHINE";
const UPDATE_MACHINE_SOCKET = "machine/UPDATE_MACHINE_SOCKET";
const SET_CURRENT = "machine/SET_CURRENT";

// ACTIONS
export const getAllMachines = createAction(GET_ALL_MACHINES, api.getAllMachines);
export const getMachine = createAction(GET_MACHINE, api.getMachineById);
export const updateMachine = createAction(UPDATE_MACHINE, api.updateMachine);
export const updateMachineSocket = createAction(UPDATE_MACHINE_SOCKET, (id, data) => ({ id, data }));
export const setCurrent = createAction(SET_CURRENT);

// INIT STATE
const initialState = {
	fetching: false,
	fetched: false,
	current: null,
	data: [],
	error: null
};

// REDUCER
const rmap = (o_ary, k, n_e) =>
	o_ary.map(e => (e.id === k ? { ...e, ...n_e } : e));

export default handleActions(
	{   
		...pender({
			type: GET_ALL_MACHINES,
			onSuccess: (state, action) => ({...state, fetched: true, fetching: false, data: action.payload.data}),
			onPending: (state, action) => ({ ...state, fetching: true }),
			onFailure: (state, action) => ({...state, error: action.payload.error})
		}),
		...pender({
			type: GET_MACHINE,
			onSuccess: (state, action) => ({...state, fetched: true, fetching: false, data: rmap(state.data, action.payload.id, action.payload.data)}),
			onPending: (state, action) => ({ ...state, fetching: true }),
			onFailure: (state, action) => ({...state, error: action.payload.error})
		}),
		...pender({
			type: UPDATE_MACHINE,
			onSuccess: (state, action) => ({...state, fetched: true, fetching: false, data: rmap(state.data, action.payload.data.id, action.payload.data)}),
			onPending: (state, action) => ({ ...state, fetching: true }),
			onFailure: (state, action) => ({...state, error: action.payload.error})
    	}),

		[UPDATE_MACHINE_SOCKET]: (state, action) => ({...state, data: rmap(state.data, action.payload.id, action.payload.data)}),
		[SET_CURRENT]: (state, action) => ({...state, current: action.payload})
	},
	initialState
);
