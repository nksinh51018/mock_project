import { call, delay, put, select } from 'redux-saga/effects';
import { actGetMessagesSuccess } from '../actions/message';
import { getMessages,readMessages } from '../apis/message';

export function* getListMessages({ payload }) {
    try {
        const res = yield call(getMessages,payload.page, payload.size);
        yield put(actGetMessagesSuccess(res.data))
    }
    catch (e) {

    }
}

export function* readMessage({ payload }) {
    try {
        const res = yield call(readMessages,payload.id);
        const res1 = yield call(getMessages,1, 5);
        yield put(actGetMessagesSuccess(res1.data))
    }
    catch (e) {

    }
}

