import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const searchCertificates = async (filters) => {
  try {
    const { data } = await httpRequest.post("certificate/search", filters);
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const searchCertificatesByCustomer = async (filters) => {
  try {
    const { data } = await httpRequest.post(
      "certificategenerated/searchbycurrentcustomer",
      filters
    );
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const searchGeneratedCertificates = async (filters) => {
  try {
    const { data } = await httpRequest.post(
      "certificategenerated/searchallgeneratedcertificates",
      filters
    );
    return data;
  } catch (error) {
    return null;
  }
};

export const getBlobCertificate = async (url) => {
  try {
    const data = await httpRequest.getByOtherBaseUrl(url, {
      responseType: "blob",
      headers: { authorization: "" },
    });
    return data;
  } catch (error) {
    return JSON.parse(error);
  }
};
export const sendNotifiToCustomerOfCertificate = async (dataRequest) => {
  try {
    const data = await httpRequest.post("certificategenerated/notify", dataRequest);
    return data;
  } catch (error) {
    const { data } = error;
    throw data;
  }
};
