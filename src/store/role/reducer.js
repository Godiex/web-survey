import { RESET_STATES } from "../allStorages/types";

export const ROLE_INITIAL_STATE = {
  data: [],
};

export const role = (state = ROLE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA_ROLES":
      return { ...state, data: action.payload };
    case RESET_STATES:
      return ROLE_INITIAL_STATE;
    default:
      return state;
  }
};
