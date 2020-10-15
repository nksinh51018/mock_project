import { message } from "antd";
import { call, put } from "redux-saga/effects";
import { actionGetAccessories } from "../actions/accessories";
import { actionCreateServiceFail, actionCreateServiceSuccess } from "../actions/createService";
import { actionDeleteServiceFail, actionDeleteServiceSuccess } from "../actions/deleteService";
import { actionGetServiceFail, actionGetServiceSuccess } from "../actions/service";
import { actionUpdateServiceFail, actionUpdateServiceSuccess } from "../actions/updateService";
import { createService, deleteService, getService, updateService } from "../apis/service";
import { STATUS_CODE } from "../constants/api";
import history from '../history';

export function* getServiceSaga({ payload }) {
    try {
        const res = yield call(getService, payload.id);
        yield put(actionGetServiceSuccess(res.data));
    }
    catch (e) {
        yield put(actionGetServiceFail(e));
    }
}

export function* createServiceSaga({ payload }) {
    try {
        const res = yield call(createService, payload.data);
        if (res.status === STATUS_CODE.CREATED) {
            yield put(actionCreateServiceSuccess(res.data));
            history.push('/admin/products');
        }
        else {
            yield put(actionCreateServiceFail(res.data));
        }
    }
    catch (e) {
        yield put(actionCreateServiceFail(e.response.data.message));
    }
}

export function* updateServiceSaga({ payload }) {
    try {
        const res = yield call(updateService, payload.id, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actionUpdateServiceSuccess(res.data));
            history.push('/admin/products');
        }
        else {
            yield put(actionUpdateServiceFail(res.data));
        }
    }
    catch (e) {
        yield put(actionUpdateServiceFail(e.response.data.message));
    }
}

export function* deleteServiceSaga({ payload }) {
    try {
        const res = yield call(deleteService, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Đã xóa dịch vụ");
            yield put(actionGetAccessories(res.data));
        }
        else {
            yield put(actionDeleteServiceFail(res.data));
        }
    }
    catch (e) {
        yield put(actionDeleteServiceFail(e));
    }
}