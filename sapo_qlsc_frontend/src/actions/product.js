import * as productConstants from '../constants/product';

export const actionGetProduct = (id) => {
    return {
        type: productConstants.FETCH_PRODUCT,
        payload: {
            id
        }
    }
}

export const actionGetProductSuccess = (data) => {
    return {
        type: productConstants.FETCH_PRODUCT_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const actionGetProductFail = (e) => {
    return {
        type: productConstants.FETCH_PRODUCT_FAIL,
        payload: {
            e
        }
    }
}