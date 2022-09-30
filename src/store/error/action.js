import { SET_MESSAGE_ERROR } from "./type";

// eslint-disable-next-line import/prefer-default-export
export const setErrorMessage = (message) => async (dispatch) => {
  dispatch({ type: SET_MESSAGE_ERROR, payload: message });
};
