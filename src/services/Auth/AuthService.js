import httpRequest from "../httpRequest";

const setValue = (name, value) => {
  localStorage.setItem(name, value);
};

// eslint-disable-next-line import/prefer-default-export
export const signInWithUserAndPassword = async (email, password, tenant) => {
  try {
    const { data } = await httpRequest.post("tokens", { email, password }, { headers: { tenant } });
    setValue("token", data.token);
    setValue("refresh", data.refreshToken);
    setValue("isRefresh", "false");
    return data;
  } catch (error) {
    const { data } = error;
    throw data;
  }
};

// eslint-disable-next-line consistent-return
export const getUserProfile = async () => {
  try {
    return await httpRequest.getEntries("personal/profile");
  } catch (error) {
    return JSON.parse(error);
  }
};

// eslint-disable-next-line consistent-return
export const getPermissionsUser = async () => {
  try {
    return await httpRequest.getEntries("personal/permissions");
  } catch (error) {
    return JSON.parse(error);
  }
};

export const logoutService = async () => {
  localStorage.clear();
  sessionStorage.clear();
  return {};
};
