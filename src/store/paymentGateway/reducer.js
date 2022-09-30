import { SET_PAYMENT_GATEWAY } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const ORDER_INITIAL_STATE = {
  data: [],
};

export const paymentGateway = (state = ORDER_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PAYMENT_GATEWAY:
      return {
        ...state,
        data: action.payload,
      };
    case RESET_STATES:
      return ORDER_INITIAL_STATE;
    default:
      return state;
  }
};
