import { takeLatest } from 'redux-saga/effects';
import { createCustomerSaga, getCustomerSaga, getCustomerByIdSaga, updateCustomerSaga, deleteCustomerSaga, updateMultipleStatusCustomerSaga, filterPayStatusOfCustomerSaga } from './Customer'
import * as customerConstants from '../constants/customer';
import * as addressConstants from '../constants/address'
import * as MaintenanceCardType from '../constants/maintenanceCard'
import * as MaintenanceCardAddType from '../constants/MaintenanceCardAdd'
import * as servicesConstants from '../constants/services';
import * as serviceConstants from '../constants/service';
import * as accessoriesConstants from '../constants/accessories';
import * as accessoryConstants from '../constants/accessory';
import * as employeeConstants from "../constants/employee";
import * as statisticConstants from "../constants/statistic";
import * as paymentConstants from "../constants/paymentHistories";
import { getMaintenanceCardSaga, getMaintenanceCardByCustomerSaga } from './MaintenanceCard'
import { getProvincesSaga, getWardsOfDistrictSaga } from './Address'
import {
    searchCustomerMaintenanceCardSaga, createCustomerRepairSaga, searchRepairmanSaga, searchProductSaga,
    createMaintenanceCardSaga, updateListCustomerMaintenanceCardSaga, updateListRepairmanMaintenanceCardSaga, updateListProductSaga,
    getMaintenanceCardByIdSaga, updateMaintenanceCardSaga, completeCardSaga, updateStatusDetailSaga, createPaymentHistorySaga, deleteMaintenanceCardSaga,
    createMaintenanceCardWithCustomerSaga,getPlateNumberByCustomerSaga, getHmacsaga, getMaintenanceCardByHmacSaga
} from './MaintenanceCardAdd'

import { fetchEmployeeSaga, deleteEmployeeSaga, getItemByIdSaga, updateEmployeeSaga, insertEmployeeSaga, changePasswordUserSaga, getListMaintanceCardByUserIdSaga } from "./Employee"
import { getAccessoriesSaga } from './Accessories'
import { deleteServicesSaga, getServicesSaga } from './Services';
import * as UserContraint from "../constants/users"
import { createAccessorySaga, deleteAccessorySaga, getAccessorySaga, updateAccessorySaga } from './Accessory';
import { createServiceSaga, deleteServiceSaga, getServiceSaga, updateServiceSaga } from './Service';
import { checkUserSaga, loginSaga } from "./users"
import { getTotalTodaySaga,getTotalMoneySaga,getTopRepairManSaga,getTopServiceSaga } from "./statistic";
import { getPaymentHistoriesSaga } from "./paymentHistories";

import * as productsConstants from '../constants/products';
import * as productConstants from '../constants/product';
import * as messageConstants from '../constants/message';
import * as historyConstants from '../constants/history';
import { deleteProductsSaga, getProductsSaga } from './Products';
import { getProductSaga } from './Product';
import { getListMessages,readMessage } from './Messages';
import { getProductHistorySaga} from './history';

