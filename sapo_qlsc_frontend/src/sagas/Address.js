import { call, put } from 'redux-saga/effects'
import { getListProvinces, getWardsOfProvinces } from './../apis/address'
import { actGetListProvincesSuccess, actGetListProvincesFailed, actGetWardOfDistrictSuccess, actGetWardOfDistrictFailed } from './../actions/address'

export function* getProvincesSaga({ payload }) {
    try {
        const res = yield call(getListProvinces);
        yield put(actGetListProvincesSuccess(res.data))
    }
    catch (e) {
        yield put(actGetListProvincesFailed(e))
    }
}

export function* getWardsOfDistrictSaga({ payload }) {
    try {
        const res = yield call(getWardsOfProvinces, payload.code);
        yield put(actGetWardOfDistrictSuccess(res.data))
    }
    catch (e) {
        yield put(actGetWardOfDistrictFailed(e))
    }
}



