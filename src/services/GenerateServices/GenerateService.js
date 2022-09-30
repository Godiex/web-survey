import httpRequest from "../httpRequest";
import { getTotalCount, paramsRequest } from "../../utils/utils";

export const getAllService = async () => {
  try {
    const { data } = await httpRequest.post("services/search", paramsRequest);
    return await getTotalCount(data.totalCount, "services/search");
  } catch (error) {
    return JSON.parse(error);
  }
};
export const getSearchService = async (filters) => {
  try {
    return await httpRequest.post("services/search", filters);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const generateServices = async (request) => {
  try {
    const { data } = await httpRequest.post("services/search", request);
    const newData = data.data.reduce((acc, item) => {
      acc.push({ ...item });
      return acc;
    }, []);
    return { ...data, data: newData };
  } catch (error) {
    return JSON.parse(error);
  }
};

export const createService = async (request) => {
  try {
    return await httpRequest.post("services/create", request);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const updateService = async (request, id) => {
  try {
    return await httpRequest.update("services", id, request);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const activateService = async (request) => {
  try {
    return await httpRequest.post("services/activate", request);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const desActivateService = async (request) => {
  try {
    return await httpRequest.post("services/desactivate", request);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getServiceWithoutTokenService = async (tenant) => {
  try {
    return await httpRequest.post("services/searchbytenant", paramsRequest, {
      headers: { tenant },
    });
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
