import * as accessoryConstants from '../constants/accessory';

export const actionCreateAccessory = (data) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY,
        payload: {
            data
        }
    }
}

export const actionCreateAccessorySuccess = (data) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionCreateAccessoryFail = (e) => {
    return {
        type: accessoryConstants.CREATE_ACCESSORY_FAIL,
        payload: {
            e
        }
    }
}