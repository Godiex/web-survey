// eslint-disable-next-line import/named
import {
  searchByCustomer,
  cancelServiceSolicitudes,
} from "../../services/Order/ServiceSolicitudes";
import { searchPaymentsOrders } from "../../services/paymentOrder/PaymentOrderServices";
import { getPreferenceMercadoPago } from "../../services/payments/payments";
import {
  SET_SERVICES_BY_CUSTOMER,
  CANCEL_SERVICE_OF_CUSTOMER,
  SET_PAYMENTS_ORDER_BY_CUSTOMER,
  SET_PAYMENT_PREFERENCE_OF_CUSTOMER,
} from "./types";

import { CANCEL_SERVICE_OF_ADMIN } from "../solicitudes/types";

export const filterByCustomer = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await searchByCustomer(filter);
    await dispatch({ type: SET_SERVICES_BY_CUSTOMER, payload: data });
  } catch (error) {
    throw error;
  }
};
export const cancelService = (id, data) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const dataResponse = await cancelServiceSolicitudes(id, data);
    if (typeof dataResponse === "string") {
      await dispatch({ type: CANCEL_SERVICE_OF_CUSTOMER, payload: id });
      await dispatch({ type: CANCEL_SERVICE_OF_ADMIN, payload: id });
    }
  } catch (error) {
    throw error;
  }
};

export const filterPaymentsOrderByCustomer = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await searchPaymentsOrders(filter);
    await dispatch({ type: SET_PAYMENTS_ORDER_BY_CUSTOMER, payload: data });
  } catch (error) {
    throw error;
  }
};
export const getPrefente = (dataRequest) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getPreferenceMercadoPago(dataRequest);
    return await dispatch({ type: SET_PAYMENT_PREFERENCE_OF_CUSTOMER, payload: data });
  } catch (error) {
    throw error;
  }
};
