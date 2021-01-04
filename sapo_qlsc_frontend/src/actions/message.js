import * as messageConstants from '../constants/message';

export const actGetMessages = (page, size) => {
    return {
        type: messageConstants.FETCH_MESSAGES,
        payload: {
            page, size
        }
    }
}

export const actGetMessagesSuccess = (data) => {
    return {
        type: messageConstants.FETCH_MESSAGES_SUCCESS,
        payload: {
            data: data
        }
    }
}

export const actReadMessages = (id) => {
    return {
        type: messageConstants.READ_MESSAGE,
        payload: {
            id
        }
    }
}