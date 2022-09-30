// eslint-disable-next-line import/prefer-default-export
import { RESET_STATES } from "./types";

// eslint-disable-next-line import/prefer-default-export
export const resetStates = () => async (dispatch) => {
  dispatch({ type: RESET_STATES });
};
