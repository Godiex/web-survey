import {
  forgotPasswordService,
  getPollstersUsers,
  resetPasswordService,
} from "../../services/Users/UserService";

export const getPollsterUsers = () => async (dispatch) => {
  const data = await getPollstersUsers();
  dispatch({ type: "SET_DATA_POLLSTERS_USERS", payload: data });
};

export const forgotPassword = (email, tenant) => async (dispatch) => {
  await forgotPasswordService(email, tenant);
  dispatch({ type: "RESET_PASSWORD", payload: {} });
};

export const resetPassword = (email, tenant) => async (dispatch) => {
  await resetPasswordService(email, tenant);
  dispatch({ type: "RESET_PASSWORD", payload: {} });
};
