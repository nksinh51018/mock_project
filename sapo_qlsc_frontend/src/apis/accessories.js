import axiosService from '../utils/axiosService';
import { API_ENDPOINT } from '../constants/api';

export const getListAccessories = (key, page, size) => {
    let url = `${API_ENDPOINT}/accessories?search=${key}&size=${size}&page=${page}`;
    return axiosService.get(url);
};