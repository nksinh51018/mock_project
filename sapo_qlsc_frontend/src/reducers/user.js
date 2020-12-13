
import { message, notification } from "antd";
import * as Contraints from "../constants/users";
const initialState = {
    id: 0,
    fullName: "",
    role: 0,
    messageNumber: 0,
    stompClient: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Contraints.LOGIN_SUCCESS:
            localStorage.setItem('Authorization', action.payload.data);
            return { ...state }
        case Contraints.LOGIN_FAILED:
            message.error('Đăng nhập thất bại')
            return { ...state }
        case Contraints.CHECK_USER_SUCCESS:
            state.id = action.payload.data.id;
            state.fullName = action.payload.data.fullName;
            state.role = action.payload.data.role;
            state.messageNumber = action.payload.data.messageNumber
            return { ...state }
        default:
            return { ...state };
    }
}

export default reducer;