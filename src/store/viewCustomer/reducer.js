import {
  SET_SERVICES_BY_CUSTOMER,
  SET_PAYMENTS_ORDER_BY_CUSTOMER,
  CANCEL_SERVICE_OF_CUSTOMER,
} from "./types";

import { RESET_STATES } from "../allStorages/types";

import { UPDATE_DATA_PAYMENTS } from "../notifications/types";

export const VIEW_CUSTOMER_INITIAL_STATE = {
  servicesRequest: [],
  paymentsOrdes: [],
  totalCount: 0,
  totalCountPaymentsOrdes: 0,
};

export const viewCustomer = (state = VIEW_CUSTOMER_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SERVICES_BY_CUSTOMER:
      return {
        ...state,
        servicesRequest: action.payload.data,
        totalCount: action.payload.totalCount,
      };
    case SET_PAYMENTS_ORDER_BY_CUSTOMER:
      return {
        ...state,
        paymentsOrdes: action.payload.data,
        totalCountPaymentsOrdes: action.payload.totalCount,
      };
    case CANCEL_SERVICE_OF_CUSTOMER: {
      const arrayFilter = state.servicesRequest.map((serviceRequest) => {
        if (serviceRequest.id !== action.payload) return serviceRequest;
        return {
          ...serviceRequest,
          state: "Canceled",
        };
      });
      return {
        ...state,
        servicesRequest: arrayFilter,
      };
    }
    case UPDATE_DATA_PAYMENTS: {
      const arrayFilter = state.paymentsOrdes.map((paymentsOrder) => {
        if (paymentsOrder.id !== action.payload.id) return paymentsOrder;
        return {
          ...paymentsOrder,
          isPaid: true,
        };
      });
      return {
        ...state,
        paymentsOrdes: arrayFilter,
      };
    }
    case RESET_STATES:
      return VIEW_CUSTOMER_INITIAL_STATE;
    default:
      return state;
  }
};
