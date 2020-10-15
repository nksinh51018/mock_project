import * as productsConstants from '../constants/products';

export const actionGetProducts = (key, page, size) => {
    return {
        type: productsConstants.FETCH_PRODUCTS,
        payload: {
            key, page, size
        }
    }
}

export const actionGetProductsSuccess = (data) => {
    return {
        type: productsConstants.FETCH_PRODUCTS_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionGetProductsFail = (e) => {
    return {
        type: productsConstants.FETCH_PRODUCTS_FAIL,
        payload: {
            e
        }
    }
}