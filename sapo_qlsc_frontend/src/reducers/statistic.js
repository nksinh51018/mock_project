import * as statisticConstants from './../constants/statistic';

const initialState = {
    totalCustomerToday: 0,
    totalMaintenanceCard: 0,
    totalMaintenanceCardSuccess: 0,
    totalMaintenanceCardScNotPay: 0,
    totalMaintenanceCardScPayed: 0,
    totalLiabilities: 0,
    totalMoney: 0,
    totalDayMoney: [],
    topRepairMans: [],
    topSerices: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case statisticConstants.FETCH_TOTAL_TODAY_SUCCESS:
            state = action.payload.data
            return { ...state }
        case statisticConstants.FETCH_TOTAL_TODAY_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case statisticConstants.FETCH_TOTAL_MONEY_SUCCESS:
            state.totalDayMoney = action.payload.data
            return { ...state }
        case statisticConstants.FETCH_TOTAL_MONEY_FAILED:
            //message.error('Lỗi không lấy dược dữ liệu');
            return { ...state }
        case statisticConstants.FETCH_TOP_REPAIRMAN_SUCCESS:
            state.topRepairMans = action.payload.data
            return { ...state }
        case statisticConstants.FETCH_TOP_REPAIRMAN_FAILED:
            return { ...state }
        case statisticConstants.FETCH_TOP_SERVICE_SUCCESS:
            state.topServices = action.payload.data
            return { ...state }
        case statisticConstants.FETCH_TOP_SERVICE_FAILED:
            return { ...state }
        default:
            return { ...state }
    }

}

export default reducer; 