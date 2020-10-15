import axiosService from './../utils/axiosService';
import { API_ENDPOINT } from './../constants/api';

export const getListProvinces = () => {
    let url = `${API_ENDPOINT}/provinces`;
    return axiosService.get(url);   
}

export const getWardsOfProvinces = (code) => {
    let url = `${API_ENDPOINT}/wards/${code}`;
    return axiosService.get(url);   
}


