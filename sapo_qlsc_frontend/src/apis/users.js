import axiosService from "../utils/axiosService"
export const login = (data) =>{
    let api = "http://localhost:8090/auth";
    return axiosService.post(api,data);
}

export const  getUserByToken = () =>{
    let api = "http://localhost:8090/admin/checkUser";
    return axiosService.get(api);
}