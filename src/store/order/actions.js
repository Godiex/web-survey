// eslint-disable-next-line import/prefer-default-export
import {
  // eslint-disable-next-line import/named
  assignUserOrderService,
  cancelledOrderService,
  getOrderServices,
  assigDateToVisit,
} from "../../services/Order/OrderService";
// eslint-disable-next-line import/named
import { ASSIGN_ORDER, CANCELLED_ORDER, SET_DATA_ORDER, ASSIGN_DATE_TO_VISIT } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getOrders = (request) => async (dispatch) => {
  const data = await getOrderServices(request);
  dispatch({ type: SET_DATA_ORDER, payload: data });
};

export const cancelledOrder = (id, data) => async (dispatch) => {
  await cancelledOrderService(id, data);
  dispatch({ type: CANCELLED_ORDER, payload: id });
};

export const assignUserOrder = (id, data) => async (dispatch) => {
  await assignUserOrderService(id, data);
  dispatch({ type: ASSIGN_ORDER, payload: [] });
};
export const assignVisitdate = (id, data) => async (dispatch) => {
  const { status } = await assigDateToVisit(id, data);
  if (status === undefined)
    dispatch({ type: ASSIGN_DATE_TO_VISIT, payload: { id, visitDate: data.visitDate } });
  return status === undefined;
};
