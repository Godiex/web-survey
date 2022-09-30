import { RESET_STATES } from "../allStorages/types";

export const USER_INITIAL_STATE = {
  data: [],
};

export const user = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_DATA_POLLSTERS_USERS":
      return { ...state, data: action.payload };
    case RESET_STATES:
      return USER_INITIAL_STATE;
    default:
      return state;
  }
};
