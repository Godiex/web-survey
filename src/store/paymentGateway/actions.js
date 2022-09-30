// eslint-disable-next-line import/prefer-default-export
import {
  getPaymentsGateway,
  changeStatusPaymentGateway,
  putPaymentGateway,
} from "../../services/paymentGateway/PaymentGatewayService";
// eslint-disable-next-line import/named
import {
  SET_PAYMENT_GATEWAY,
  CHANGE_STATUS_PAYMENT_GATEWAY,
  DELETE_PAYMENT_GATEWAY,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getPaymentGateway = () => async (dispatch) => {
  const data = await getPaymentsGateway();
  dispatch({ type: SET_PAYMENT_GATEWAY, payload: data });
};
export const changeStatePaymentGateway = (id) => async (dispatch) => {
  await changeStatusPaymentGateway(id);
  dispatch({ type: CHANGE_STATUS_PAYMENT_GATEWAY });
};
export const editPaymentGateway = (id, data) => async (dispatch) => {
  await putPaymentGateway(id, data);
  dispatch({ type: DELETE_PAYMENT_GATEWAY });
};
