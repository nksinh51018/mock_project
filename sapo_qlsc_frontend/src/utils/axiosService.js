import Axios from "axios";

class AxiosService {

    constructor() {
        const instance = Axios.create();
        instance.interceptors.response.use(this.handleSucess, this.handleError)
        this.instance = instance;
    }

    handleSucess(res) {
        return res;
    }

    handleError(e) {
        return Promise.reject(e);
    }

    get(url) {
        return this.instance.get(url, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } });
    }

    post(url, body) {
        return this.instance.post(url, body, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }

    put(url, body) {
        return this.instance.put(url, body, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }

    delete(url) {
        return this.instance.delete(url, { 'headers': { 'Authorization': localStorage.getItem("Authorization") } })
    }
}

export default new AxiosService();