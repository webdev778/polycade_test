import axios from "axios";


export const getMachineList = () => axios.get('/machines');
export const getMachineInfo = (id) => axios.get(`/machines/${id}`);
export const updateMachineInfo = (id, updateInfo) => axios.put(`/machines/${id}`, updateInfo);