import { call, delay, put, select } from 'redux-saga/effects';
import { actFetchDataSuccess } from '../actions/history';
// import { actChooseAccessories } from '../actions/maintenanceCardAdd';
import { getListProductHistory } from '../apis/history';

export function* getProductHistorySaga({ payload }) {
    try {
        const res = yield call(getListProductHistory, payload.pageNum, payload.pageSize);
        yield put(actFetchDataSuccess(res.data))
    }
    catch (e) {

    }
}

