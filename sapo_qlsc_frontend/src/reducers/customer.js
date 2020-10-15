import * as customerConstants from './../constants/customer';
import { message } from 'antd';

const initialState = {
    currentPage: 0,
    customers: [],
    totalItems: 0,
    totalPages: 0,
    customerItem: {
        txtcode: '',
        txtName: '',
        txtphoneNumber: '',
        txtemail: '',
        txtaddress: '',
        txtdescription: '',
        txtProvineName: '',
        txtDistrictName: '',
        txtDistrictCode: '',
        txtWardCode: '',
        txtWardName: '',
        txtPayStatus: '',
        current_debt: 0
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case customerConstants.FETCH_CUSTOMER_BY_ID_SUCCESS:
            state.customerItem = action.payload.data;
            state.customerItem.txtcode = action.payload.data.code;
            state.customerItem.txtName = action.payload.data.name;
            state.customerItem.txtphoneNumber = action.payload.data.phoneNumber;
            state.customerItem.txtemail = action.payload.data.email;
            state.customerItem.txtdescription = action.payload.data.description;
            state.customerItem.txtaddress = action.payload.data.address;

            if(action.payload.data.ward !== null){
                state.customerItem.txtDistrictCode = action.payload.data.ward.district.code;
                state.customerItem.txtProvineName = action.payload.data.ward.district.province.name;
                state.customerItem.txtDistrictName = action.payload.data.ward.district.name;
                state.customerItem.txtWardName = action.payload.data.ward.name;
                state.customerItem.txtWardCode = action.payload.data.ward.code;
            }
            state.customerItem.current_debt = action.payload.data.current_debt;
            return { ...state }
        case customerConstants.FETCH_CUSTOMER_BY_ID_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case customerConstants.FETCH_CUSTOMER_SUCCESS:
            state = action.payload.data
            return { ...state }
        case customerConstants.FILTER_PAYSTATUS_OF_CUSTOMERS_SUCCESS:
            state = action.payload.data
            return { ...state }
        case customerConstants.FETCH_CUSTOMER_FAILED:
            message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case customerConstants.SEARCH_CUSTOMER_SUCCESS:
            state = action.payload.data
            return { ...state }
        case customerConstants.SEARCH_CUSTOMER_FAILED:
            message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case customerConstants.CHOOSE_CUSTOMER:
            let id = action.payload.data;
            let index = findCustomer(id, state.customers);
            state.customerItem = state.customers[index];
            return { ...state }
        case customerConstants.CREATE_CUSTOMER_SUCCESS:
            state.customerItem = action.payload.data
            return { ...state }
        case customerConstants.CREATE_CUSTOMER_FAILED:
            //message.error('Thêm khách hàng thất bại (Mã bị trùng)');
            return { ...state }
        case customerConstants.UPDATE_CUSTOMER_SUCCESS:
            message.success('Cập nhật khách hàng thành công');
            state.customerItem = action.payload.data
            return { ...state }
        case customerConstants.UPDATE_CUSTOMER_FAILED:
            //message.error('Cập nhật khách hàng không thành công');
            return { ...state }
        case customerConstants.DELETE_CUSTOMER_SUCCESS:
            message.success('Xóa khách hàng thành công');
            return { ...state }
        case customerConstants.DELETE_CUSTOMER_FAILED:
            message.error('Xóa khách hàng không thành công');
            return { ...state }
        case customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER_SUCCESS:
            message.success('Xóa khách hàng thành công');
            return { ...state }
        case customerConstants.UPDATE_MULTIPLE_STATUS_CUSTOMER_FAILED:
            message.error('Xóa khách hàng không thành công');
            return { ...state }
        case customerConstants.CLEAR_CUSTOMER:
            state.customerItem = {}
            return { ...state }
        default:
            return { ...state }
    }

}

const findCustomer = (id, customers) => {
    let index = -1;
    for (let i = 0; i < customers.length; i++) {
        if (customers[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}


export default reducer; 