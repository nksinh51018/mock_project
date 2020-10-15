import * as serviceConstants from '../constants/service';

export const actionCreateService = (data) => {
    return {
        type: serviceConstants.CREATE_SERVICE,
        payload: {
            data
        }
    }
}

export const actionCreateServiceSuccess = (data) => {
    return {
        type: serviceConstants.CREATE_SERVICE_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionCreateServiceFail = (e) => {
    return {
        type: serviceConstants.CREATE_SERVICE_FAIL,
        payload: {
            e
        }
    }
}