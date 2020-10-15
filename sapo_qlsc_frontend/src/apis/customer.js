import axiosService from './../utils/axiosService';
import { API_ENDPOINT } from './../constants/api';

export const getCustomerById = (idCustomer) => {
    let url = `${API_ENDPOINT}/customers/${idCustomer}`;
    return axiosService.get(url);   
}

export const getListCustomer = (key, page, size, name, order) => {
    let url = `${API_ENDPOINT}/customers?search=${key}&size=${size}&page=${page}&nameField=${name}&order=${order}`;
    return axiosService.get(url);   
}

export const createCustomer = (data) =>{
    let url = `${API_ENDPOINT}/customers`;
    return axiosService.post(url,data);
}

export const updateCustomer = (idCustomer, data) => {
    let url = `${API_ENDPOINT}/customers/${idCustomer}`;
    return axiosService.put(url, data);
}

export const deleteCustomerById = (idCustomers) => {
    let ids = [];
    idCustomers.forEach(id => {
        ids.push(id)
    });
    let url = `${API_ENDPOINT}/customers?ids=${idCustomers}`;
    return axiosService.delete(url);   
}

export const updateMultipleStatusCustomer = (idCustomers) => {
    let ids = [];
    idCustomers.forEach(id => {
        ids.push(id)
    });
    let url = `${API_ENDPOINT}/customers/updateStatus?ids=${idCustomers}`;
    return axiosService.delete(url);   
}

export const filterPayStatusOfCustomer = (page, size, pay_status) => {
    let url = `${API_ENDPOINT}/customers/filter`;

    if(pay_status.pay_status !== undefined && pay_status.pay_status !== null){
        let len = pay_status.pay_status.length;
        if(len>0){
            url+= "?payStatus="
            for(let i=0;i<len-1;i++){
                url+= pay_status.pay_status[i]+","
            }
            url+= pay_status.pay_status[len-1]
        }
    }
    return axiosService.get(url);   
}
