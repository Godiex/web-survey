// eslint-disable-next-line import/prefer-default-export
import httpRequest from "../httpRequest";

export const serviceRequests = async (request) => {
  try {
    const { data } = await httpRequest.post("servicesolicitudes/search-bystate", request);
    const newData = [];
    // eslint-disable-next-line no-empty,no-restricted-syntax
    for await (const item of data.data) {
      const name = [
        item.name,
        {
          image: item.name !== null ? item.name.charAt(0) : "I",
          color: item.isAnonymous ? "info" : "",
        },
      ];
      newData.push({
        ...item,
        name,
        nameService: item.service.nameService,
      });
    }
    return { ...data, data: newData };
  } catch (error) {
    return JSON.parse(error);
  }
};

export const associateToCustomerService = async (request) => {
  try {
    return await httpRequest.post("servicesolicitudes/customer/associate", request);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const closeServiceSolicitudes = async (id) => {
  try {
    return await httpRequest.post(`servicesolicitudes/${id}/close`);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const createServiceSolicitudesAnonymous = async (tenant, data) => {
  try {
    return await httpRequest.post(`servicesolicitudes/anonymus/create`, data, {
      headers: { tenant },
    });
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const searchByCustomer = async (filter) => {
  try {
    const { data } = await httpRequest.post(`servicesolicitudes/search/bycustomer`, filter);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const cancelServiceSolicitudes = async (id, dataSolicitud) => {
  try {
    const { data } = await httpRequest.post(`servicesolicitudes/${id}/cancel`, dataSolicitud);
    return data;
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
export const createServiceSolicitudesCustomer = async (data) => {
  try {
    return await httpRequest.post(`servicesolicitudes/customer/create`, data);
  } catch (error) {
    return JSON.parse(error);
  }
};
