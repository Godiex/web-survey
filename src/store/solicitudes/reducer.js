import {
  // eslint-disable-next-line import/named
  ASSOCIATE_TO_CUSTOMER,
  // eslint-disable-next-line import/named
  CLOSE_SERVICE_SOLICITUDES,
  CREATE_DATA_ORDER,
  // eslint-disable-next-line import/named
  CREATE_SOLICITUDES_SERVICE,
  SET_DATA_ORDER_SELECT_MAX,
  SET_DATA_ORDER_SELECT_MIN,
  // eslint-disable-next-line import/named
  SET_DATA_SOLICITUDES_SERVICES,
  CANCEL_SERVICE_OF_ADMIN,
} from "./types";
import { RESET_STATES } from "../allStorages/types";

export const SOLICITUDES_INITIAL_STATE = {
  orderSelected: [],
  data: [],
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
};

export const solicitud = (state = SOLICITUDES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_SOLICITUDES_SERVICES:
      return {
        ...state,
        data: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    case CREATE_DATA_ORDER:
      return { ...state, data: [...state.data] };
    case SET_DATA_ORDER_SELECT_MAX:
      return { ...state, orderSelected: [...state.orderSelected, action.payload] };
    case SET_DATA_ORDER_SELECT_MIN:
      return {
        ...state,
        orderSelected: [...state.orderSelected.filter((e) => e.id !== action.payload.id)],
      };
    case ASSOCIATE_TO_CUSTOMER:
      return { ...state, data: [...state.data] };
    case CLOSE_SERVICE_SOLICITUDES: {
      const currentListFilter = state.data.map((solicitudItem) => {
        if (solicitudItem.id !== action.payload) return solicitudItem;

        return { ...solicitudItem, state: "Closed" };
      });
      return { ...state, data: currentListFilter };
    }
    case CREATE_SOLICITUDES_SERVICE:
      return { ...state, data: [...state.data] };
    case CANCEL_SERVICE_OF_ADMIN: {
      const arrayFilter = state.data.map((serviceRequest) => {
        if (serviceRequest.id !== action.payload) return serviceRequest;
        return {
          ...serviceRequest,
          state: "Cancelled",
        };
      });
      return {
        ...state,
        data: arrayFilter,
      };
    }
    case RESET_STATES:
      return SOLICITUDES_INITIAL_STATE;
    default:
      return state;
  }
};
