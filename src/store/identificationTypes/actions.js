// eslint-disable-next-line import/named
import {
  getTypeIdentificationByCode,
  getTypeIdentificationService,
} from "../../services/IdentificationTypes/IdentificationTypes";
import { SET_DATA_IDENTIFICATION_CODE_TYPES, SET_DATA_IDENTIFICATION_TYPES } from "./types";

export const getIdentificationTypes = () => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getTypeIdentificationService();
    await dispatch({ type: SET_DATA_IDENTIFICATION_TYPES, payload: data });
  } catch (error) {
    throw error;
  }
};

export const getIdentificationTypesCode = (code) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getTypeIdentificationByCode(code);
    await dispatch({ type: SET_DATA_IDENTIFICATION_CODE_TYPES, payload: data });
  } catch (error) {
    throw error;
  }
};
