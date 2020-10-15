import { API_ENDPOINT } from "../constants/api"
import axiosService from "../utils/axiosService";

export const getProducts = (key, page, size) => {
    let url = `${API_ENDPOINT}/products?search=${key}&page=${page}&size=${size}`;
    return axiosService.get(url);
}

export const deleteProducts = (data) => {
    let url = `${API_ENDPOINT}/products`;
    return axiosService.put(url, data);
}