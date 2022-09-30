import { RESET_STATES } from "../allStorages/types";

export const MAP_INITIAL_STATE = {
  data: [],
  location: { lat: 4.703174, lng: -73.706568 },
  directionString: "",
  isMarkerShown: false,
  openMapFullScreen: false,
  zoom: 6,
};

export const map = (state = MAP_INITIAL_STATE, action) => {
  switch (action.type) {
    case "setGeometryLocations":
      return {
        ...state,
        location: action.payload.locations,
        directionString: action.payload.directionString,
        zoom: action.payload.zoom,
        isMarkerShown: true,
      };
    case "CENTER_MAP":
      return { ...state, location: action.payload.locations, zoom: action.payload.zoom };
    case "setGeometryLocationsInitial":
      return {
        ...state,
        isMarkerShown: action.payload,
        location: { lat: 4.703174, lng: -73.706568 },
        directionString: "",
        zoom: 6,
      };
    case "setOpenDialogFullScreen":
      return { ...state, openMapFullScreen: action.payload };
    case RESET_STATES:
      return MAP_INITIAL_STATE;
    default:
      return state;
  }
};
