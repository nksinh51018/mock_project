import { call, put } from "redux-saga/effects";
import { actionGetAccessoryFail, actionGetAccessorySuccess } from "../actions/accessory";
import { actionCreateAccessoryFail, actionCreateAccessorySuccess } from "../actions/createAccessory";
import { actionUpdateAccessoryFail, actionUpdateAccessorySuccess } from "../actions/updateAccessory";
import { actionDeleteAccessoryFail, actionDeleteAccessorySuccess } from "../actions/deleteAccessory";
import { createAccessory, deleteAccessory, getAccessory, updateAccessory } from "../apis/accessory";
import { STATUS_CODE } from "../constants/api";
import { actionGetAccessories } from '../actions/accessories';
import { message } from "antd";
import history from "../history"
export function* getAccessorySaga({ payload }) {
    try {
        const res = yield call(getAccessory, payload.id);
        yield put(actionGetAccessorySuccess(res.data));
    }
    catch (e) {
        yield put(actionGetAccessoryFail(e));
    }
}

export function* createAccessorySaga({ payload }) {
    try {
        const res = yield call(createAccessory, payload.data);
        console.log(payload);
        if (res.status === STATUS_CODE.CREATED) {
            yield put(actionCreateAccessorySuccess(res.data));
            history.push("/admin/products");
        }
        else {
            yield put(actionCreateAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionCreateAccessoryFail(e.response.data.message));
    }
}

export function* updateAccessorySaga({ payload }) {
    try {
        const res = yield call(updateAccessory, payload.id, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actionUpdateAccessorySuccess(res.data));
            history.push("/admin/products");
        }
        else {
            yield put(actionUpdateAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionUpdateAccessoryFail(e.response.data.message));
    }
}

export function* deleteAccessorySaga({ payload }) {
    try {
        const res = yield call(deleteAccessory, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Linh kiện đã được xóa");
            yield put(actionGetAccessories("", 1, 5));
        }
        else {
            yield put(actionDeleteAccessoryFail(res.data));
        }
    }
    catch (e) {
        yield put(actionDeleteAccessoryFail(e));
    }
}