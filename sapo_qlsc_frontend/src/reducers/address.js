import * as customerConstants from './../constants/address';
import { message } from 'antd';

const initialState = {
    provinces: [],
    wards: [],
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case customerConstants.FETCH_PROVINCES_SUCCESS:
            //console.log(action.payload.data);
            state.provinces = action.payload.data
            return { ...state }
        case customerConstants.FETCH_PROVINCES_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case customerConstants.FETCH_WARD_OF_DISTRICT_SUCCESS:
            state.wards = action.payload.data
            return { ...state }
        case customerConstants.FETCH_WARD_OF_DISTRICT_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        default:
            return { ...state }
    }

}

export default reducer; 