import { call, delay, put, select } from 'redux-saga/effects'
import {
    searchCustomer, createCustomer, searchRepairman, searchProduct, createMaintenanceCard, fetchMaintenanceCardById,
    updateMaintenanceCard, completeCard, updateStatusDetail, createPaymentHistory, deleteMaintenanceCard, getPlateNumberByCustomer
} from '../apis/maintenanceCardAdd'
import {
    actCreateCustomerFailed, actCreateCustomerSuccess, actSearchCustomerSuccess,
    actSearchRepairmanSuccess, actSearchProductSuccess, actError,
    actCreateMaintenanceCardSuccess, actCreateMaintenanceCardFailed, actUpdateListCustomerSuccess, actUpdateListRepairmanSuccess,
    actFetchMaintenanceCardByIdSuccess, actUpdateListProductSuccess, actUpdateMaintenanceCardSuccess, actUpdateMaintenanceCardFailed, actCompleteCardSuccess,
    actUpdateStatusDetailSuccess, actUpdateStatusDetailFailed, actCreatePaymentHistorySuccess, actFetchMaintenanceCardByIdFailed,
    actFetchMaintenanceCardById,
    actGetPlateNumberByCustemerSuccess
} from '../actions/maintenanceCardAdd'
import { STATUS_CODE } from '../constants/api';
import history from '../history'
import { message } from 'antd';
export function* searchCustomerMaintenanceCardSaga({ payload }) {
    yield delay(500)
    try {
        const res = yield call(searchCustomer, payload.key, payload.page, payload.size);
        yield put(actSearchCustomerSuccess(res.data))
    }
    catch (e) {

    }
}

