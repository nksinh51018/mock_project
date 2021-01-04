import * as historyConstants from '../constants/history';
import { message } from 'antd';

const initialState = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    number: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case historyConstants.FETCH_PRODUCT_HISTORY_SUCCESS:
            state = action.payload.data;
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;