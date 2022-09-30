import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const getDataDashboard = async () => {
  try {
    const res = await httpRequest.get("dashboard");
    return res;
  } catch (error) {
    return JSON.parse(error);
  }
};
