import axiosService from "../utils/axiosService"
export const login = (data) =>{
    let api = "http://localhost:8762/user/auth";
    return axiosService.post(api,data);
}

export const  getUserByToken = () =>{
    let api = "http://localhost:8762/user/admin/checkUser";
    return axiosService.get(api);
}