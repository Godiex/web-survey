import {
  // eslint-disable-next-line import/named
  ACTIVATE_COMPANY,
  CREATE_DATA_COMPANY,
  // eslint-disable-next-line import/named
  DEACTIVATE_COMPANY,
  SET_DATA_COMPANY,
  SET_DATA_TENANT,
  UPDATE_DATA_COMPANY,
  SET_DATA_DETAIL_TENANT,
  UPDATE_CONFIG_APP_TENANT,
} from "./types";
import { RESET_STATES } from "../allStorages/types";

const getTenantConfig = () => {
  const itensInSessionStorage = sessionStorage.getItem("appConfic");
  const itemsDefault = {
    logoUrl: null,
    primaryColor: "#272729",
    secondaryColor: "#1A73E8",
    tertiaryColor: "#96BE1F",
  };
  return itensInSessionStorage ? JSON.parse(itensInSessionStorage) : itemsDefault;
};

export const COMPANY_INITIAL_STATE = {
  data: [],
  dataTenants: [],
  tenantConfig: getTenantConfig(),
  tenantCoordinates: {},
  currentTenant: "",
};

export const company = (state = COMPANY_INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_DATA_COMPANY:
      return { ...state, data: action.payload };
    case SET_DATA_TENANT:
      return { ...state, dataTenants: action.payload };
    case CREATE_DATA_COMPANY:
      return { ...state, data: [...state.data] };
    case UPDATE_DATA_COMPANY:
      return { ...state, data: [...state.data] };
    case ACTIVATE_COMPANY:
      return { ...state, data: [...state.data] };
    case DEACTIVATE_COMPANY:
      return { ...state, data: [...state.data] };
    case SET_DATA_DETAIL_TENANT:
      return {
        ...state,
        tenantConfig: action.payload.applicationSettings,
        tenantCoordinates: action.payload.geographicalCoordinates,
        currentTenant: action.payload.id,
      };
    case UPDATE_CONFIG_APP_TENANT:
      return {
        ...state,
        tenantConfig: action.payload,
      };
    case RESET_STATES:
      return COMPANY_INITIAL_STATE;
    default:
      return state;
  }
};
