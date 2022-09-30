// eslint-disable-next-line import/named
import {
  getAllNotificationsByUser,
  getAllNotificationsBytenant,
  switchStateNotificationByTenant,
  switchStateNotification,
} from "../../services/notifications/notificationsServices";
import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_BY_TENANT,
  SWITCH_BOOLEAN_GET_NOTIFICATION,
  SWITCH_STATE_NOTIFICATION,
  SWITCH_STATE_NOTIFICATION_BY_TENANT,
  UPDATE_DATA_PAYMENTS,
  UPDATE_COUNT_NOTIFICATIONS,
} from "./types";

// eslint-disable-next-line import/prefer-default-export
export const getNotificationsByUser = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await getAllNotificationsByUser(filter);
    await dispatch({ type: SET_NOTIFICATIONS, payload: data });
    await dispatch({ type: UPDATE_COUNT_NOTIFICATIONS });
  } catch (error) {
    throw error;
  }
};
export const getNotificationsByTenant = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await getAllNotificationsBytenant(filter);
    await dispatch({ type: SET_NOTIFICATION_BY_TENANT, payload: data });
    await dispatch({ type: UPDATE_COUNT_NOTIFICATIONS });
  } catch (error) {
    throw error;
  }
};
export const chageStateNotification = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (filter.usersNotificationsId.length !== 0) {
      await switchStateNotification(filter);
      await dispatch({ type: SWITCH_STATE_NOTIFICATION, payload: filter.usersNotificationsId });
    }
  } catch (error) {
    throw error;
  }
};
export const changeStateNotificationByTenant = (filter) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    if (filter.tenantUserNotificationsId.length !== 0) {
      await switchStateNotificationByTenant(filter);
      await dispatch({
        type: SWITCH_STATE_NOTIFICATION_BY_TENANT,
        payload: filter.tenantUserNotificationsId,
      });
    }
  } catch (error) {
    throw error;
  }
};
export const addNewNotification = (notification) => (dispatch) => {
  dispatch({ type: ADD_NOTIFICATION, payload: notification });
};
export const switchBooleanGetNotification = (notification) => (dispatch) => {
  dispatch({ type: SWITCH_BOOLEAN_GET_NOTIFICATION, payload: notification });
};

export const updateDatabyNotification = (data) => (dispatch) => {
  if (data.paymentStatus && data.isPaid) dispatch({ type: UPDATE_DATA_PAYMENTS, payload: data });
};
