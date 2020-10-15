import * as customerConstants from './../constants/customer';

export const actGetCustomerById = (idCustomer) => {
    return {
        type: customerConstants.FETCH_CUSTOMER_BY_ID,
        payload: {
           idCustomer
        }
    }

}

export const actGetCustomerByIdSuccess = (data) => {
    return {
        type: customerConstants.FETCH_CUSTOMER_BY_ID_SUCCESS,
        payload: {
           data
        }
    }
}

export const actGetCustomerByIdFailed = (e) => {
    return {
        type: customerConstants.FETCH_CUSTOMER_BY_ID_FAILED,
        payload: {
           e
        }
    }
}

export const actGetListCustomer = (key, page, size, name, order) => {
    return {
        type: customerConstants.FETCH_CUSTOMER,
        payload: {
            key, page, size, name, order
        }
    }
}

export const actGetListCustomerSuccess = (data) => {
    return {
        type: customerConstants.FETCH_CUSTOMER_SUCCESS,
        payload: {
            data
        }
    }
}

export const actGetListCustomerFailed = (e) => {
    return {
        type: customerConstants.FETCH_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actSearchCustomer = (key, page, size) =>{
    return {
        type: customerConstants.SEARCH_CUSTOMER,
        payload: {
            key,
            page,
            size
        }
    }
}

export const actSearchCustomerSuccess = (data) =>{
    return {
        type: customerConstants.SEARCH_CUSTOMER_SUCCESS,
        payload:{
            data
        }
    }
}

export const actSearchCustomerFailed = (e) =>{
    return {
        type: customerConstants.SEARCH_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actChooseCustomer = (data) =>{
    return {
        type: customerConstants.CHOOSE_CUSTOMER,
        payload:{
            data
        }
    }
}

export const actCreateCustomer = (data) =>{
    return {
        type: customerConstants.CREATE_CUSTOMER,
        payload: {
            data
        }
    }
}

export const actCreateCustomerSuccess = (data) =>{
    return {
        type: customerConstants.CREATE_CUSTOMER_SUCCESS,
        payload:{
            data
        }
    }
}

export const actCreateCustomerFailed = (e) =>{
    return {
        type: customerConstants.CREATE_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actClearCustomer = () =>{
    return {
        type: customerConstants.CLEAR_CUSTOMER,
    }
}

export const actUpdateCustomer = (idCustomer, data) =>{
    return {
        type: customerConstants.UPDATE_CUSTOMER,
        payload:{
            idCustomer,
            data         
        }
    }
}

export const actUpdateCustomerSuccess = (data) =>{
    return {
        type: customerConstants.UPDATE_CUSTOMER_SUCCESS,
        payload:{
            data
        }
    }
}

export const actUpdateCustomerFailed = (e) =>{
    return {
        type: customerConstants.UPDATE_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actDeleteCustomer = (idCustomers) =>{
    return {
        type: customerConstants.DELETE_CUSTOMER,
        payload:{
            idCustomers,     
        }
    }
}

export const actDeleteCustomerSuccess = (data) => {
    return {
        type: customerConstants.DELETE_CUSTOMER_SUCCESS,
        payload: {
           data
        }
    }
}

export const actDeleteCustomerFailed = (e) => {
    return {
        type: customerConstants.DELETE_CUSTOMER_FAILED,
        payload: {
           e
        }
    }
}

export const actUpdateMultipleStatusCustomer = (idCustomers) => {
    return {
        type: customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER,
        payload: {
            idCustomers   
        }
    }
}

export const actUpdateMultipleStatusCustomerSuccess = (data) => {
    return {
        type: customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER_SUCCESS,
        payload: {
            data
        }
    }
}

export const actUpdateMultipleStatusCustomerFailed = (e) => {
    return {
        type: customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER_FAILED,
        payload: {
            e
        }
    }
}

export const actFilterPayStatusOfCustomer = (page, size, pay_status) =>{
    return {
        type: customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS,
        payload: {
            page,
            size,
            pay_status
        }
    }
}

export const actFilterPayStatusOfCustomerSuccess = (data) =>{
    return {
        type: customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS_SUCCESS,
        payload: {
            data
        }
    }
}

export const actFilterPayStatusOfCustomerFailed = (e) =>{
    return {
        type: customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS_FAILED,
        payload: {
            e
        }
    }
}