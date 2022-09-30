import { SET_MESSAGE_ERROR } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const ERROR_MESSAGE_INITIAL_STATE = {
  data: {
    message: "",
  },
};

export const error = (state = ERROR_MESSAGE_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MESSAGE_ERROR:
      return { ...state, data: action.data };
    case RESET_STATES:
      return ERROR_MESSAGE_INITIAL_STATE
    default:
      return state;
  }
};
