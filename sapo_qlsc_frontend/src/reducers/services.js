import * as servicesConstants from '../constants/services';
import { message } from 'antd';

const initialState = {
    currentPage: 0,
    content: [],
    totalItems: 0,
    totalPages: 0,
    servicesItem: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case servicesConstants.FETCH_SERVICES_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case servicesConstants.FETCH_SERVICES_FAIL:
            message.error("Data can not be fetched");
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;