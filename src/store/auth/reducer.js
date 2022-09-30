import {
  AUTH_USER,
  CHANGE_REFRESH,
  LOGOUT_USER,
  RESET_USER_DATA,
  SET_USER_DATA,
  SET_WAIT_AUTH_CHECK,
  SET_PERMISSIONS,
} from "./types";

import { RESET_STATES } from "../allStorages/types";

const initialUser = {
  id: "",
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  isActive: true,
  emailConfirmed: true,
  phoneNumber: "",
  imageUrl: "",
  identificationType: "",
  nuip: "",
  address: "",
  area: "",
  position: "",
  userType: "",
};

export const AUTH_INITIAL_STATE = {
  user: initialUser,
  login: {
    authenticated: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    errorMessage: "",
    isRefresh: JSON.parse(localStorage.getItem("isRefresh") || "false"),
  },
  waitAuthCheck: true,
  defaultLocation: { lat: 4.703174, lng: -73.706568 },
  defaultZoom: 6,
  permissions: [],
};

export const auth = (prevState = AUTH_INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...prevState, login: { ...prevState.login, authenticated: action.payload } };
    case SET_USER_DATA:
      return { ...prevState, user: { ...action.payload } };
    case CHANGE_REFRESH:
      return { ...prevState, login: { ...prevState.login, isRefresh: action.payload } };
    case SET_WAIT_AUTH_CHECK:
      return { ...prevState, waitAuthCheck: action.payload };
    case LOGOUT_USER:
      return {
        ...AUTH_INITIAL_STATE,
        login: { ...AUTH_INITIAL_STATE.login, authenticated: "", isRefresh: false },
      };
    case RESET_USER_DATA:
      return { ...prevState, user: initialUser };
    case SET_PERMISSIONS:
      return { ...prevState, permissions: action.payload };
    case RESET_STATES:
      return AUTH_INITIAL_STATE;
    default:
      return prevState;
  }
};
