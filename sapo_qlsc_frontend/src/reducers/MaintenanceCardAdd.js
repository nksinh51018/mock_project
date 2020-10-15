import * as CreateMaintenanceCardType from '../constants/MaintenanceCardAdd'
import { message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
var initialState = {
    customers: [],
    customerPage: 0,
    totalCustomerPage: 0,
    customerItem: {},
    listRepairman: [],
    repairmanPage: 1,
    totalRepairman: 0,
    repairman: {
        user: {

        },
        edit: true
    },
    listProduct: [],
    productPage: 0,
    totalProductPage: 0,
    products: [],
    maintenanceCardDetailStatusHistories: [],
    error: {
        customerError: false,
    },
    payStatus: 0,
    workStatus: 0,
    paymentHistories: [],
    ui: {
        customerModal: false,
        paymentModal: false,
    },
    coordinator: {},
    id: 0,
    price: 0,
    info: {
        code: null,
        platesNumber: null,
        description: null,
        returnDate: null,
        model: null,
        color: null,
    },
    checkCustomer: false,
    reset: {
        reset: true,
    },
    plates: [],
    createdDate: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case CreateMaintenanceCardType.SEARCH_CUSTOMER_SUCCESS:
            const { customers } = action.payload.data;
            state.customers = customers
            state.customerPage = 1;
            state.totalCustomerPage = action.payload.data.totalPages;
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_LIST_CUSTOMER_SUCCESS:
            const updateCustomers = action.payload.data.customers;
            state.customers = state.customers.concat(updateCustomers)
            state.customerPage = action.payload.data.currentPage;
            state.totalCustomerPage = action.payload.data.totalPages;
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_LIST_SEARCH_REPAIRMAN_SUCCESS:
            const updateRepairmans = action.payload.data.listUser;
            state.listRepairman = state.listRepairman.concat(updateRepairmans)
            state.repairmanPage = state.repairmanPage + 1;
            state.totalRepairman = action.payload.data.total;
            return { ...state }
        case CreateMaintenanceCardType.CHOOSE_CUSTOMER:
            let id = action.payload.data;
            let index = findItem(id, state.customers);
            console.log(index);
            state.customerItem = state.customers[index];
            console.log(state);
            return { ...state }
        case CreateMaintenanceCardType.CREATE_CUSTOMER:
            return { ...state }
        case CreateMaintenanceCardType.CREATE_CUSTOMER_SUCCESS:
            message.success('Thêm khách hàng thành công');
            state.customerItem = action.payload.data
            state.ui = {
                customerModal: false,
            };
            return { ...state }
        case CreateMaintenanceCardType.CREATE_CUSTOMER_FAILED:
            message.error('Thêm khách hàng thất bại (Mã bị trùng)');
            state.ui = {
                customerModal: true,
            };
            return { ...state }
        case CreateMaintenanceCardType.CLEAR_CUSTOMER:
            state.customerItem = {}
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_INFO:
            const { name, value } = action.payload;
            state.MAINTENANCECard = {
                ...state.MAINTENANCECard,
                [name]: value
            }
            return { ...state }
        case CreateMaintenanceCardType.SEARCH_REPAIRMAN_SUCCESS:
            state.listRepairman = action.payload.data.listUser
            state.totalRepairman = action.payload.data.total;
            return { ...state }
        case CreateMaintenanceCardType.CHOOSE_REPAIRMAN:
            let idRepairman = action.payload.data;
            let indexRepairman = findRepairman(idRepairman, state.listRepairman);
            state.repairman = state.listRepairman[indexRepairman];
            state.repairman.edit = true
            return { ...state }
        case CreateMaintenanceCardType.CLEAR_REPAIRMAN:
            state.repairman = {}
            return { ...state }
        case CreateMaintenanceCardType.SEARCH_PRODUCT_SUCCESS:
            state.listProduct = action.payload.data.content;
            state.productPage = action.payload.data.number + 1
            state.totalProductPage = action.payload.data.totalPages
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_LIST_PRODUCT_SUCCESS:
            const updateProduct = action.payload.data.content;
            state.listProduct = state.listProduct.concat(updateProduct)
            state.productPage = action.payload.data.number + 1
            state.totalproductPage = action.payload.data.totalPages
            return { ...state }
        case CreateMaintenanceCardType.CHOOSE_PRODUCT:
            let idProduct = action.payload.data;
            let indexProduct2 = findItem(idProduct, state.products);
            if (indexProduct2 === -1) {
                let indexProduct = findItem(idProduct, state.listProduct);
                let product = { ...state.listProduct[indexProduct] };
                product.key = uuidv4()
                product.status = 0
                product.amount = 1
                product.warranty = 0
                if (product.type === 1) {
                    state.products.push(product);
                }
                else {
                    state.products.unshift(product);
                }
                let a = [...state.products]
                state.products = a;
            }
            else {
                if (state.products[indexProduct2].type === 1) {
                    if (state.products[indexProduct2].amount < state.products[indexProduct2].quantity) {
                        state.products[indexProduct2].amount++;
                    }
                    else {
                        message.error(`${state.products[indexProduct2].name} đã tối đa số lượng`)
                    }
                }
                else {
                    message.warning(`Dịch vụ ${state.products[indexProduct2].name} đã tồn tại`)
                }
            }
            return { ...state }
        case CreateMaintenanceCardType.REMOVE_PRODUCT:
            let idProductRemove = action.payload.data;
            let indexProductKey = findItem(idProductRemove.toString(), state.products);
            state.products.splice(indexProductKey, 1);
            let a1 = [...state.products]
            state.products = a1;
            return { ...state }
        case CreateMaintenanceCardType.CHANGE_AMOUNT:
            let idProduct1 = action.payload.id;
            let indexProduct1 = findItem(idProduct1.toString(), state.products);
            console.log(state.products[indexProduct1].quantity);
            console.log(action.payload.value);
            if (state.products[indexProduct1].quantity >= action.payload.value) {
                state.products[indexProduct1].amount = action.payload.value;
            }
            else {
                state.products[indexProduct1].amount = state.products[indexProduct1].quantity
                message.error(`${state.products[indexProduct1].name} còn lại ${state.products[indexProduct1].quantity} sản phẩm`)
            }
            let a2 = [...state.products]
            state.products = a2;
            return { ...state }
        case CreateMaintenanceCardType.ERROR:
            state.error.customerError = false
            for (let i = 0; i < action.payload.data.length; i++) {
                state.error[action.payload.data[i]] = true
            }
            state.reset = false;
            let a3 = { ...state.error };
            state.error = a3
            message.error("Vui lòng thêm đầy đủ thông tin")
            return { ...state }
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_SUCCESS:
            message.success("Tạo phiếu sửa chữa thành công")
            state.id = action.payload.data.id
            state.check = false;
            return { ...state }
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.message)
            return { ...state }
        case CreateMaintenanceCardType.WARRANTY_PRODUCT:
            const idProductWarranty = action.payload.data;
            const indexProductWarranty = findItem(idProductWarranty.toString(), state.products);
            if (state.products[indexProductWarranty].warranty === 1) {
                state.products[indexProductWarranty].warranty = 0;
            }
            else {
                state.products[indexProductWarranty].warranty = 1
            }
            return { ...state }
        case CreateMaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_ID_SUCCESS:
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                }
                else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.workStatus = action.payload.data.workStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;
            console.log(action.payload.data.repairman);
            if(action.payload.data.repairman === null){
                state.repairman.user = {};
            }
            else{
                state.repairman.user = action.payload.data.repairman;
            }
            if (action.payload.data.repairman !== null) {
                state.repairman.edit = false
            }
            else {
                state.repairman.edit = true
            }
            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.checkCustomer = false;
            state.createdDate = action.payload.data.createdDate
            return { ...state }
        case CreateMaintenanceCardType.RESET_STORE:
            let newState = {
                customers: [],
                customerPage: 0,
                totalCustomerPage: 0,
                customerItem: {},
                listRepairman: [],
                repairmanPage: 1,
                totalRepairman: 0,
                repairman: {
                    user: {

                    },
                    edit: true
                },
                listProduct: [],
                productPage: 0,
                totalProductPage: 0,
                products: [],
                error: {
                    customerError: false,
                },
                payStatus: 0,
                workStatus: 0,
                paymentHistories: [],
                ui: {
                    customerModal: false
                },
                coordinator: {},
                id: 0,
                info: {
                    code: null,
                    platesNumber: null,
                    description: null,
                    returnDate: null,
                    model: null,
                    color: null,
                },
                reset: true,
                plates: [],
                createdDate: null,
            }
            if (state.checkCustomer) {
                newState.customerItem = state.customerItem;
            }
            return { ...newState }
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_SUCCESS:
            message.success("Cập nhật phiếu sửa chữa thành công")
            console.log(action.payload.data);
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                }
                else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info = {
                code: action.payload.data.code,
                platesNumber: action.payload.data.platesNumber,
                description: action.payload.data.description,
                returnDate: action.payload.data.returnDate,
                model: action.payload.data.model,
                color: action.payload.data.color,
            }
            if(action.payload.data.repairman === null){
                state.repairman.user = {};
            }
            else{
                state.repairman.user = action.payload.data.repairman;
            }
            if (action.payload.data.repairman !== null) {
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.checkCustomer = false;
            state.createdDate = action.payload.data.createdDate
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.message)
            return { ...state }
        case CreateMaintenanceCardType.COMPLETE_CARD_SUCCESS:
            let b2 = { ...state.reset };
            state.reset = b2;
            message.success("Thay đổi trạng thái thành công")
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_STATUS_DETAIL_SUCCESS:
            message.success("Cập nhật trạng thái thành công")
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                }
                else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            console.log(action.payload.data.workStatus);
            state.workStatus = action.payload.data.workStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;
            console.log(action.payload.data.repairman);
            if (action.payload.data.repairman !== null) {
                state.repairman.user = action.payload.data.repairman;
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.checkCustomer = false;
            state.createdDate = action.payload.data.createdDate
            return { ...state }
        case CreateMaintenanceCardType.UPDATE_STATUS_DETAIL_FAILED:
            message.error(action.payload.message);
            return { ...state }
        case CreateMaintenanceCardType.CREATE_PAYMENT_HISTORY_SUCCESS:
            message.success("Thanh toán thành công")
            state.check = true;
            state.customerItem = action.payload.data.customer
            state.products = []
            for (let i = 0; i < action.payload.data.maintenanceCardDetails.length; i++) {
                let maintenanceCardDetail = action.payload.data.maintenanceCardDetails[i];
                let product = maintenanceCardDetail.product;
                product.maintenanceCardDetailId = maintenanceCardDetail.id;
                product.amount = maintenanceCardDetail.quantity
                if (maintenanceCardDetail.price === 0) {
                    product.warranty = 1;
                }
                else {
                    product.warranty = 0;
                }
                product.status = maintenanceCardDetail.status
                product.key = uuidv4()
                state.products.push(product)
            }
            state.maintenanceCardDetailStatusHistories = action.payload.data.maintenanceCardDetailStatusHistories
            state.payStatus = action.payload.data.payStatus
            state.paymentHistories = action.payload.data.paymentHistories;
            state.info.code = action.payload.data.code;
            state.info.platesNumber = action.payload.data.platesNumber;
            if(action.payload.data.repairman === null){
                state.repairman.user = {};
            }
            else{
                state.repairman.user = action.payload.data.repairman;
            }
            if (action.payload.data.repairman !== null) {
                state.repairman.edit = false
            }
            state.coordinator = action.payload.data.coordinator;
            state.info.description = action.payload.data.description;
            state.info.returnDate = action.payload.data.returnDate;
            state.info.model = action.payload.data.model;
            state.info.color = action.payload.data.color;
            state.id = action.payload.data.id
            state.price = action.payload.data.price
            state.ui = {
                customerModal: false,
                paymentModal: false,
            }
            state.checkCustomer = false;
            state.createdDate = action.payload.data.createdDate
            return { ...state }
        case CreateMaintenanceCardType.CREATE_PAYMENT_HISTORY_FAILED:
            message.error("Số tiền thoanh toán không được vượt quá số tiền trả")
            return { ...state }
        case CreateMaintenanceCardType.FETCH_MAINTENANCE_CARD_BY_ID_FAILED:
            message.error("Không tìm thấy phiếu sửa chữa")
            return { ...state }
        case CreateMaintenanceCardType.DELETE_MAINTENANCE_CARD_FAILED:
            message.error(action.payload.data)
            return { ...state }
        case CreateMaintenanceCardType.CREATE_MAINTENANCE_CARD_WITH_CUSTOMER:
            state.customerItem = action.payload.data;
            state.checkCustomer = true;
            return { ...state }
        case CreateMaintenanceCardType.GET_PLATE_NUMBER_BY_CUSTOMER_SUCCESS:
            state.plates = action.payload.data
            return { ...state }
        default:
            return { ...state }
    }
}

const findItem = (id, list) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].id.toString() === id) {
            index = i;
            break;
        }
    }
    return index;
}

const findMaintenanceCardDetail = (id, list) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].maintenanceCardDetailId.toString() === id.toString()) {
            index = i;
            break;
        }
    }
    return index;
}

const findRepairman = (id, list) => {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
        if (list[i].user.id.toString() === id) {

            index = i;
            break;
        }
    }
    return index;
}

export default reducer;
