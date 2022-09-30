import httpRequest from "../httpRequest";

export const getPollstersUsers = async () => {
  try {
    const data = await httpRequest.getEntries("users/pollster");
    return data.reduce((acc, item) => {
      const newObj = { ...item, name: `${item.firstName} ${item.lastName}` };
      acc.push(newObj);
      return acc;
    }, []);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const forgotPasswordService = async (tenant, data) => {
  try {
    await httpRequest.post(`users/forgot-password`, data, { headers: { tenant } });
    return true;
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};

export const resetPasswordService = async (tenant, data) => {
  try {
    await httpRequest.post(`users/reset-password`, data, { headers: { tenant } });
    return true;
  } catch (error) {
    const { dataError } = error;
    throw dataError;
  }
};
