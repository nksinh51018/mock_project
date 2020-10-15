import * as accessoryConstants from '../constants/accessory';

export const actionDeleteAccessory = (id) => {
    return {
        type: accessoryConstants.DELETE_ACCESSORY,
        payload: { id }
    };
}

export const actionDeleteAccessorySuccess = (data) => {
    return {
        type: accessoryConstants.DELETE_ACCESSORY_SUCCESS,
        payload: { data }
    };
}

export const actionDeleteAccessoryFail = (e) => {
    return {
        type: accessoryConstants.DELETE_ACCESSORY_FAIL,
        payload: { e }
    };
}