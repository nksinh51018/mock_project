import * as customerConstants from './../constants/address';

export const actGetListProvinces = () => {
    return {
        type: customerConstants.FETCH_PROVINCES
    }
}

export const actGetListProvincesSuccess = (data) => {
    return {
        type: customerConstants.FETCH_PROVINCES_SUCCESS,
        payload: {
            data
        }
    }
}

export const actGetListProvincesFailed = (e) => {
    return {
        type: customerConstants.FETCH_PROVINCES_FAILED,
        payload: {
            e
        }
    }
}

export const actGetWardOfDistrict = (code) => {
    return {
        type: customerConstants.FETCH_WARD_OF_DISTRICT,
        payload: {
            code
        }
    }
}

export const actGetWardOfDistrictSuccess = (data) => {
    return {
        type: customerConstants.FETCH_WARD_OF_DISTRICT_SUCCESS,
        payload: {
            data
        }
    }
}

export const actGetWardOfDistrictFailed = (e) => {
    return {
        type: customerConstants.FETCH_WARD_OF_DISTRICT_FAILED,
        payload: {
            e
        }
    }
}
