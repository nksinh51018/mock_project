import * as Contraints from "../constants/employee"
import {message} from 'antd';

var initialState = {
    users: [],
    totalPage : 0,
    currentPage: 1,
    userItem:{},
    totalElement: 0,
    maintenanceCard:[],
    ui:{
        isShowModal: false,
        clearForm:true
    }
    // totalElementMaintenanceCard:0,
    // currentPageMaintenanceCard:1,
    // totalPageMaintenanceCard:0

}

const reducer = (state = initialState, action) => {
        switch(action.type){
            case Contraints.FETCH_EMPLOYEE_SUCCESS:
                state.users = action.payload.data.users;
                state.totalElement = action.payload.data.totalElement;
                state.totalPage = action.payload.data.totalPage;
                state.currentPage = action.payload.currentPage;
                return {...state}
            case Contraints.CREATE_EMPLOYEE_SUCCESS:
               
                return {...state}
            case Contraints.CREATE_EMPLOYEE_FAILED:
               
                return {...state}    
            case Contraints.GET_ITEM_SUCCESS:
                state.userItem = action.payload.data;
                return {...state}
            case Contraints.GET_ITEM_FAILED:
                return { ...state }
            case Contraints.DELETE_EMPLOYEE_SUCCESS :
            case Contraints.DELETE_EMPLOYEE_FAILED :
                return { ...state }
            case Contraints.UPDATE_EMPLOYEE_SUCCESS :
                state.userItem = action.payload.data;
                state.ui = {clearForm:true}
                return {...state}
            case Contraints.UPDATE_EMPLOYEE_FAILED:
                state.userItem = action.payload.data;
                state.ui = {clearForm:false}
                return {...state}
            case Contraints.CHANGE_PASSWORD_USER_SUCCESS:
                message.success('Thay đổi mật khẩu thành công')
                state.ui = {
                    isShowModal: false
                };
                return {...state};
            case Contraints.CHANGE_PASSWORD_USER_FAILED:
                message.error('Mật khẩu không khớp,vui lòng thử lại');
                return {...state}
            case Contraints.GET_MAINTENANCECARD_BY_USER_ID_SUCCESS:
                state.maintenanceCard = action.payload.data.maintenanceCard;
                state.totalElement = action.payload.data.totalElement;
                state.totalPage = action.payload.data.totalPage;
                state.currentPage = action.payload.data.currentPage;
                return { ...state }
            
            default:
                    return { ...state }
        } 

}
export default reducer;


 