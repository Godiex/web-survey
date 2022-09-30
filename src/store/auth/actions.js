import {
  AUTH_USER,
  LOGOUT_USER,
  RESET_USER_DATA,
  SET_USER_DATA,
  SET_WAIT_AUTH_CHECK,
  SET_PERMISSIONS,
} from "./types";
import { RESET_STATES } from "../allStorages/types";
import {
  getUserProfile,
  signInWithUserAndPassword,
  // eslint-disable-next-line import/named
  logoutService,
  getPermissionsUser,
} from "../../services/Auth/AuthService";

export const loginWithToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
      user = await getUserProfile();
      dispatch({ type: SET_USER_DATA, payload: user });
    }
    dispatch({ type: SET_WAIT_AUTH_CHECK, payload: false });
    return user;
  } catch (e) {
    if (!!e.statusCode && e.statusCode !== 401)
      dispatch({ type: SET_WAIT_AUTH_CHECK, payload: false });
    throw e;
  }
};

export const getPermissionsUserAction = () => async (dispatch) => {
  const tokenLocal = localStorage.getItem("token");
  if (tokenLocal) {
    const permissions = await getPermissionsUser();
    sessionStorage.setItem("permissions", permissions);
    dispatch({ type: SET_PERMISSIONS, payload: permissions });
  }
};

// eslint-disable-next-line import/prefer-default-export
export const login = (email, password, tenant) => async (dispatch) => {
  const user = await signInWithUserAndPassword(email, password, tenant);
  dispatch({ type: AUTH_USER, payload: user.token });
};

export const logout = () => async (dispatch) => {
  await logoutService();
  dispatch({ type: LOGOUT_USER });
  dispatch({ type: RESET_USER_DATA });
  dispatch({ type: SET_WAIT_AUTH_CHECK, payload: false });
  dispatch({ type: RESET_STATES });
};
