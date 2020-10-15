import * as productConstants from '../constants/product';
import { message } from 'antd';

const initialState = {
    product: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.FETCH_PRODUCT_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case productConstants.FETCH_PRODUCT_FAIL:
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;