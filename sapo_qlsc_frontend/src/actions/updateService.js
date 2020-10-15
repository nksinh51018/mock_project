import * as serviceConstants from '../constants/service';

export const actionUpdateService = (id, data) => {
    return {
        type: serviceConstants.UPDATE_SERVICE,
        payload: { id, data }
    }
}
export const actionUpdateServiceSuccess = (data) => {
    return {
        type: serviceConstants.UPDATE_SERVICE_SUCCESS,
        payload: { data }
    }
}

export const actionUpdateServiceFail = (e) => {
    return {
        type: serviceConstants.UPDATE_SERVICE_FAIL,
        payload: { e }
    }
}