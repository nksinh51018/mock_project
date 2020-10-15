import * as serviceConstants from '../constants/service';
import { message } from 'antd';

const initialState = {
    service: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case serviceConstants.CREATE_SERVICE_SUCCESS:
            message.success("Đã tạo dịch vụ");
            state = action.payload.data;
            return { ...state };
        case serviceConstants.CREATE_SERVICE_FAIL:
            switch (action.payload.e) {
                case "This name has already existed":
                    message.error("Tên dịch vụ đã tồn tại");
                    break;
                case "This code has already existed":
                    message.error("Mã dịch vụ đã tồn tại");
                    break;
                default:
                    message.error("Có lỗi xảy ra khi thêm dịch vụ");
                    break;
            }
            return { ...state };
        case serviceConstants.FETCH_SERVICE_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case serviceConstants.FETCH_SERVICE_FAIL:
            message.error("Có lỗi xảy ra khi tải dịch vụ");
            return { ...state };
        case serviceConstants.UPDATE_SERVICE_SUCCESS:
            message.success("Đã cập nhật dịch vụ");
            state = action.payload.data;
            return { ...state }
        case serviceConstants.UPDATE_SERVICE_FAIL:
            switch (action.payload.e) {
                case "This name has already existed":
                    message.error("Tên dịch vụ đã tồn tại");
                    break;
                case "This code has already existed":
                    message.error("Mã dịch vụ đã tồn tại");
                    break;
                default:
                    message.error("Có lỗi xảy ra khi cập nhật dịch vụ");
                    break;
            }
            return { ...state };
        case serviceConstants.DELETE_SERVICE_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case serviceConstants.DELETE_SERVICE_FAIL:
            message.error("Có lỗi xảy ra khi xóa dịch vụ");
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;