import * as accessoriesConstants from '../constants/accessories';

export const actionGetAccessories = (key, page, size) => {
    return {
        type: accessoriesConstants.FETCH_ACCESSORIES,
        payload: {
            key, page, size
        }
    }
}

export const actionGetAccessoriesSuccess = (data) => {
    return {
        type: accessoriesConstants.FETCH_ACCESSORIES_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const actionGetAccessoriesFail = (e) => {
    return {
        type: accessoriesConstants.FETCH_ACCESSORIES_FAIL,
        payload: {
            e
        }
    }
}

/* Sinh */
export const actionUpdateListAccessories = (key, page, size) => {
    return {
        type: accessoriesConstants.UPDATE_LIST_ACCESSORIES,
        payload: {
            key, page, size
        }
    }
}

export const actionUpdateListAccessoriesSuccess = (data) => {
    return {
        type: accessoriesConstants.UPDATE_LIST_ACCESSORIES_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const actionSelectAccessoriesItem = (data) => {
    return {
        type: accessoriesConstants.SELECT_ACCESSORIES_ITEM,
        payload: {
            data: data
        }
    }
}

/* Sinh */