export function* updateListCustomerMaintenanceCardSaga({ payload }) {
    yield delay(500)
    try {
        const page = yield select(state => state.maintenanceCardAdd.customerPage)
        const res = yield call(searchCustomer, payload.data, page + 1, 5);
        yield put(actUpdateListCustomerSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* updateListRepairmanMaintenanceCardSaga({ payload }) {

    try {
        const page = yield select(state => state.maintenanceCardAdd.repairmanPage)
        console.log(payload);
        const res = yield call(searchRepairman, payload.data, page + 1, 7);
        yield put(actUpdateListRepairmanSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* createCustomerRepairSaga({ payload }) {
    try {
        const res = yield call(createCustomer, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actCreateCustomerSuccess(res.data))
        }
        // else {
        //     yield put(actCreateCustomerFailed(res.data))
        // }
    }
    catch (e) {
        if(e.response.data.message === "Số điện thoại của khách hàng bị trùng"){
            message.error("Số điện thoại khách hàng bị trùng")
        
        }
        else if(e.response.data.message === "Mã của khách hàng bị trùng"){
            message.error("Mã khách hàng bị trùng")

        }
        else if(e.response.status === 400){
            message.error("Tên khách hàng quá dài")
        
        }else{
            message.error("Thêm mới khách hàng không thành công")
        }
    }

}

export function* searchRepairmanSaga({ payload }) {
    try {
        const res = yield call(searchRepairman, payload.key, 1, 7);
        yield put(actSearchRepairmanSuccess(res.data))
    }
    catch (e) {

    }
}


export function* searchProductSaga({ payload }) {

    try {
        const res = yield call(searchProduct, payload.key, payload.page-1, payload.size);
        console.log(res);
        yield put(actSearchProductSuccess(res.data))
    }
    catch (e) {

    }
}

export function* updateListProductSaga({ payload }) {
    yield delay(500)
    try {
        const page = yield select(state => state.maintenanceCardAdd.productPage)
        const res = yield call(searchProduct, payload.data, page , 5);
        console.log(res);
        yield put(actUpdateListProductSuccess(res.data))
    }
    catch (e) {
        console.log(e);
    }
}

export function* createMaintenanceCardSaga({ payload }) {
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    const user = yield select(state => state.userReducer);
    let data;
    let error = [];
    if (createMaintenanceCard1.customerItem.id === undefined) {
        error.push('customerError')
    }
    if (error.length === 0 && payload.check) {
        data = {
            platesNumber: payload.data.txtPlatesNumber,
            customerId: createMaintenanceCard1.customerItem.id,
            customerName: createMaintenanceCard1.customerItem.name,
            customerPhone: createMaintenanceCard1.customerItem.phoneNumber,
            coordinatorId: user.id,
            coordinatorName: user.fullName,
            coordinatorEmail: user.email,
            maintenanceCardDetails: [],
        }
        if (payload.data.txtCode !== undefined) {
            data.code = payload.data.txtCode
        }
        if (payload.data.txtModel !== undefined) {
            data.model = payload.data.txtModel
        }
        if (payload.data.txtColor !== undefined) {
            data.color = payload.data.txtColor
        }
        if (createMaintenanceCard1.repairman !== undefined &&createMaintenanceCard1.repairman !== null && createMaintenanceCard1.repairman.id !== undefined &&createMaintenanceCard1.repairman.id !== null) {
            data.repairmanId = createMaintenanceCard1.repairman.id;
            data.repairmanName = createMaintenanceCard1.repairman.fullName;
            data.repairmanEmail = createMaintenanceCard1.repairman.email
        }
        if (payload.data.txtDescription !== undefined) {
            data.description = payload.data.txtDescription
        }
        if (payload.data.txtReturnDate !== undefined) {
            data.returnDate = payload.data.txtReturnDate
        }
        for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
            let maintenanceCardDetail = {
                productId: createMaintenanceCard1.products[i].id
            }
            if (createMaintenanceCard1.products[i].warranty === 1) {
                maintenanceCardDetail.price = 0;
            }
            else {
                maintenanceCardDetail.price = createMaintenanceCard1.products[i].pricePerUnit;
            }
            maintenanceCardDetail.productName =  createMaintenanceCard1.products[i].name
            maintenanceCardDetail.productCode =  createMaintenanceCard1.products[i].code
            maintenanceCardDetail.productImage =  createMaintenanceCard1.products[i].image
            maintenanceCardDetail.productUnit =  createMaintenanceCard1.products[i].unit
            maintenanceCardDetail.productType =  createMaintenanceCard1.products[i].type
            maintenanceCardDetail.quantity = createMaintenanceCard1.products[i].amount;
            data.maintenanceCardDetails.push(maintenanceCardDetail);
        }

        console.log(data);
        // try {
        //     const res = yield call(createMaintenanceCard, data);
        //     if (res.status === STATUS_CODE.SUCCESS) {
        //         yield put(actCreateMaintenanceCardSuccess(res.data))
        //     }
        //     if (res.status === 409) {
        //         yield put(actCreateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
        //     }
        //     if (res.status === 400) {
        //         yield put(actCreateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
        //     }
        // }
        // catch (e) {
        //     console.log(e.response);
        //     if (e.response.status === 409) {
        //         yield put(actCreateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
        //     }
        //     else if (e.response.status === 400) {
        //         yield put(actCreateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
        //     }
        //     else {
        //         yield put(actCreateMaintenanceCardFailed("Tạo phiếu thất bại"))
        //     }
        // }

    }
    else {
        yield put(actError(error, payload.data))
    }


}
export function* updateMaintenanceCardSaga({ payload }) {
    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    let data;
    data = {
        id: createMaintenanceCard1.id,
        platesNumber: payload.data.txtPlatesNumber,
        customer: {
            id: createMaintenanceCard1.customerItem.id
        },
        coordinator: {
            id: createMaintenanceCard1.coordinator.id
        },
        maintenanceCardDetails: [],
    }
    if (payload.data.txtCode !== undefined) {
        data.code = payload.data.txtCode
    }
    if (payload.data.txtModel !== undefined) {
        data.model = payload.data.txtModel
    }
    if (payload.data.txtColor !== undefined) {
        data.color = payload.data.txtColor
    }
    if (createMaintenanceCard1.repairman.user !== undefined &&createMaintenanceCard1.repairman.user !== null && createMaintenanceCard1.repairman.user.id !== undefined &&createMaintenanceCard1.repairman.user.id !== null) {
        data.repairman = {
            id: createMaintenanceCard1.repairman.user.id
        }
    }
    if (payload.data.txtDescription !== undefined) {
        data.description = payload.data.txtDescription
    }
    if (payload.data.txtReturnDate !== undefined) {
        data.returnDate = payload.data.txtReturnDate
    }
    for (let i = 0; i < createMaintenanceCard1.products.length; i++) {
        let product = {
            product: {
                id: createMaintenanceCard1.products[i].id
            },
        }
        if (createMaintenanceCard1.products[i].warranty === 1) {
            product.price = 0;
        }
        else {
            product.price = createMaintenanceCard1.products[i].pricePerUnit;
        }
        product.id = createMaintenanceCard1.products[i].maintenanceCardDetailId;
        product.quantity = createMaintenanceCard1.products[i].amount;
        data.maintenanceCardDetails.push(product);
    }

    console.log(data);
    try {
        const res = yield call(updateMaintenanceCard, data);
        console.log(res);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actUpdateMaintenanceCardSuccess(res.data))
        }
        else {
            yield put(actUpdateMaintenanceCardFailed())
        }
    }
    catch (e) {
        console.log(e.response);
        if (e.response.status === 409) {
            yield put(actUpdateMaintenanceCardFailed("Sản phẩm không có đủ trong kho"))
        }
        else if (e.response.status === 400) {
            yield put(actUpdateMaintenanceCardFailed("Mã phiếu sửa chữa bị trùng"))
        }
        else if (e.response.status === 404) {
            yield put(actUpdateMaintenanceCardFailed("Không tìm thấy phiếu sửa chữa"))
        }
        else {
            yield put(actUpdateMaintenanceCardFailed("Tạo phiếu thất bại"))
        }
    }
}

export function* getMaintenanceCardByIdSaga({ payload }) {
    try {
        const res = yield call(fetchMaintenanceCardById, payload.id);
        yield put(actFetchMaintenanceCardByIdSuccess(res.data))
    }
    catch (e) {
        console.log(e)
        yield put(actFetchMaintenanceCardByIdFailed())
        history.push("/admin/maintenanceCards")
    }
}

export function* completeCardSaga({ payload }) {
    try {
        const res = yield call(completeCard, payload.data);
        yield put(actCompleteCardSuccess())
    }
    catch (e) {
        console.log(e);

    }
}

export function* updateStatusDetailSaga({ payload }) {
    try {
        const res = yield call(updateStatusDetail, payload.data);
        console.log(res.data);
        yield put(actUpdateStatusDetailSuccess(res.data))
    }
    catch (e) {
        console.log(e);
        if (e.response.status === 404) {
            yield put(actUpdateStatusDetailFailed("Không tìm thấy dịch vụ"))
        }
        else if (e.response.status === 405) {
            yield put(actUpdateStatusDetailFailed("Phiếu chưa có nhân viên sửa chữa"))
        }
        else {
            yield put(actUpdateStatusDetailFailed("Thay đổi trạng thái thất bại"))
        }
    }
}


export function* createPaymentHistorySaga({ payload }) {

    const createMaintenanceCard1 = yield select(state => state.maintenanceCardAdd);
    let data1 = []
    let data = {
        maintenanceCard: {
            id: createMaintenanceCard1.id
        },
        paymentMethod: {
            id: payload.data.txtPaymentMethod,
        },
        money: payload.data.txtMoney,
    }
    data1.push(data)
    if (payload.data.txtPaymentMethod2 !== undefined) {
        data = {
            maintenanceCard: {
                id: createMaintenanceCard1.id
            },
            paymentMethod: {
                id: payload.data.txtPaymentMethod2,
            },
            money: payload.data.txtMoney2,
        }
        data1.push(data)
    }
    console.log(data1);
    try {
        const res = yield call(createPaymentHistory, data1);
        console.log(res);
        yield put(actCreatePaymentHistorySuccess(res.data))
    }
    catch (e) {
        console.log(e.response);
        message.error("Số tiền thanh toán vượt quá số tiền cần thanh toán")
        yield put(actFetchMaintenanceCardById(createMaintenanceCard1.id))
    }
}

export function* deleteMaintenanceCardSaga({ payload }) {
    try {
        const res = yield call(deleteMaintenanceCard, payload.data);
        console.log(res.data);
        history.push("/admin/maintenanceCards")
    }
    catch (e) {
        console.log(e);
        if (e.response.status === 404) {
            yield put(actUpdateStatusDetailFailed("Không thể hủy phiếu do đã thanh toán hoặc đã bắt đầu sửa chữa"))
        }
    }
}

export function* createMaintenanceCardWithCustomerSaga() {
    history.push("/admin/maintenanceCards/create")
}


export function* getPlateNumberByCustomerSaga() {
    try {
        const id = yield select(state => state.maintenanceCardAdd.customerItem.id)
        if (id !== undefined) {
            const res = yield call(getPlateNumberByCustomer, id);
            yield put(actGetPlateNumberByCustemerSuccess(res.data))
        }
        // history.push("/admin/maintenanceCards")
    }
    catch (e) {
        console.log(e);
        // if (e.response.status === 404) {
        //     yield put(actUpdateStatusDetailFailed("Không thể hủy phiếu do đã thanh toán hoặc đã bắt đầu sửa chữa"))
        // }
    }
}



