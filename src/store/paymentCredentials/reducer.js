import { SEARCH_PAYMENT_CREDENTIALS, UPDATE_MERCADO_PAGO_CREDENTIALS } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const ORDER_INITIAL_STATE = {
  data: [],
};

export const paymentCredentials = (state = ORDER_INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_PAYMENT_CREDENTIALS:
      return {
        ...state,
        data: action.payload.data,
      };
    case UPDATE_MERCADO_PAGO_CREDENTIALS: {
      const newData = state.data.map((credential) => {
        if (credential.id !== action.payload.id) return credential;
        return { ...credential, accountName: action.payload.accountName };
      });
      return {
        ...state,
        data: newData,
      };
    }
    case RESET_STATES:
      return ORDER_INITIAL_STATE;
    default:
      return state;
  }
};
