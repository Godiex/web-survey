import { CHANGE_LOADING_PROFILE_PASSWORD, SET_DATA_PROFILE, UPDATE_DATA_PROFILE } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const PROFILE_INITIAL_STATE = {
  data: {
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    imageUrl: "",
    deleteCurrentImage: true,
    identificationType: "",
    nuip: "",
    address: "",
    area: "",
    position: "",
  },
  loadingPassword: false,
};

export const profile = (state = PROFILE_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_PROFILE:
      return { ...state, data: action.payload };
    case UPDATE_DATA_PROFILE:
      return { ...state, data: { ...state.data } };
    case CHANGE_LOADING_PROFILE_PASSWORD:
      return { ...state, loadingPassword: action.payload };
    case RESET_STATES:
      return PROFILE_INITIAL_STATE;
    default:
      return state;
  }
};
