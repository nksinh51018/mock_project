import { API_ENDPOINT } from "../constants/api"
import axiosService from "../utils/axiosService";

export const getService = (id) => {
    let url = `${API_ENDPOINT}/products/${id}?type=2`;
    return axiosService.get(url);
}

export const createService = (data) => {
    let url = `${API_ENDPOINT}/products`;
    return axiosService.post(url, data);
}

export const updateService = (id, data) => {
    let url = `${API_ENDPOINT}/products/${id}`;
    return axiosService.put(url, data);
}

export const deleteService = (id) => {
    let url = `${API_ENDPOINT}/products/${id}`;
    return axiosService.delete(url, id);
}