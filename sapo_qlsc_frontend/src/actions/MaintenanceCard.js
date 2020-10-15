import * as MaintenanceCardType from '../constants/maintenanceCard'

export const actFetchListMaintenanceCard = (key, page, size, name, order,filter) => {
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD,
        payload: {
            key, page, size, name, order,filter
        }
    }
}

export const actFetchListMaintenanceCardSuccess = (data) =>{
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD_SUCCESS,
        payload:{
            data
        }
    }
}

export const actFetchListMaintenanceCardFailed = (data) =>{
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD_FAILED,
        payload:{
            data
        }
    }
}

export const actFetchMaintenanceCardByIdCustomer = (key, page, size, id, name, order,filter) => {
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER,
        payload: {
            key, page, size, id, name, order,filter
        }
    }
}

export const actFetchMaintenanceCardByIdCustomerSuccess = (data) => {
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER_SUCCESS,
        payload: {
            data
        }
    }
}

export const actFetchMaintenanceCardByIdCustomerFailed  = (e) => {
    return {
        type: MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER_FAILED,
        payload: {
            e
        }
    }
}