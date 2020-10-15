import * as accessoriesConstants from '../constants/accessories';
import { message } from 'antd';

const initialState = {
    currentPage: 0,
    content: [],
    totalItems: 0,
    totalPages: 0,
    accessoriesItem: {},
    number: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case accessoriesConstants.FETCH_ACCESSORIES_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case accessoriesConstants.FETCH_ACCESSORIES_FAIL:
            message.error("Data can not be fetched");
            return { ...state };
        /* Sinh */
        case accessoriesConstants.UPDATE_LIST_ACCESSORIES_SUCCESS:
            state.number = action.payload.data.number;
            state.totalPages = action.payload.data.totalPages;
            state.content = state.content.concat(action.payload.data.content);
            return { ...state };

        /* Sinh */
        default:
            return { ...state };
    }
}

export default reducer;