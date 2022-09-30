import { CHANGE_LOADING_PROFILE_PASSWORD, SET_DATA_PROFILE, UPDATE_DATA_PROFILE } from "./types";
import {
  getPersonalProfile,
  updateImageProfileService,
  updatePasswordService,
  updateProfileService,
} from "../../services/Personal/PersonalService";

export const getProfile = () => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getPersonalProfile();
    dispatch({ type: SET_DATA_PROFILE, payload: data });
  } catch (error) {
    throw error;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const updateProfile = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await updateProfileService(request);
    await dispatch(getProfile());
    dispatch({ type: UPDATE_DATA_PROFILE });
  } catch (error) {
    throw error;
  }
};

export const updateImageProfile = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await updateImageProfileService(request);
    await dispatch(getProfile());
    dispatch({ type: UPDATE_DATA_PROFILE });
  } catch (error) {
    throw error;
  }
};

export const updatePassword = (request, callback) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await dispatch({ type: CHANGE_LOADING_PROFILE_PASSWORD, payload: true });
    await updatePasswordService(request);
    await callback();
    dispatch({ type: CHANGE_LOADING_PROFILE_PASSWORD, payload: false });
  } catch (error) {
    dispatch({ type: CHANGE_LOADING_PROFILE_PASSWORD, payload: false });
    throw error;
  }
};
