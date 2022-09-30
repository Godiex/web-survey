import { SET_DATA_IDENTIFICATION_CODE_TYPES, SET_DATA_IDENTIFICATION_TYPES } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const IDENTIFICATION_TYPES_INITIAL_STATE = {
  data: [],
  type: {},
};

export const identificationTypes = (state = IDENTIFICATION_TYPES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_IDENTIFICATION_TYPES:
      return { ...state, data: action.payload };
    case SET_DATA_IDENTIFICATION_CODE_TYPES:
      return { ...state, type: action.payload };
    case RESET_STATES:
      return IDENTIFICATION_TYPES_INITIAL_STATE;
    default:
      return state;
  }
};
