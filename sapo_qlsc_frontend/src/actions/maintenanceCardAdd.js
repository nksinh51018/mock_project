import * as MaintenanceCardAddType from '../constants/MaintenanceCardAdd'

export const actSearchCustomer = (key,page,size) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_CUSTOMER,
        payload: {
            key,page,size
        }
    }
}

export const actUpdateListCustomer = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_CUSTOMER,
        payload: {
            data
        }
    }
}

export const actWarrantyProduct = (data) =>{
    return {
        type: MaintenanceCardAddType.WARRANTY_PRODUCT,
        payload: {
            data
        }
    }
}


export const actUpdateListCustomerSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_CUSTOMER_SUCCESS,
        payload: {
            data
        }
    }
}

export const actUpdateListRepairman = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_REPAIRMAN,
        payload: {
            data
        }
    }
}


export const actUpdateListRepairmanSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_SEARCH_REPAIRMAN_SUCCESS,
        payload: {
            data
        }
    }
}

export const actUpdateListProduct = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_PRODUCT,
        payload: {
            data
        }
    }
}

export const actUpdateListProductSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_LIST_PRODUCT_SUCCESS,
        payload: {
            data
        }
    }
}

export const actSearchCustomerSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_CUSTOMER_SUCCESS,
        payload:{
            data
        }
    }
}

export const actSearchCustomerFailed = (e) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actChooseCustomer = (data) =>{
    return {
        type: MaintenanceCardAddType.CHOOSE_CUSTOMER,
        payload:{
            data
        }
    }
}


export const actCreateCustomer = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_CUSTOMER,
        payload: {
            data
        }
    }
}

export const actCreateCustomerSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_CUSTOMER_SUCCESS,
        payload:{
            data
        }
    }
}

export const actCreateCustomerFailed = (e) =>{
    return {
        type: MaintenanceCardAddType.CREATE_CUSTOMER_FAILED,
        payload:{
            e
        }
    }
}

export const actClearCustomer = () =>{
    return {
        type: MaintenanceCardAddType.CLEAR_CUSTOMER,
    }
}

export const actUpdateMaintenanceCardInfo = (name,value) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD_INFO,
        payload:{
            name,
            value,
        }
    }
}

export const actSearchRepairman = (key,page,size) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_REPAIRMAN,
        payload:{
            key,page,size
        }
    }
}

export const actSearchRepairmanSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_REPAIRMAN_SUCCESS,
        payload:{
            data
        }
    }
}

export const actChooseRepairman = (data) =>{
    return {
        type: MaintenanceCardAddType.CHOOSE_REPAIRMAN,
        payload:{
            data
        }
    }
}

export const actClearRepairman = () =>{
    return {
        type: MaintenanceCardAddType.CLEAR_REPAIRMAN,
    }
}
export const actSearchProduct = (key,page,size) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_PRODUCT,
        payload: {
            key,page,size
        }
    }
}

export const actSearchProductSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_PRODUCT_SUCCESS,
        payload:{
            data
        }
    }
}

export const actSearchProductFailed = (e) =>{
    return {
        type: MaintenanceCardAddType.SEARCH_PRODUCT_FAILED,
        payload:{
            e
        }
    }
}
export const actChooseProduct = (data) =>{
    return {
        type: MaintenanceCardAddType.CHOOSE_PRODUCT,
        payload:{
            data
        }
    }
}

export const actRemoveProduct = (data) =>{
    return {
        type: MaintenanceCardAddType.REMOVE_PRODUCT,
        payload:{
            data
        }
    }
}

export const actCreateMaintenanceCard = (data,check) =>{
    return {
        type: MaintenanceCardAddType.CREATE_MAINTENANCE_CARD,
        payload:{
            data,check
        }
    }
}
export const actCreateMaintenanceCardSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_MAINTENANCE_CARD_SUCCESS,
        payload: {
            data
        }
    }
}
export const actCreateMaintenanceCardFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.CREATE_MAINTENANCE_CARD_FAILED,
        payload:{
            message
        }
    }
}


