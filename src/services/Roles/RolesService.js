import httpRequest from "../httpRequest";

// eslint-disable-next-line import/prefer-default-export
export const getRolesService = async () => {
  try {
    return await httpRequest.getEntries(`roles`);
  } catch (error) {
    return JSON.parse(error);
  }
};
