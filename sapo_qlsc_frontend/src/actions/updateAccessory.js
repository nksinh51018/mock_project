import * as accessoryConstants from '../constants/accessory';

export const actionUpdateAccessory = (id, data) => {
    return {
        type: accessoryConstants.UPDATE_ACCESSORY,
        payload: {
            id, data
        }
    }
}

export const actionUpdateAccessorySuccess = (data) => {
    return {
        type: accessoryConstants.UPDATE_ACCESSORY_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionUpdateAccessoryFail = (e) => {
    return {
        type: accessoryConstants.UPDATE_ACCESSORY_FAIL,
        payload: {
            e
        }
    }
}