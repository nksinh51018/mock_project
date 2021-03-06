import {API_ENDPOINT} from '../constants/api'
import axiosService from '../utils/axiosService'

export const searchCustomer = (key,page,size) =>{
    let url = `${API_ENDPOINT}/customer/admin/customers?search=${key}&size=${size}&page=${page}`;
    console.log(url);
    return axiosService.get(url);
}

export const createCustomer = (data) =>{

    let url = `${API_ENDPOINT}/customer/admin/customers`;
    return axiosService.post(url,data);
    
}

export const searchRepairman = (key,page,size) =>{
    console.log(key);
    let url = `${API_ENDPOINT}/user/admin/users/maintenanceCard?page=${page}&size=${size}&key=${key}`;
    return axiosService.get(url);
}

export const searchProduct = (key,page,size) =>{
    let url = `${API_ENDPOINT}/product/admin/products?size=${size}&page=${page}&search=${key}`;
    return axiosService.get(url);
}

export const createMaintenanceCard = (data) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCards`;
    return axiosService.post(url,data);
}

export const fetchMaintenanceCardById = (id) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCards/${id}`;
    return axiosService.get(url);
}

export const updateMaintenanceCard = (data) =>{
    console.log(data);
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCards/${data.id}`;
    return axiosService.put(url,data);
}

export const completeCard = (ids) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCards/workStatus`;
    console.log(ids);
    return axiosService.put(url,ids);
}

export const updateStatusDetail = (id) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCardDetails/status/${id}`;
    return axiosService.put(url);
}


export const createPaymentHistory = (data) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/paymentHistories`;
    return axiosService.post(url,data);
}

export const deleteMaintenanceCard = (data) =>{
    let url = `${API_ENDPOINT}/maintenancecard/admin/maintenanceCards/${data}`;
    return axiosService.delete(url);
}

export const getPlateNumberByCustomer = (data) =>{
    let url = `${API_ENDPOINT}/customer/admin/vehicle/customer/${data}`;
    return axiosService.get(url);
}

export const getHmac = (data) =>{
    let url = `${API_ENDPOINT}/user/admin/hmac/${data}`;
    return axiosService.get(url);
}

export const actGetMaintenanceCardByHmac = (id,hmac) =>{
    let url = `${API_ENDPOINT}/maintenancecard/user/maintenanceCards?id=${id}&hmac=${hmac}`;
    return axiosService.get(url);
}