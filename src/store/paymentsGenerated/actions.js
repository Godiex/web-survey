// eslint-disable-next-line import/prefer-default-export
import {
  searchPaymentsGenerated,
  generateManualPayment,
  searchManualPayments,
  updateManualPayment,
  historyOrderPayment,
} from "../../services/payments/payments";
// eslint-disable-next-line import/named
import {
  SEARCH_PAYMENT_GENERATED,
  GENERATE_MANUAL_PAY,
  SEARCH_MANUAL_PAY,
  GET_HISTORY_PAYMENT,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getPaymentGenerated = (filters) => async (dispatch) => {
  const { data } = await searchPaymentsGenerated(filters);
  dispatch({ type: SEARCH_PAYMENT_GENERATED, payload: data });
  return data;
};
export const generatePay = (dataRequest) => async (dispatch) => {
  const { status, data } = await generateManualPayment(dataRequest);
  if (status !== undefined) dispatch({ type: GENERATE_MANUAL_PAY, payload: data });
  return status !== undefined;
};
export const getManualPayments = (dataRequest) => async (dispatch) => {
  const { data } = await searchManualPayments(dataRequest);
  dispatch({ type: SEARCH_MANUAL_PAY });
  return data;
};
export const changeStatusManualPayment = (dataRequest) => async (dispatch) => {
  const data = await updateManualPayment(dataRequest);
  dispatch({ type: SEARCH_MANUAL_PAY });
  return data;
};
export const getHistoryPaymentOrder = (id) => async (dispatch) => {
  const data = await historyOrderPayment(id);
  dispatch({ type: GET_HISTORY_PAYMENT, payload: data });
  return data;
};
