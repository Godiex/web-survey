import {
  // eslint-disable-next-line import/named
  ASSOCIATE_TO_CUSTOMER,
  // eslint-disable-next-line import/named
  CLOSE_SERVICE_SOLICITUDES,
  // eslint-disable-next-line import/named
  CREATE_DATA_ORDER,
  // eslint-disable-next-line import/named
  CREATE_SOLICITUDES_SERVICE,
  SET_DATA_ORDER_SELECT_MAX,
  SET_DATA_ORDER_SELECT_MIN,
  // eslint-disable-next-line import/named
  SET_DATA_SOLICITUDES_SERVICES,
  CUSTOMER_CREATE_SOLICITUDES_SERVICE,
} from "./types";
// eslint-disable-next-line import/named
import {
  associateToCustomerService,
  closeServiceSolicitudes,
  createServiceSolicitudesAnonymous,
  serviceRequests,
  createServiceSolicitudesCustomer,
} from "../../services/Order/ServiceSolicitudes";
import { createOrderService } from "../../services/Order/OrderService";

// eslint-disable-next-line import/prefer-default-export
export const selectOrderService = (order, action) => (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (action) dispatch({ type: SET_DATA_ORDER_SELECT_MAX, payload: order });
    else dispatch({ type: SET_DATA_ORDER_SELECT_MIN, payload: order });
  } catch (error) {
    throw error;
  }
};

export const getServicesSolicitudes = (request) => async (dispatch) => {
  const data = await serviceRequests(request);
  dispatch({ type: SET_DATA_SOLICITUDES_SERVICES, payload: data });
};

export const associateToCustomer = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await associateToCustomerService(request);
    dispatch({ type: ASSOCIATE_TO_CUSTOMER });
  } catch (error) {
    throw error;
  }
};

export const createOrder = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createOrderService(request);
    dispatch({ type: CREATE_DATA_ORDER });
  } catch (error) {
    throw error;
  }
};

export const closeSolicitudes = (id) => async (dispatch) => {
  await closeServiceSolicitudes(id);
  dispatch({ type: CLOSE_SERVICE_SOLICITUDES, payload: id });
};

export const createSolicitudesAnonymous = (tenant, data) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createServiceSolicitudesAnonymous(tenant, data);
    dispatch({ type: CREATE_SOLICITUDES_SERVICE });
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
export const createSolicitudesCustomer = (data) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const payload = await createServiceSolicitudesCustomer(data);
    dispatch({ type: CUSTOMER_CREATE_SOLICITUDES_SERVICE });
    return payload;
  } catch (error) {
    throw error;
  }
};
