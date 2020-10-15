import { call, put } from 'redux-saga/effects';
import { getPaymentHistoriesByIdCustomer} from './../apis/paymentHistories';
import { actGetPaymentHistoriesCustomerSuccess, actGetPaymentHistoriesCustomerFailed} from './../actions/paymentHistories';

export function* getPaymentHistoriesSaga({ payload }) {

    try {
        const res = yield call(getPaymentHistoriesByIdCustomer, payload.keyword, payload.page, payload.size, payload.id, payload.filter);
        yield put(actGetPaymentHistoriesCustomerSuccess(res.data))
    }
    catch (e) {
        yield(put(actGetPaymentHistoriesCustomerFailed(e)))
    }
}



