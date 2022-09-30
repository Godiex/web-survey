// eslint-disable-next-line import/named
import {
  activateTenantService,
  createCompanyService,
  deactivateTenantService,
  getCompanyService,
  getTenantsWithoutTokenService,
  updateCompanyService,
  getDetailTenant,
  updateAppSetting,
} from "../../services/Tenant/CompanyService";
import {
  // eslint-disable-next-line import/named
  ACTIVATE_COMPANY,
  CREATE_DATA_COMPANY,
  // eslint-disable-next-line import/named
  DEACTIVATE_COMPANY,
  SET_DATA_COMPANY,
  SET_DATA_TENANT,
  UPDATE_DATA_COMPANY,
  SET_DATA_DETAIL_TENANT,
  UPDATE_CONFIG_APP_TENANT,
} from "./types";

export const getCompany = () => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getCompanyService();
    await dispatch({ type: SET_DATA_COMPANY, payload: data });
  } catch (error) {
    throw error;
  }
};

export const createCompany = (request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await createCompanyService(request);
    await dispatch(getCompany());
    dispatch({ type: CREATE_DATA_COMPANY });
  } catch (error) {
    throw error;
  }
};

export const updateCompany = (tenantId, request) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await updateCompanyService(tenantId, request);
    await dispatch(getCompany());
    dispatch({ type: UPDATE_DATA_COMPANY });
  } catch (error) {
    throw error;
  }
};

export const activateTenant = (tenantId) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await activateTenantService(tenantId);
    dispatch(getCompany());
    await dispatch({ type: ACTIVATE_COMPANY });
  } catch (error) {
    throw error;
  }
};

export const deactivateTenant = (tenantId) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await deactivateTenantService(tenantId);
    dispatch(getCompany());
    await dispatch({ type: DEACTIVATE_COMPANY });
  } catch (error) {
    throw error;
  }
};

export const getTenantsWithoutToken = () => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getTenantsWithoutTokenService();
    await dispatch({ type: SET_DATA_TENANT, payload: data });
  } catch (error) {
    throw error;
  }
};
export const getDetailTenantById = (tenantId) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await getDetailTenant(tenantId);
    localStorage.setItem("idTenant", data.id);
    sessionStorage.setItem("appConfic", JSON.stringify(data.applicationSettings));
    await dispatch({ type: SET_DATA_DETAIL_TENANT, payload: data });
  } catch (error) {
    throw error;
  }
};
export const changeAppSetting = (tenantId, dataRequest) => async (dispatch) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newData = await updateAppSetting(tenantId, dataRequest);
    const statusResponse = !!newData.StatusCode || !!newData.status;
    if (!statusResponse) {
      sessionStorage.setItem("appConfic", JSON.stringify(newData));
      await dispatch({ type: UPDATE_CONFIG_APP_TENANT, payload: newData });
    }
    return !statusResponse;
  } catch (error) {
    throw error;
  }
};
