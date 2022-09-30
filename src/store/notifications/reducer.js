import {
  SET_NOTIFICATIONS,
  ADD_NOTIFICATION,
  SET_NOTIFICATION_BY_TENANT,
  SWITCH_BOOLEAN_GET_NOTIFICATION,
  SWITCH_STATE_NOTIFICATION,
  SWITCH_STATE_NOTIFICATION_BY_TENANT,
  UPDATE_COUNT_NOTIFICATIONS,
} from "./types";

import { RESET_STATES } from "../allStorages/types";

export const NOTIFICATIONS_INITIAL_STATE = {
  notifications: [],
  notificationsByTenat: [],
  countUnseenNotificationsByTenat: 0,
  countUnseenNotificationsByuser: 0,
  countUnseenNotifications: 0,
  isFirstGet: true,
  hasMoreByUser: false,
  hasMoreByTenant: false,
};

export const notifications = (state = NOTIFICATIONS_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS: {
      return {
        ...state,
        countUnseenNotificationsByuser: action.payload.amountNotificationNotViewed,
        notifications: [...state.notifications, ...action.payload.paginationResponse.data],
        hasMoreByUser: action.payload.paginationResponse.hasNextPage,
      };
    }
    case ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
        countUnseenNotifications: state.countUnseenNotifications + 1,
      };
    }
    case SET_NOTIFICATION_BY_TENANT: {
      return {
        ...state,
        countUnseenNotificationsByTenat: action.payload.amountNotificationNotViewed,
        notificationsByTenat: [
          ...state.notificationsByTenat,
          ...action.payload.paginationResponse.data,
        ],
        hasMoreByTenant: action.payload.paginationResponse.hasNextPage,
      };
    }
    case SWITCH_BOOLEAN_GET_NOTIFICATION: {
      return {
        ...state,
        isFirstGet: false,
      };
    }
    case SWITCH_STATE_NOTIFICATION: {
      const listNotications = state.notifications.map((notification) => {
        const iten = action.payload.find((id) => id === notification.id);
        return iten ? { ...notification, viewed: true } : notification;
      });
      return {
        ...state,
        notifications: listNotications,
        countUnseenNotifications: 0,
      };
    }
    case SWITCH_STATE_NOTIFICATION_BY_TENANT: {
      const listNotications = state.notificationsByTenat.map((notification) => {
        const iten = action.payload.find((id) => id === notification.id);
        return iten ? { ...notification, viewed: true } : notification;
      });
      return {
        ...state,
        notificationsByTenat: listNotications,
        countUnseenNotifications: 0,
      };
    }
    case UPDATE_COUNT_NOTIFICATIONS: {
      return {
        ...state,
        countUnseenNotifications:
          state.countUnseenNotificationsByTenat + state.countUnseenNotificationsByuser,
      };
    }
    case RESET_STATES:
      return NOTIFICATIONS_INITIAL_STATE;
    default: {
      return state;
    }
  }
};
