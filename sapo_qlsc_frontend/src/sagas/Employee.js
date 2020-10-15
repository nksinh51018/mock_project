import { call, delay, put } from 'redux-saga/effects';
import { addEmployee, deleteEmployee, getEmployee, getItemEmployee, updateEmployee, changePassword, getmaintenanceCardByIdUser } from './../apis/employee'
import { actFetchData, actFetchDataSuccess, actFetchDataFailed, actDeleteEmployeeSuccess, actGetEmployeeSuccess, actGetEmployeeFailed, actUpdateEmployeeSuccess, actUpdateEmployeeFailed, actCreateEmployeeSuccess, actCreateEmployeeFailed, changePasswordUserSuccess, changePasswordUser, changePasswordUserFailed, actgetMaintenanceCardByUserIdFailed, actgetMaintenanceCardByUserId, actgetMaintenanceCardByUserIdSuccess } from './../actions/employee'
import { STATUS_CODE } from './../constants/api';
import { message } from "antd"
import History from "../history"
export function* fetchEmployeeSaga({ payload }) {
    try {
        console.log(payload.param);
        const res = yield call(getEmployee, payload.pageNum, payload.pageSize, payload.sortBy, payload.descending, payload.param);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(actFetchDataSuccess(res.data));
        } else {
            yield put(actFetchDataFailed("Không load được dữ liệu"));
        }
    } catch (error) {

    }
}
export function* deleteEmployeeSaga({ payload }) {
    try {
        const res = yield call(deleteEmployee, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success('Xóa thành công !');
            yield put(actFetchData(1, 5, '', '', ''));
        } else {
            message.error(res.data);
            yield put(actFetchDataFailed(''));
        }
    } catch (error) {
        message.error('Xóa thất bại');
    }
}
export function* getItemByIdSaga({ payload }) {
    try {
        const res = yield call(getItemEmployee, payload.id);
        if (res.status === STATUS_CODE.SUCCESS) {
            console.log('success');
            yield put(actGetEmployeeSuccess(res.data));
        }
    } catch (error) {
        message.error("Nhân viên không tồn tại hoặc đã bị xóa");
    }
}
export function* updateEmployeeSaga({ payload }) {
    try {
        const res = yield call(updateEmployee, payload.data, payload.id);
        if (res.status == STATUS_CODE.SUCCESS) {
            message.success('Cập nhật nhân viên thành công')
            yield put(actUpdateEmployeeSuccess(res.data));
        }
    } catch (error) {
        const res = yield call(getItemEmployee, payload.id);
        yield put(actUpdateEmployeeFailed(res.data));
        message.error('Cập nhật nhân viên thất bại!  Mã bị trùng ')
    }
}
export function* insertEmployeeSaga({ payload }) {

    try {
        const res = yield call(addEmployee, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            message.success("Thêm nhân viên thành công")
            History.push(`/admin/employees/${res.data.id}`)
        }
    } catch (error) {
        message.error('Email nhân viên bị trùng')
    }

}
export function* changePasswordUserSaga({ payload }) {
    try {
        const res = yield call(changePassword, payload.data);
        if (res.status === STATUS_CODE.SUCCESS) {
            yield put(changePasswordUserSuccess(res.data));
        }
    } catch (error) {
        yield put(changePasswordUserFailed("Mật khẩu không khớp"));
    }
}
export function* getListMaintanceCardByUserIdSaga({ payload }) {
    try {
        const res = yield call(getmaintenanceCardByIdUser, payload.id,payload.pageNum,payload.pageSize,payload.sortBy,payload.descending,payload.code,payload.payStatus,payload.workStatus);
        if (res.status == STATUS_CODE.SUCCESS) {
            yield put(actgetMaintenanceCardByUserIdSuccess(res.data));
        }
    } catch (error) {
        message.error("Dữ liệu load thất bại");
        yield put(actgetMaintenanceCardByUserIdFailed("Dữ liệu load thất bại"));
    }
}
