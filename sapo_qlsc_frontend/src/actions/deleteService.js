import * as serviceConstants from '../constants/service';

export const actionDeleteService = (id) => {
    return {
        type: serviceConstants.DELETE_SERVICE,
        payload: { id }
    }
}

export const actionDeleteServiceSuccess = (data) => {
    return {
        type: serviceConstants.DELETE_SERVICE_SUCCESS,
        payload: { data }
    }
}

export const actionDeleteServiceFail = (e) => {
    return {
        type: serviceConstants.DELETE_SERVICE_FAIL,
        payload: { e }
    }
}