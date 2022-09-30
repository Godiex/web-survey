import { SEARCH_PAYMENT_GENERATED, GENERATE_MANUAL_PAY, GET_HISTORY_PAYMENT } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const PAYMENT_GENERATED_INITIAL_STATE = {
  payments: [],
  history: [],
};

export const paymentGenerated = (state = PAYMENT_GENERATED_INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_PAYMENT_GENERATED:
      return {
        ...state,
        payments: action.payload.data,
      };
    case GENERATE_MANUAL_PAY: {
      const newArrayPayments = state.payments.map((payment) => {
        if (payment.id !== action.payload) return payment;
        return { ...payment, isPaid: !payment.isPaid };
      });
      return {
        ...state,
        payments: newArrayPayments,
      };
    }
    case GET_HISTORY_PAYMENT:
      return {
        ...state,
        history: action.payload,
      };
    case RESET_STATES:
      return PAYMENT_GENERATED_INITIAL_STATE;

    default:
      return state;
  }
};
