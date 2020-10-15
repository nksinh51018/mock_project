import * as paymentConstants from './../constants/paymentHistories';

const initialState = {
    currentPage: 0,
    paymentHistories: [],
    totalItems: 0,
    totalPages: 0
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER_SUCCESS:
            state = action.payload.data;
            state.paymentHistories = action.payload.data.paymentHistories;
            return { ...state }
        case paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        default:
            return { ...state }
    }

}

export default reducer; 