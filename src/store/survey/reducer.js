import { SET_DATA_SURVEY } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const SURVEY_INITIAL_STATE = {
  data: [],
};

export const survey = (state = SURVEY_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_SURVEY:
      return { ...state, data: action.payload };
    case RESET_STATES:
      return SURVEY_INITIAL_STATE;
    default:
      return state;
  }
};
