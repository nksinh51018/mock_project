import * as productsConstants from '../constants/products';
import { message } from 'antd';

const initialState = {
    currentPage: 0,
    content: [],
    totalElements: 0,
    totalPages: 0,
    productItem: {},
    number: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case productsConstants.FETCH_PRODUCTS_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case productsConstants.FETCH_PRODUCTS_FAIL:
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;