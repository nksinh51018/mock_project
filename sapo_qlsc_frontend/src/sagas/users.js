import { call, delay, put } from 'redux-saga/effects';
import { STATUS_CODE } from './../constants/api';
import { message, notification } from "antd"
import { login, getUserByToken } from "../apis/users"
import { actloginFailed, actCheckUserSuccess, actCheckUser } from "../actions/users"
import { actFetchMaintenanceCardById } from "../actions/maintenanceCardAdd"
import History from '../history'
export function* loginSaga({ payload }) {
    try {
        const res = yield call(login, payload.data);
        console.log(res);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Đăng nhập thành công")
            localStorage.setItem('Authorization', res.headers.authorization);
            yield put(actCheckUser(res.headers.authorization));
            History.push("/admin")
        }

    } catch (error) {
        yield put(actloginFailed("Đăng nhập thất bại"));
    }
}

export function* checkUserSaga({ payload }) {
    try {
        const res = yield call(getUserByToken, payload.data);
        yield put(actCheckUserSuccess(res.data));
       
        
    } catch (error) {
        console.log(error);
        History.push("/login")
    }
}
