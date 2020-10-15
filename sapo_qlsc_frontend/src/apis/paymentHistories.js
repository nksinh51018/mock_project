import axiosService from './../utils/axiosService';
import { API_ENDPOINT } from './../constants/api';

export const getPaymentHistoriesByIdCustomer = (keyword, page, size, id, filter) => {
    //console.log(filter);
    let url = `${API_ENDPOINT}/paymentHistories/customer?id=${id}&page=${page}&size=${size}&search=${keyword}&payMethods=${filter}`;
    return axiosService.get(url);   
}
