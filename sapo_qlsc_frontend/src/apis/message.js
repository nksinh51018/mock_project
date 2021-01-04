import axiosService from '../utils/axiosService';
import { API_ENDPOINT } from '../constants/api';

export const getMessages = (page, size) => {
    let url = `${API_ENDPOINT}/user/admin/messages?size=${100}&page=${page}`;
    return axiosService.get(url);
};

export const readMessages = (id) => {
    let url = `${API_ENDPOINT}/user/admin/messages/${id}`;
    return axiosService.put(url);
};