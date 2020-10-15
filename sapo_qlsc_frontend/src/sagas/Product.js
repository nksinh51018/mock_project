import { call, put } from "redux-saga/effects";
import { actionGetProductSuccess } from '../actions/product';
import { getProduct } from "../apis/product";

export function* getProductSaga({ payload }) {
    try {
        const res = yield call(getProduct, payload.id);
        yield put(actionGetProductSuccess(res.data));
    }
    catch (e) {

    }
}