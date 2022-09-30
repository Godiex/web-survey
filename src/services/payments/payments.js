// eslint-disable-next-line import/prefer-default-export
import httpRequest from "../httpRequest";

export const getPreferenceMercadoPago = async (dataRquest) => {
  try {
    const data = await httpRequest.post(`mercadopago`, dataRquest);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const searchPaymentsGenerated = async (dataRquest) => {
  try {
    const data = await httpRequest.post(`paymentorder/search`, dataRquest);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateManualPayment = async (dataRequest) => {
  try {
    const data = await httpRequest.post(`paymentorder/createmanualpayment`, dataRequest);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const searchManualPayments = async (dataRquest) => {
  try {
    const data = await httpRequest.post(`paymentorder/searchmanualpayment`, dataRquest);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const updateManualPayment = async (dataRequest) => {
  try {
    return await httpRequest.post(`mercadopago/marketplace`, dataRequest);
  } catch (error) {
    const { data } = error;
    throw data;
  }
};

export const historyOrderPayment = async (id) => {
  try {
    return await httpRequest.getEntry(`paymentorder/${id}/history`, "");
  } catch (error) {
    return JSON.parse(error);
  }
};
