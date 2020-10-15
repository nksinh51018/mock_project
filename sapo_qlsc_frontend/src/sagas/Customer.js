import { call, delay, put } from 'redux-saga/effects';
import { getListCustomer, createCustomer, getCustomerById, updateCustomer, deleteCustomerById, updateMultipleStatusCustomer, filterPayStatusOfCustomer } from './../apis/customer'
import { actCreateCustomerFailed, actCreateCustomerSuccess, actGetListCustomerSuccess, actGetCustomerByIdSuccess, actGetCustomerByIdFailed, actUpdateCustomerSuccess, actUpdateCustomerFailed, actDeleteCustomerSuccess, actDeleteCustomerFailed, actUpdateMultipleStatusCustomerSuccess, actUpdateMultipleStatusCustomerFailed, actFilterPayStatusOfCustomerSuccess } from './../actions/customer'
import { STATUS_CODE } from './../constants/api';
import history from '../history';
import { message } from 'antd';

export function* getCustomerByIdSaga({ payload }) {
    try {
        const res = yield call(getCustomerById, payload.idCustomer);
        //console.log(res.data);
        yield put(actGetCustomerByIdSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        if(e.response.status === 500){
            message.error("Khách hàng không tồn tại!")
            yield history.push(`/admin/customers`)
        }
        yield put(actGetCustomerByIdFailed(e))
    }
}

export function* getCustomerSaga({ payload }) {
    yield delay(100)
    try {
        const res = yield call(getListCustomer, payload.key, payload.page, payload.size, payload.name, payload.order);
        yield put(actGetListCustomerSuccess(res.data))
    }
    catch (e) {

    }
}

export function* createCustomerSaga({ payload }) {
    let data = {
        name: payload.data.txtName,
        code: payload.data.txtcode,
        address: payload.data.txtaddress,
        description: payload.data.txtdescription,
        email: payload.data.txtemail,
        phoneNumber: payload.data.txtphoneNumber,

    }
    if(payload.data.ward !== null){
        data.ward = {
            code : payload.data.ward[0]
        }
    }
    
    try {
        const res = yield call(createCustomer, data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actCreateCustomerSuccess(res.data))
            message.success('Thêm khách hàng thành công');
            yield delay(200)
            history.push(`/admin/customers/${res.data.id}`);
        }
        else {
            yield put(actCreateCustomerFailed(res.data))
        }
    }
    catch (e) {
        console.log(e.response);
        if(e.response.data.message === "Số điện thoại của khách hàng bị trùng"){
            message.error("Số điện thoại khách hàng bị trùng")
            yield put(actCreateCustomerFailed(e))
        }
        else if(e.response.data.message === "Mã của khách hàng bị trùng"){
            message.error("Mã khách hàng bị trùng")
            yield put(actCreateCustomerFailed(e))
        }else{
            message.error("Tạo khách hàng không thành công")
            yield put(actCreateCustomerFailed(e))
        }
    }
}

export function* updateCustomerSaga({ payload }) {
    //console.log(payload);
    let data = {
        name: payload.data.txtName,
        code: payload.data.txtcode,
        description: payload.data.txtdescription,
        email: payload.data.txtemail,
        phoneNumber: payload.data.txtphoneNumber,
        address: payload.data.txtaddress,
    }

    if(payload.data.ward !== null){
        if(payload.data.ward.length === 0){
            data.ward = null
        }else{
            data.ward = {
                code : payload.data.ward[0]
            }
        }
    }

    //console.log(payload.data.ward);
    // if(payload.data.ward && payload.data.ward === null){
    //     console.log('sdfdsfsd');
    // }
    try {
        const res = yield call(updateCustomer, payload.idCustomer, data);
        //console.log(res);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actUpdateCustomerSuccess(res.data))
            //console.log('dfsdf',res.data.address);
            history.push(`/admin/customers/${res.data.id}`);
        }else {
            yield put(actUpdateCustomerFailed(res.data))
        }
    }
    catch (e) {
        console.log(e.response);
        if(e.response.data.message === "Số điện thoại của khách hàng bị trùng"){
            message.error("Số điện thoại khách hàng bị trùng")
            yield put(actCreateCustomerFailed(e))
        }
        else if(e.response.data.message === "Mã của khách hàng bị trùng"){
            message.error("Mã khách hàng bị trùng")
            yield put(actCreateCustomerFailed(e))
        }
        else if(e.response.status === 400){
            message.error("Tên khách hàng quá dài")
            yield put(actCreateCustomerFailed(e))
        }else{
            message.error("Cập nhật khách hàng không thành công")
            yield put(actCreateCustomerFailed(e))
        }
    }
}

export function* deleteCustomerSaga({ payload }) {
    try {
        const res = yield call(deleteCustomerById, payload.idCustomers);
        yield put(actDeleteCustomerSuccess(res.data))
    }
    catch (e) {
        yield put(actDeleteCustomerFailed(e))
    }
}

export function* updateMultipleStatusCustomerSaga({ payload }) {
    try {
        const res = yield call(updateMultipleStatusCustomer, payload.idCustomers);
        yield put(actUpdateMultipleStatusCustomerSuccess(res.data))
        history.push(`/admin/customers`)
    }
    catch (e) {
        yield put(actUpdateMultipleStatusCustomerFailed(e))
    }
}

export function* filterPayStatusOfCustomerSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(filterPayStatusOfCustomer, payload.page, payload.size, payload.pay_status);
        yield put(actFilterPayStatusOfCustomerSuccess(res.data))
    }
    catch (e) {

    }
}
