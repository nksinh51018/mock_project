import axiosService from './../utils/axiosService';
import { API_ENDPOINT } from './../constants/api';

export const getTotalToday = (startDate, endDate) => {
    //console.log(startDate);
    //console.log(endDate);
    let url = `${API_ENDPOINT}/totals?startDate=${startDate}&endDate=${endDate}`;
    return axiosService.get(url);   
}

export const getTotalMoney = (startDate, endDate) => {
    //console.log(startDate);
    //console.log(endDate);
    let url = `${API_ENDPOINT}/totalDayMoneys?startDate=${startDate}&endDate=${endDate}`;
    return axiosService.get(url);   
}

export const getTopRepairMan = (startDate, endDate) => {
    //console.log(startDate);
    //console.log(endDate);
    let url = `${API_ENDPOINT}/topRepairMans?startDate=${startDate}&endDate=${endDate}`;
    return axiosService.get(url);   
}

export const getTopService = (startDate, endDate) => {
    //console.log(startDate);
    //console.log(endDate);
    let url = `${API_ENDPOINT}/topServices?startDate=${startDate}&endDate=${endDate}`;
    return axiosService.get(url);   
}