export const actUpdateMaintenanceCard = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD,
        payload:{
            data
        }
    }
}
export const actUpdateMaintenanceCardSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD_SUCCESS,
        payload: {
            data
        }
    }
}
export const actUpdateMaintenanceCardFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD_FAILED,
        payload:{
            message
        }
    }
}

export const actError = (data,values) =>{
    return {
        type: MaintenanceCardAddType.ERROR,
        payload:{
            data,values
        }
    }
}
export const actFetchMaintenanceCardById = (id) =>{
    return {
        type: MaintenanceCardAddType.FETCH_MAINTENANCE_CARD_BY_ID,
        payload:{
            id
        }
    }
}

export const actFetchMaintenanceCardByIdSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.FETCH_MAINTENANCE_CARD_BY_ID_SUCCESS,
        payload:{
            data
        }
    }
}

export const actFetchMaintenanceCardByIdFailed = () =>{
    return {
        type: MaintenanceCardAddType.FETCH_MAINTENANCE_CARD_BY_ID_FAILED,
    }
}

export const actResetStore = () =>{
    return {
        type: MaintenanceCardAddType.RESET_STORE,
    }
}


export const actChangeAmount = (id,value) =>{
    return {
        type: MaintenanceCardAddType.CHANGE_AMOUNT,
        payload:{
            id,value
        }
    }
}

export const actCompleteCard = (data) =>{
    return {
        type: MaintenanceCardAddType.COMPLETE_CARD,
        payload:{
            data,
        }
    }
}

export const actCompleteCardSuccess = () =>{
    return {
        type: MaintenanceCardAddType.COMPLETE_CARD_SUCCESS,
    }
}

export const actCompleteCardFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.COMPLETE_CARD_FAILED,
        payload:{
            message,
        }
    }
}


export const actUpdateStatusDetail = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_STATUS_DETAIL,
        payload:{
            data,
        }
    }
}

export const actUpdateStatusDetailSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_STATUS_DETAIL_SUCCESS,
        payload:{
            data,
        }
    }
}

export const actUpdateStatusDetailFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.UPDATE_STATUS_DETAIL_FAILED,
        payload:{
            message,
        }
    }
}

export const actCreatePaymentHistory = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_PAYMENT_HISTORY,
        payload:{
            data,
        }
    }
}

export const actCreatePaymentHistorySuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_PAYMENT_HISTORY_SUCCESS,
        payload:{
            data,
        }
    }
}

export const actCreatePaymentHistoryFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.CREATE_PAYMENT_HISTORY_FAILED,
        payload:{
            message,
        }
    }
}


export const actDeleteMaintenanceCard = (data) =>{
    return {
        type: MaintenanceCardAddType.DELETE_MAINTENANCE_CARD,
        payload:{
            data,
        }
    }
}

export const actDeleteMaintenanceCardSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_PAYMENT_HISTORY_SUCCESS,
        payload:{
            data,
        }
    }
}

export const actDeleteMaintenanceCardFailed = (message) =>{
    return {
        type: MaintenanceCardAddType.CREATE_PAYMENT_HISTORY_FAILED,
        payload:{
            message,
        }
    }
}


export const actCreateMaintenanceCardWithCustomer = (data) =>{
    return {
        type: MaintenanceCardAddType.CREATE_MAINTENANCE_CARD_WITH_CUSTOMER,
        payload:{
            data,
        }
    }
}

export const actGetPlateNumberByCustomer = () =>{
    return {
        type: MaintenanceCardAddType.GET_PLATE_NUMBER_BY_CUSTOMER,
    }
}

export const actGetPlateNumberByCustemerSuccess = (data) =>{
    return {
        type: MaintenanceCardAddType.GET_PLATE_NUMBER_BY_CUSTOMER_SUCCESS,
        payload:{
            data,
        }
    }
}