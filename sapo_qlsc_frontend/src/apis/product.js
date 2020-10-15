import { API_ENDPOINT } from '../constants/api';
import axiosService from '../utils/axiosService';

export const getProduct = (id) => {
    const url = `${API_ENDPOINT}/products/${id}`;
    return axiosService.get(url);
}