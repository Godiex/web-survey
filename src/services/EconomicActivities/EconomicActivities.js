import httpRequest from "../httpRequest";

export const getEconomicActivitiesService = async () => {
  try {
    return await httpRequest.getEntries("economicactivities");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getEconomicActivitiesByCode = async (code) => {
  try {
    return await httpRequest.getEntry("economicactivities", code);
  } catch (error) {
    return JSON.parse(error);
  }
};
