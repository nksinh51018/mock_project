import axiosService from '../utils/axiosService';
import { API_ENDPOINT } from '../constants/api';

export const getMaintenanceCard = (keyword, page, size, nameField, order, filter) => {
    let url = `${API_ENDPOINT}/maintenanceCards?search=${keyword}&page=${page}&size=${size}`;
    if (filter !== undefined) {
        if (filter.workStatus !== undefined && filter.workStatus !== null) {
            let n = filter.workStatus.length;
            if(n>0){
                url+= "&workStatus="
                for(let i=0;i<n-1;i++){
                    url+= filter.workStatus[i]+","
                }
                url+= filter.workStatus[n-1]
            }
        }
        if (filter.payStatus !== undefined && filter.payStatus !== null) {
            let n1 = filter.payStatus.length;
            if(n1>0){
                url+= "&payStatus="
                for(let i=0;i<n1-1;i++){
                    url+= filter.payStatus[i]+","
                }
                url+= filter.payStatus[n1-1]
            }
        }
    }
    if (nameField !== undefined) {
        url += `&nameField=${nameField}`;
    }
    if (order !== undefined) {
        url += `&order=${order}`;
    }
    console.log(url);
    return axiosService.get(url);
}

export const getMaintenanceCardByIdCustomer = (keyword, page, size, id, nameField, order, filter) => {
    let url =`${API_ENDPOINT}/maintenanceCards/customer?id=${id}&search=${keyword}&page=${page}&size=${size}`;
    if (filter !== undefined) {
        if (filter.workStatus !== undefined && filter.workStatus !== null) {
            let n = filter.workStatus.length;
            if(n>0){
                url+= "&workStatus="
                for(let i=0;i<n-1;i++){
                    url+= filter.workStatus[i]+","
                }
                url+= filter.workStatus[n-1]
            }
        }
        if (filter.payStatus !== undefined && filter.payStatus !== null) {
            let n1 = filter.payStatus.length;
            if(n1>0){
                url+= "&payStatus="
                for(let i=0;i<n1-1;i++){
                    url+= filter.payStatus[i]+","
                }
                url+= filter.payStatus[n1-1]
            }
        }
    }
    if (nameField !== undefined) {
        url += `&nameField=${nameField}`;
    }
    if (order !== undefined) {
        url += `&order=${order}`;
    }

    return axiosService.get(url)
}