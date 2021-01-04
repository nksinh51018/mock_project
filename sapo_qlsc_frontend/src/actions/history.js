import * as Contraint from "../constants/history";
export const actFetchData = (pageNum, pageSize) => {
  return {
    type: Contraint.FETCH_PRODUCT_HISTORY,
    payload: {
      pageNum,
      pageSize,
    },
  };
};
export const actFetchDataSuccess = (data) => {
  return {
    type: Contraint.FETCH_PRODUCT_HISTORY_SUCCESS,
    payload: {
      data,
    },
  };
};
