import * as serviceConstants from '../constants/service';

export const actionGetService = (id) => {
    return {
        type: serviceConstants.FETCH_SERVICE,
        payload: { id }
    }
}

export const actionGetServiceSuccess = (data) => {
    return {
        type: serviceConstants.FETCH_SERVICE_SUCCESS,
        payload: { data }
    }
}

export const actionGetServiceFail = (e) => {
    return {
        type: serviceConstants.FETCH_SERVICE_FAIL,
        payload: { e }
    }
}