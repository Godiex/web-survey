import {
  ACTIVATE_SERVICE_TYPES,
  CREATE_SERVICE_TYPES,
  DES_ACTIVATE_SERVICE_TYPES,
  // eslint-disable-next-line import/named
  RESET_SERVICE_WITHOUT_TOKEN_TYPES,
  SET_DATA_SERVICE_TYPES,
  // eslint-disable-next-line import/named
  SET_DATA_SERVICE_WITHOUT_TOKEN_TYPES,
  // eslint-disable-next-line import/named
  SET_DIALOG_TYPES,
  UPDATE_SERVICE_TYPES,
} from "./types";

import { RESET_STATES } from "../allStorages/types";

export const SERVICE_INITIAL_STATE = {
  data: [],
  dataService: [],
  all: [],
  currentPage: 1,
  totalPages: 0,
  totalCount: 0,
  open: false,
};

export const service = (state = SERVICE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ALL_SERVICE":
      return { ...state, all: action.payload };
    case SET_DATA_SERVICE_TYPES:
      return {
        ...state,
        data: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        totalCount: action.payload.totalCount,
      };
    case CREATE_SERVICE_TYPES:
      return { ...state, data: [...state.data] };
    case SET_DATA_SERVICE_WITHOUT_TOKEN_TYPES:
      return { ...state, dataService: action.payload };
    case RESET_SERVICE_WITHOUT_TOKEN_TYPES:
      return { ...state, dataService: [] };
    case UPDATE_SERVICE_TYPES:
      return { ...state, data: action.payload };
    case ACTIVATE_SERVICE_TYPES:
      return { ...state, data: action.payload };
    case DES_ACTIVATE_SERVICE_TYPES:
      return { ...state, data: action.payload };
    case SET_DIALOG_TYPES:
      return { ...state, open: action.payload };
    case RESET_STATES:
      return SERVICE_INITIAL_STATE;
    default:
      return state;
  }
};
