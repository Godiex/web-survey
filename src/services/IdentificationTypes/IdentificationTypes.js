import httpRequest from "../httpRequest";

export const getTypeIdentificationService = async () => {
  try {
    return await httpRequest.getEntries("identificationtypes");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const getTypeIdentificationByCode = async (code) => {
  try {
    return await httpRequest.getEntry("identificationtypes", code);
  } catch (error) {
    return JSON.parse(error);
  }
};
