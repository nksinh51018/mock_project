import * as productsConstants from '../constants/products';

export const actionDeleteProducts = (idArray) => {
    return {
        type: productsConstants.DELETE_PRODUCTS,
        payload: { idArray }
    }
}

export const actionDeleteProductsSuccess = (data) => {
    return {
        type: productsConstants.DELETE_PRODUCTS_SUCCESS,
        payload: { data }
    }
}

export const actionDeleteProductsFail = (e) => {
    return {
        type: productsConstants.DELETE_PRODUCTS_FAIL,
        payload: { e }
    }
}