import * as statisticConstants from './../constants/statistic';

export const actGetTotalToday = (startDate, endDate) => {
    return {
        type: statisticConstants.FETCH_TOTAL_TODAY,
        payload: {
            startDate,
            endDate
         }
    }

}

export const actGetTotalTodaySuccess = (data) => {
    return {
        type: statisticConstants.FETCH_TOTAL_TODAY_SUCCESS,
        payload: {
           data
        }
    }
}

export const actGetTotalTodayFailed = (e) => {
    return {
        type: statisticConstants.FETCH_TOTAL_TODAY_FAILED,
        payload: {
           e
        }
    }
}


export const actGetTotalMoney = (startDate, endDate) => {
    return {
        type: statisticConstants.FETCH_TOTAL_MONEY,
        payload: {
            startDate,
            endDate
         }
    }

}

export const actGetTotalMoneySuccess = (data) => {
    return {
        type: statisticConstants.FETCH_TOTAL_MONEY_SUCCESS,
        payload: {
           data
        }
    }
}

export const actGetTotalMoneyFailed = (e) => {
    return {
        type: statisticConstants.FETCH_TOTAL_MONEY_FAILED,
        payload: {
            e
        }
    }
}


export const actGetTopRepairman = (startDate, endDate) => {
    return {
        type: statisticConstants.FETCH_TOP_REPAIRMAN,
        payload: {
            startDate,
            endDate
         }
    }

}

export const actGetTopRepairmanSuccess = (data) => {
    return {
        type: statisticConstants.FETCH_TOP_REPAIRMAN_SUCCESS,
        payload: {
           data
        }
    }
}

export const actGetTopRepairmanFailed = (e) => {
    return {
        type: statisticConstants.FETCH_TOP_REPAIRMAN_FAILED,
        payload: {
            e
        }
    }
}

export const actGetTopService = (startDate, endDate) => {
    return {
        type: statisticConstants.FETCH_TOP_SERVICE,
        payload: {
            startDate,
            endDate
         }
    }

}

export const actGetTopServiceSuccess = (data) => {
    return {
        type: statisticConstants.FETCH_TOP_SERVICE_SUCCESS,
        payload: {
           data
        }
    }
}

export const actGetTopServiceFailed = (e) => {
    return {
        type: statisticConstants.FETCH_TOP_SERVICE_FAILED,
        payload: {
            e
        }
    }
}