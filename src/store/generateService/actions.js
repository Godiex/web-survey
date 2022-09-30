import {
  activateService,
  createService,
  desActivateService,
  generateServices,
  // eslint-disable-next-line import/named
  getAllService,
  // eslint-disable-next-line import/named
  getServiceWithoutTokenService,
  updateService,
  getSearchService,
} from "../../services/GenerateServices/GenerateService";
import {
  ACTIVATE_SERVICE_TYPES,
  CREATE_SERVICE_TYPES,
  DES_ACTIVATE_SERVICE_TYPES,
  // eslint-disable-next-line import/named
  RESET_SERVICE_WITHOUT_TOKEN_TYPES,
  SET_DATA_SERVICE_TYPES,
  // eslint-disable-next-line import/named
  SET_DATA_SERVICE_WITHOUT_TOKEN_TYPES,
  // eslint-disable-next-line import/named
  SET_DIALOG_TYPES,
  UPDATE_SERVICE_TYPES,
  GET_SERVICE_BY_TENANT,
} from "./types";

export const getAllSolicitudes = () => (dispatch) => {
  const data = getAllService();
  dispatch({ type: "GET_ALL_SERVICE", payload: data });
};
export const filterServices = (filter) => async (dispatch) => {
  const { data } = await getSearchService(filter);
  dispatch({ type: GET_SERVICE_BY_TENANT });
  return data;
};

export const getServices = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await generateServices(request);
    dispatch({ type: SET_DATA_SERVICE_TYPES, payload: data });
  } catch (error) {
    throw error;
  }
};

export const postService = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createService(request);
    dispatch({ type: CREATE_SERVICE_TYPES });
  } catch (error) {
    throw error;
  }
};

export const putService = (request, id) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await updateService(request, id);
    dispatch({ type: UPDATE_SERVICE_TYPES, payload: [] });
  } catch (error) {
    throw error;
  }
};

export const activateServiceAction = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await activateService(request);
    dispatch({ type: ACTIVATE_SERVICE_TYPES, payload: [] });
  } catch (error) {
    throw error;
  }
};

export const desActivateServiceAction = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await desActivateService(request);
    dispatch({ type: DES_ACTIVATE_SERVICE_TYPES, payload: [] });
  } catch (error) {
    throw error;
  }
};

export const setOpenDialogAlert = () => async (dispatch) => {
  dispatch({ type: SET_DIALOG_TYPES, payload: true });
};

export const setCloseOpenAlert = () => async (dispatch) => {
  dispatch({ type: SET_DIALOG_TYPES, payload: false });
};

export const getServiceWithoutToken = (tenant) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await getServiceWithoutTokenService(tenant);
    dispatch({ type: SET_DATA_SERVICE_WITHOUT_TOKEN_TYPES, payload: data.data });
    return data;
  } catch (error) {
    throw error;
  }
};

export const resetServiceWithoutToken = () => (dispatch) => {
  dispatch({ type: RESET_SERVICE_WITHOUT_TOKEN_TYPES, payload: [] });
};
