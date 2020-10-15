import * as servicesConstants from '../constants/services';

export const actionGetServices = (key, page, size) => {
    return {
        type: servicesConstants.FETCH_SERVICES,
        payload: { key, page, size }
    }
}

export const actionGetServicesSuccess = (data) => {
    return {
        type: servicesConstants.FETCH_SERVICES_SUCCESS,
        payload: { data: data }
    }
}

export const actionGetServicesFail = (e) => {
    return {
        type: servicesConstants.FETCH_SERVICES_FAIL,
        payload: { e }
    }
}