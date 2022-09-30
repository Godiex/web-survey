import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const getPaymentsGateway = async () => {
  try {
    const res = await httpRequest.get("paymentgateway");
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const changeStatusPaymentGateway = async (id) => {
  try {
    const res = await httpRequest.patch(`paymentgateway/${id}/changestatus`);
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const putPaymentGateway = async (id, data) => {
  try {
    const res = await httpRequest.put(`paymentgateway/${id}/update`, data);
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const searchPaymentCredentials = async (filters) => {
  try {
    const data = await httpRequest.post(`paymentCredentials/searchbytenant`, filters);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const changeStatusPaymentCredentials = async (id) => {
  try {
    const res = await httpRequest.patch(`paymentCredentials/${id}/changestatus`);
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const updatePaymentCredentials = async (id, data) => {
  try {
    const res = await httpRequest.put(`paymentCredentials/${id}/update`, data);
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getAuthorizationurl = async () => {
  try {
    const data = await httpRequest.post(`mercadopago/authorizationurl`);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const createCredentials = async (dataRequest) => {
  try {
    const data = await httpRequest.post(`mercadopago/createcredentials`, dataRequest);
    return data;
  } catch (error) {
    return error;
  }
};

export const udpateCredentials = async (dataRequest) => {
  try {
    const data = await httpRequest.put(`mercadopago/updatecredentials`, dataRequest);
    return data;
  } catch (error) {
    return error;
  }
};
