import { call, delay, put } from 'redux-saga/effects';
import { getTotalToday, getTotalMoney, getTopRepairMan, getTopService } from './../apis/statistic';
import { actGetTopServiceSuccess, actGetTopServiceFailed, actGetTopRepairmanSuccess, actGetTopRepairmanFailed, actGetTotalTodaySuccess, actGetTotalTodayFailed, actGetTotalMoneySuccess, actGetTotalMoneyFailed} from './../actions/statistic';

export function* getTotalTodaySaga({ payload }) {
    try {
        const res = yield call(getTotalToday, payload.startDate, payload.endDate);
        yield put(actGetTotalTodaySuccess(res.data))
    }
    catch (e) {
        yield(put(actGetTotalTodayFailed(e)))
    }
}

export function* getTotalMoneySaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(getTotalMoney, payload.startDate, payload.endDate);
        yield put(actGetTotalMoneySuccess(res.data))
    }
    catch (e) {
        yield(put(actGetTotalMoneyFailed(e)))
    }
}

export function* getTopRepairManSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(getTopRepairMan, payload.startDate, payload.endDate);
        yield put(actGetTopRepairmanSuccess(res.data))
    }
    catch (e) {
        yield(put(actGetTopRepairmanFailed(e)))
    }
}

export function* getTopServiceSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(getTopService, payload.startDate, payload.endDate);
        yield put(actGetTopServiceSuccess(res.data))
    }
    catch (e) {
        yield(put(actGetTopServiceFailed(e)))
    }
}