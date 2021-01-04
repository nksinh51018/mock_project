import { API_ENDPOINT } from '../constants/api';
import axiosService from '../utils/axiosService';
import axios from  "axios";
const url = "users";
let token = localStorage.getItem('Authorization');


export const getEmployee= (pageNum,pageSize,sortBy,descending,param) =>{
    let api = `${API_ENDPOINT}/user/admin/${url}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&param=${param}`;
    return axiosService.get(api);
}
export const addEmployee = (data) =>{
    let api = `${API_ENDPOINT}/user/admin/${url}`;
    return axiosService.post(api,data);
}
export const updateEmployee = async(data,id) =>{
    console.log(data,id);
    let api = `${API_ENDPOINT}/user/admin/${url}/${id}`;
    return axiosService.put(api,data);
}
export const deleteEmployee = ( data) =>{
    let array = [];
    data.forEach(element => {
        array.push(parseInt(element));
    });
    let api = `${API_ENDPOINT}/user/admin/${url}/delete?listID=${data}`;
    return axiosService.delete(api);
}
export const getItemEmployee = (id) =>{
    return axiosService.get(`${API_ENDPOINT}/user/admin/${url}/${id}`);
}
export const changePassword = (data) =>{
    let api = `${API_ENDPOINT}/${url}/changePassword`;
    return axiosService.put(api,data);
}
export const getmaintenanceCardByIdUser = (id,pageNum,pageSize,sortBy,descending,code,payStatus,workStatus) =>{
    //console.log(code);
    let api = `${API_ENDPOINT}/maintenancecard/admin/users/maintenanceCards/${id}?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}&descending=${descending}&code=${code}&payStatus=${payStatus}&workStatus=${workStatus}`;
    //console.log(api);
    return axiosService.get(api);
} 

