import * as messageConstants from '../constants/message';

const initialState = {
    currentPage: 0,
    messages: [],
    totalItems: 0,
    totalPages: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case messageConstants.FETCH_MESSAGES_SUCCESS:
            state = action.payload.data;
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;