import { SET_DATA_SERVICE_STRATEGY_CODE_TYPES, SET_DATA_SERVICE_STRATEGY_TYPES } from "./types";

import { RESET_STATES } from "../allStorages/types";

export const SERVICE_STRATEGY_INITIAL_STATE = {
  data: [],
  type: {},
};

export const serviceStrategy = (state = SERVICE_STRATEGY_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_SERVICE_STRATEGY_TYPES:
      return { ...state, data: action.payload };
    case SET_DATA_SERVICE_STRATEGY_CODE_TYPES:
      return { ...state, type: action.payload };
    case RESET_STATES:
      return SERVICE_STRATEGY_INITIAL_STATE;
    default:
      return state;
  }
};
