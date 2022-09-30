import httpRequest from "../httpRequest";

export const createOrderService = async (request) => {
  try {
    return await httpRequest.post("serviceorder/create", request);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const getOrderServices = async (request) => {
  try {
    const { data } = await httpRequest.post("serviceorder/search", request);
    const newData = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of data.data) {
      const customerDataName = [
        item.customer.name,
        {
          image: "",
          color: "dark",
        },
      ];
      const serviceDataName = [
        item.service.nameService,
        {
          image: item.service.nameService !== null ? item.service.nameService.charAt(0) : "I",
          color: "info",
        },
      ];
      newData.push({
        ...item,
        customerName: customerDataName,
        serviceName: serviceDataName,
        userName: item.user
          ? `${item.user.firstName} ${item.user.lastName}`
          : "No tiene usuario asignado",
        cancelled: item.orderStatus,
      });
    }
    return { ...data, data: newData };
  } catch (error) {
    return { data: [] };
  }
};

export const cancelledOrderService = async (id, data) => {
  try {
    return await httpRequest.post(`serviceorder/${id}/cancel`, data);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const assignUserOrderService = async (id, data) => {
  try {
    return await httpRequest.post(`serviceorder/${id}/assignuser`, data);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
export const assigDateToVisit = async (id, data) => {
  try {
    return await httpRequest.put(`serviceorder/${id}/assignvisitdate`, data);
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
