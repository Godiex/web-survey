import qs from "querystring";
import httpRequest from "../httpRequest";

export const getCompanyService = async () => {
  try {
    return await httpRequest.getEntries("tenants");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getCompanyService2 = async (params) => {
  try {
    let query = qs.stringify(params ? { ...params } : undefined);
    query = params ? `?${query}` : "";
    // eslint-disable-next-line no-console
    console.log(query);
    // return await httpRequest.getEntries("tenants");
    return true;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const createCompanyService = async (request) => {
  try {
    return await httpRequest.post("tenants", request, {});
  } catch (error) {
    return JSON.parse(error);
  }
};

export const updateCompanyService = async (tenantId, request) => {
  try {
    return await httpRequest.put(`tenants/${tenantId}/update`, request);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const activateTenantService = async (tenantId) => {
  try {
    return await httpRequest.post(`tenants/${tenantId}/activate`);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const deactivateTenantService = async (tenantId) => {
  try {
    return await httpRequest.post(`tenants/${tenantId}/deactivate`);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getTenantsWithoutTokenService = async () => {
  try {
    return await httpRequest.getEntries("tenants/basictenantinfo");
  } catch (error) {
    return JSON.parse(error);
  }
};
export const getDetailTenant = async (idTenant) => {
  try {
    return await httpRequest.get(`tenants/${idTenant}`);
  } catch (error) {
    return JSON.parse(error);
  }
};
export const updateAppSetting = async (idTenant, dataRequest) => {
  try {
    return await httpRequest.put(`tenants/${idTenant}/updateapplicationsettings`, dataRequest);
  } catch (error) {
    return JSON.parse(error);
  }
};
