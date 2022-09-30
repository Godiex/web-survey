import { SET_DATA_CERTIFICATES } from "./types";
import { RESET_STATES } from "../allStorages/types";

export const CERTIFICATE_INITIAL_STATE = {
  dataCertificates: [],
  totalCount: 5,
};

export const certificate = (state = CERTIFICATE_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_CERTIFICATES:
      return {
        ...state,
        dataCertificates: action.payload.data,
        totalCount: action.payload.totalCount,
      };
    case RESET_STATES:
      return CERTIFICATE_INITIAL_STATE;
    default:
      return state;
  }
};
