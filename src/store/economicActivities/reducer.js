import { SET_DATA_ECONOMIC_ACTIVITIES, SET_DATA_ECONOMIC_ACTIVITIES_CODE } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const ECONOMIC_ACTIVITIES_INITIAL_STATE = {
  data: [],
  type: {},
};

export const economicActivities = (state = ECONOMIC_ACTIVITIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_ECONOMIC_ACTIVITIES:
      return { ...state, data: action.payload };
    case SET_DATA_ECONOMIC_ACTIVITIES_CODE:
      return { ...state, type: action.payload };
    case RESET_STATES:
      return ECONOMIC_ACTIVITIES_INITIAL_STATE;
    default:
      return state;
  }
};
