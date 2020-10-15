import * as accessoryConstants from './../constants/accessory';
import { message } from 'antd';

const initialState = {
    accessory: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case accessoryConstants.FETCH_ACCESSORY_SUCCESS:
            state = action.payload.data
            return { ...state };
        case accessoryConstants.FETCH_ACCESSORY_FAIL:
            message.error("Không thể tải danh sách linh kiện.");
            return { ...state };
        case accessoryConstants.CREATE_ACCESSORY_SUCCESS:
            message.success("Tạo linh kiện mới thành công");
            state = action.payload.data;
            return { ...state };
        case accessoryConstants.CREATE_ACCESSORY_FAIL:
            switch (action.payload.e) {
                case "This name has already existed":
                    message.error("Tên linh kiện đã tồn tại");
                    break;
                case "This code has already existed":
                    message.error("Mã linh kiện đã tồn tại");
                    break;
                default:
                    message.error("Có lỗi xảy ra khi thêm linh kiện");
                    break;
            }
            return { ...state };
        case accessoryConstants.UPDATE_ACCESSORY_SUCCESS:
            message.success("Linh kiện đã được cập nhật");
            state = action.payload.data;
            return { ...state };
        case accessoryConstants.UPDATE_ACCESSORY_FAIL:
            switch (action.payload.e) {
                case "This name has already existed":
                    message.error("Tên linh kiện đã tồn tại");
                    break;
                case "This code has already existed":
                    message.error("Mã linh kiện đã tồn tại");
                    break;
                default:
                    message.error("Có lỗi xảy ra khi cập nhật linh kiện");
                    break;
            }
            return { ...state };
        case accessoryConstants.DELETE_ACCESSORY_SUCCESS:
            state = action.payload.data;
            return { ...state };
        case accessoryConstants.DELETE_ACCESSORY_FAIL:
            message.error("Có lỗi xảy ra khi xóa linh kiện");
            return { ...state };
        default:
            return { ...state };
    }
}

export default reducer;