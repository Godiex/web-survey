// eslint-disable-next-line import/prefer-default-export
import {
  searchPaymentCredentials,
  changeStatusPaymentCredentials,
  updatePaymentCredentials,
  getAuthorizationurl,
  createCredentials,
  udpateCredentials,
} from "../../services/paymentGateway/PaymentGatewayService";
// eslint-disable-next-line import/named
import {
  SEARCH_PAYMENT_CREDENTIALS,
  CHANGE_STATUS_PAYMENT_CREDENTIALS,
  EDIT_PAYMENT_CREDENTIALS,
  GET_URL_AUHT_MERCADO_PAGO_CREDENTIALS,
  CREATE_MERCADO_PAGO_CREDENTIALS,
  UPDATE_MERCADO_PAGO_CREDENTIALS,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const searchCredentials = (filter) => async (dispatch) => {
  const { data } = await searchPaymentCredentials(filter);
  dispatch({ type: SEARCH_PAYMENT_CREDENTIALS, payload: data });
};

export const changeStatusCredentials = (id) => async (dispatch) => {
  await changeStatusPaymentCredentials(id);
  dispatch({ type: CHANGE_STATUS_PAYMENT_CREDENTIALS });
};
export const editCredentials = (id, data) => async (dispatch) => {
  await updatePaymentCredentials(id, data);
  dispatch({ type: EDIT_PAYMENT_CREDENTIALS });
};

export const getLinkMercadoPagoRegister = () => async (dispatch) => {
  const { data } = await getAuthorizationurl();
  dispatch({ type: GET_URL_AUHT_MERCADO_PAGO_CREDENTIALS });
  return data;
};

export const createCredentialsMercadoPago = (dataRequest) => async (dispatch) => {
  const { data } = await createCredentials(dataRequest);
  dispatch({ type: CREATE_MERCADO_PAGO_CREDENTIALS });
  return data.Messages ? data.Messages : data;
};
export const updateCredentialsMercadoPago = (dataRequest) => async (dispatch) => {
  const data = await udpateCredentials(dataRequest);
  dispatch({ type: UPDATE_MERCADO_PAGO_CREDENTIALS, payload: dataRequest });
  return data.Messages ? data.Messages : data;
};