function* rootSaga() {
    yield takeLatest(MaintenanceCardAddType.SEARCH_CUSTOMER, searchCustomerMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_CUSTOMER, updateListCustomerMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_REPAIRMAN, updateListRepairmanMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_CUSTOMER, createCustomerRepairSaga)
    yield takeLatest(MaintenanceCardAddType.SEARCH_REPAIRMAN, searchRepairmanSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_LIST_PRODUCT, updateListProductSaga)
    yield takeLatest(MaintenanceCardAddType.SEARCH_PRODUCT, searchProductSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_MAINTENANCE_CARD, createMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_MAINTENANCE_CARD, updateMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.FETCH_MAINTENANCE_CARD_BY_ID, getMaintenanceCardByIdSaga)
    yield takeLatest(MaintenanceCardAddType.UPDATE_STATUS_DETAIL, updateStatusDetailSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_PAYMENT_HISTORY, createPaymentHistorySaga)
    yield takeLatest(MaintenanceCardAddType.DELETE_MAINTENANCE_CARD, deleteMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardAddType.CREATE_MAINTENANCE_CARD_WITH_CUSTOMER, createMaintenanceCardWithCustomerSaga)
    yield takeLatest(MaintenanceCardAddType.COMPLETE_CARD, completeCardSaga)
    yield takeLatest(MaintenanceCardAddType.GET_PLATE_NUMBER_BY_CUSTOMER, getPlateNumberByCustomerSaga)
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD, getMaintenanceCardSaga)
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD, getMaintenanceCardSaga)
    yield takeLatest(customerConstants.FETCH_CUSTOMER, getCustomerSaga);
    yield takeLatest(customerConstants.CREATE_CUSTOMER, createCustomerSaga);
    yield takeLatest(accessoriesConstants.FETCH_ACCESSORIES, getAccessoriesSaga);
    yield takeLatest(accessoryConstants.FETCH_ACCESSORY, getAccessorySaga);
    yield takeLatest(accessoryConstants.CREATE_ACCESSORY, createAccessorySaga);
    yield takeLatest(accessoryConstants.UPDATE_ACCESSORY, updateAccessorySaga);
    yield takeLatest(accessoryConstants.DELETE_ACCESSORY, deleteAccessorySaga);
    yield takeLatest(servicesConstants.FETCH_SERVICES, getServicesSaga);
    yield takeLatest(servicesConstants.DELETE_SERVICES, deleteServicesSaga);
    yield takeLatest(serviceConstants.FETCH_SERVICE, getServiceSaga);
    yield takeLatest(serviceConstants.CREATE_SERVICE, createServiceSaga);
    yield takeLatest(serviceConstants.UPDATE_SERVICE, updateServiceSaga);
    yield takeLatest(serviceConstants.DELETE_SERVICE, deleteServiceSaga);
    yield takeLatest(customerConstants.FETCH_CUSTOMER_BY_ID, getCustomerByIdSaga);
    yield takeLatest(addressConstants.FETCH_PROVINCES, getProvincesSaga);
    yield takeLatest(addressConstants.FETCH_WARD_OF_DISTRICT, getWardsOfDistrictSaga);
    yield takeLatest(customerConstants.DELETE_CUSTOMER, deleteCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER, updateMultipleStatusCustomerSaga)
    yield takeLatest(customerConstants.UPDATE_CUSTOMER, updateCustomerSaga);
    yield takeLatest(employeeConstants.FETCH_EMPLOYEE, fetchEmployeeSaga);
    yield takeLatest(employeeConstants.DELETE_EMPLOYEE, deleteEmployeeSaga);
    yield takeLatest(MaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER, getMaintenanceCardByCustomerSaga)
    yield takeLatest(customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS, filterPayStatusOfCustomerSaga)
    yield takeLatest(employeeConstants.CREATE_EMPLOYEE, insertEmployeeSaga);
    yield takeLatest(employeeConstants.CHANGE_PASSWORD_USER, changePasswordUserSaga);
    yield takeLatest(employeeConstants.GET_MAINTENANCECARD_BY_USER_ID, getListMaintanceCardByUserIdSaga)
    yield takeLatest(UserContraint.LOGIN, loginSaga);
    yield takeLatest(statisticConstants.FETCH_TOTAL_TODAY, getTotalTodaySaga);
  //  yield takeLatest(UserContraint.CHECK_USER, checkUserSaga);
    yield takeLatest(statisticConstants.FETCH_TOTAL_MONEY, getTotalMoneySaga);
    yield takeLatest(employeeConstants.GET_ITEM_EMPLOYEE, getItemByIdSaga);
    yield takeLatest(employeeConstants.UPDATE_EMPLOYEE, updateEmployeeSaga);
    yield takeLatest(statisticConstants.FETCH_TOP_REPAIRMAN, getTopRepairManSaga);
    yield takeLatest(statisticConstants.FETCH_TOP_SERVICE, getTopServiceSaga);
    yield takeLatest(productsConstants.FETCH_PRODUCTS, getProductsSaga);
    yield takeLatest(paymentConstants.FETCH_PAYMENT_HISTORIES_BY_IDCUSTOMER, getPaymentHistoriesSaga);
    yield takeLatest(productsConstants.DELETE_PRODUCTS, deleteProductsSaga);
    yield takeLatest(productConstants.FETCH_PRODUCT, getProductSaga);
    yield takeLatest(messageConstants.FETCH_MESSAGES, getListMessages);
    yield takeLatest(messageConstants.READ_MESSAGE, readMessage);
    yield takeLatest(historyConstants.FETCH_PRODUCT_HISTORY, getProductHistorySaga);
    yield takeLatest(MaintenanceCardAddType.GET_HMAC, getHmacsaga);
    yield takeLatest(MaintenanceCardAddType.GET_MAINTENANCE_CARD_BY_HMAC, getMaintenanceCardByHmacSaga);
}

export default rootSaga;