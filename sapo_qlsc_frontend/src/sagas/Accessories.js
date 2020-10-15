import { call, delay, put, select } from 'redux-saga/effects';
import { actionGetAccessoriesSuccess } from '../actions/accessories';
// import { actChooseAccessories } from '../actions/maintenanceCardAdd';
import { getListAccessories } from '../apis/accessories';

export function* getAccessoriesSaga({ payload }) {
    try {
        const res = yield call(getListAccessories, payload.key, payload.page, payload.size);
        yield put(actionGetAccessoriesSuccess(res.data))
    }
    catch (e) {

    }
}

