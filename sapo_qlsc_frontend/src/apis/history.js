import axiosService from '../utils/axiosService';
import { API_ENDPOINT } from '../constants/api';

export const getListProductHistory = (page, size) => {
    let url = `${API_ENDPOINT}/product/admin/history?size=${size}&page=${page}`;
    return axiosService.get(url);
};