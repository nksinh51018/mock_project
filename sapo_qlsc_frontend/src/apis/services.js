import { API_ENDPOINT } from "../constants/api";
import axiosService from "../utils/axiosService";

export const getListServices = (key, page, size) => {
    let url = `${API_ENDPOINT}/product/admin/services?search=${key}&size=${size}&page=${page-1}`;
    return axiosService.get(url);
}

export const deleteServices = (data) => {
    let url = `${API_ENDPOINT}/product/admin/products`;
    return axiosService.put(url, data);
}