import { call, delay, put } from "redux-saga/effects";
import { actFetchListMaintenanceCardSuccess, actFetchMaintenanceCardByIdCustomerSuccess } from "../actions/MaintenanceCard";
import {getMaintenanceCard, getMaintenanceCardByIdCustomer} from '../apis/maintenanceCard'

export function* getMaintenanceCardSaga({ payload }) {
    try {
        const res = yield call(getMaintenanceCard, payload.key, payload.page, payload.size, payload.name, payload.order,payload.filter);
        yield put(actFetchListMaintenanceCardSuccess(res.data))
    }
    catch (e) {

    }
}

export function* getMaintenanceCardByCustomerSaga({ payload }) {
    try {
        const res = yield call(getMaintenanceCardByIdCustomer, payload.key, payload.page, payload.size, payload.id, payload.name, payload.order,payload.filter);
        yield put(actFetchMaintenanceCardByIdCustomerSuccess(res.data))
    }
    catch (e) {

    }
}