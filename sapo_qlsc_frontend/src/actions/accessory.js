import * as accessoryConstants from '../constants/accessory';

export const actionGetAccessory = (id) => {
    return {
        type: accessoryConstants.FETCH_ACCESSORY,
        payload: {
            id
        }
    }
}

export const actionGetAccessorySuccess = (data) => {
    return {
        type: accessoryConstants.FETCH_ACCESSORY_SUCCESS,
        payload: {
            data
        }
    }
}

export const actionGetAccessoryFail = (e) => {
    return {
        type: accessoryConstants.FETCH_ACCESSORY_FAIL,
        payload: {
            e
        }
    }
}
