import * as servicesConstants from '../constants/services';

export const actionDeleteServices = (idArray) => {
    return {
        type: servicesConstants.DELETE_SERVICES,
        payload: { idArray }
    }
}

export const actionDeleteServicesSuccess = (data) => {
    return {
        type: servicesConstants.DELETE_SERVICES_SUCCESS,
        payload: { data }
    }
}

export const actionDeleteServicesFail = (e) => {
    return {
        type: servicesConstants.DELETE_SERVICES_FAIL,
        payload: { e }
    }
}