import { RESET_STATES } from "../allStorages/types";

export const CUSTOMER_INITIAL_STATE = {
  data: [],
  dataMap: [],
};

export const customer = (state = CUSTOMER_INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA_CUSTOMER":
      return { ...state, data: action.payload };
    case "SET_DATA_CUSTOMER_MAP":
      return { ...state, dataMap: action.payload };
    case RESET_STATES:
      return CUSTOMER_INITIAL_STATE;
    default:
      return state;
  }
};
