import { getPrefente } from "../../../../../store/viewCustomer/actions";

export const openUrl = (url) => window.open(url, "Pasarela");

const payWithMercadoPago = (credentialId, orderServiceId) => async (dispatch) => {
  const dataRquest = {
    paymentOrderId: orderServiceId,
    paymentCredentialId: credentialId,
  };
  const { payload } = await dispatch(getPrefente(dataRquest));
  if (payload.data?.initPoint) openUrl(payload.data.initPoint);
};

export const toPay = (credential, orderServiceId) => async (dispatch) => {
  switch (credential.paymentGatewayCode) {
    case "MERCADO_PAGO":
      await dispatch(payWithMercadoPago(credential.id, orderServiceId));
      break;
    default:
      break;
  }
};
