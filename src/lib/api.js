import axios from 'axios';

export const getAllMachines = () => axios.get('/machines');
export const getMachineById = (id) => axios.get(`/machines/${id}`);
export const updateMachine = (id, info) => axios.put(`/machines/${id}`, info);
