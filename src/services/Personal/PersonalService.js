import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const getPersonalProfile = async () => {
  try {
    const user = await httpRequest.getEntries("personal/profile");
    delete user.isActive;
    delete user.emailConfirmed;
    return user;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const updateProfileService = async (request) => {
  try {
    return await httpRequest.put("personal/profile", request);
  } catch (error) {
    return JSON.parse(error);
  }
};

export const updateImageProfileService = async (request) => {
  try {
    await httpRequest.put("personal/profile", request);
    return true;
  } catch (error) {
    return JSON.parse(error);
  }
};

export const updatePasswordService = async (request) => {
  try {
    return await httpRequest.update("personal/change-password", "", request);
  } catch (error) {
    return JSON.parse(error);
  }
};
