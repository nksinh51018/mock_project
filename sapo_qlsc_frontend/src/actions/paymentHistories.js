import * as paymentConstants from './../constants/paymentHistories';

export const actGetPaymentHistoriesCustomer = (keyword, page, size, id, filter) => {
    return {
        type: paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER,
        payload: {
            keyword, page, size, id, filter
        }
    }
}

export const actGetPaymentHistoriesCustomerSuccess = (data) => {
    return {
        type: paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER_SUCCESS,
        payload: {
            data
        }
    }
}

export const actGetPaymentHistoriesCustomerFailed = (e) => {
    return {
        type: paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER_FAILED,
        payload:{
            e
        }
    }
}