import { getRolesService } from "../../services/Roles/RolesService";

// eslint-disable-next-line import/prefer-default-export
export const getRolesAction = () => async (dispatch) => {
  const data = await getRolesService();
  dispatch({ type: "SET_DATA_ROLES", payload: data });
};
