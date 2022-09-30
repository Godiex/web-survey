import { SET_DATA_ORDER, ASSIGN_DATE_TO_VISIT, CANCELLED_ORDER } from "./types";

import { RESET_STATES } from "../allStorages/types";

export const ORDER_INITIAL_STATE = {
  data: [],
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
};

export const order = (state = ORDER_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_ORDER:
      return {
        ...state,
        data: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    case ASSIGN_DATE_TO_VISIT: {
      let dataToUpdate = state.data.find((orderItem) => orderItem.id === action.payload.id);
      const arrayData = state.data.filter((orderItem) => orderItem.id !== action.payload.id);
      if (dataToUpdate) dataToUpdate = { ...dataToUpdate, visitDate: action.payload.visitDate };
      return {
        ...state,
        data: [...arrayData, dataToUpdate],
      };
    }
    case CANCELLED_ORDER: {
      const arrayFilter = state.data.map((orderRequest) => {
        if (orderRequest.id !== action.payload) return orderRequest;
        return {
          ...orderRequest,
          orderStatus: "Cancelled",
        };
      });
      return {
        ...state,
        data: arrayFilter,
      };
    }
    case RESET_STATES:
      return ORDER_INITIAL_STATE;
    default:
      return state;
  }
};
