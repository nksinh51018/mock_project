import { message } from "antd";
import { call, put } from "redux-saga/effects";
import { actionGetAccessoriesSuccess } from "../actions/accessories";
import { actionDeleteServicesFail } from "../actions/deleteServices";
import { actionGetServicesSuccess } from "../actions/services";
import { deleteServices, getListServices } from "../apis/services";
import { STATUS_CODE } from "../constants/api";

export function* getServicesSaga({ payload }) {
    try {
        const res = yield call(getListServices, payload.key, payload.page, payload.size);
        yield put(actionGetServicesSuccess(res.data));
    }
    catch (e) {

    }
}

export function* deleteServicesSaga({ payload }) {
    try {
        const res = yield call(deleteServices, payload.idArray);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Đã xóa dịch vụ");
            yield put(actionGetAccessoriesSuccess(res.data));
        }
        else {
            yield put(actionDeleteServicesFail(res.data));
        }
    }
    catch (e) {
        yield put(actionDeleteServicesFail(e));
    }
}