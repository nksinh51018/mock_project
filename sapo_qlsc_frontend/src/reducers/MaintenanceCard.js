import * as MaintenanceCardConstants from '../constants/maintenanceCard';
import { message } from 'antd';
const initialState = {
    currentPage: 0,
    maintenanceCards: [],
    totalItems: 0,
    totalPages: 0,
    maintenanceCardItem: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case MaintenanceCardConstants.FETCH_MAINTENANCE_CARD_SUCCESS:
            state = action.payload.data
            return { ...state }
        case MaintenanceCardConstants.FETCH_MAINTENANCE_CARD_BY_IDCUSTOMER_SUCCESS:
            state = action.payload.data
            return { ...state}
        default:
            return { ...state }

    }
}

export default reducer;