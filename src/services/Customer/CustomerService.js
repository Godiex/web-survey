import httpRequest from "../httpRequest";
import { getTotalCount, getTotalCountForCustomer, newParams } from "../../utils/utils";

// eslint-disable-next-line import/prefer-default-export
export const getCustomersService = async () => {
  try {
    const { data } = await httpRequest.post("customers/search", newParams);
    return await getTotalCount(data.totalCount, "customers/search");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getCustomersServiceMap = async () => {
  try {
    const { data } = await httpRequest.post("customers/search", newParams);
    const dataMap = await getTotalCountForCustomer(data.totalCount, "customers/search");
    return dataMap.reduce((acc, item) => {
      if (item.geographicalCoordinates && item.geographicalCoordinates.latitude !== "string") {
        acc.push({
          id: item.id,
          coordinates: {
            lat: parseFloat(item.geographicalCoordinates.latitude),
            lng: parseFloat(item.geographicalCoordinates.longitude),
          },
          name: {
            key: "CLIENTE",
            value: item.name,
          },
          address: {
            key: "DIRECCIÓN",
            value: item.address,
          },
          nit: {
            key: item.identificationType,
            value: item.nIdentification,
          },
          showDetail: false,
        });
      }
      return acc;
    }, []);
  } catch (error) {
    return JSON.parse(error);
  }
};
