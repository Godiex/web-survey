// eslint-disable-next-line import/prefer-default-export
import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const searchPaymentsOrders = async (filter) => {
  try {
    const { data } = await httpRequest.post(`paymentorder/searchbyuser`, filter);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
