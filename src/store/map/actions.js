export const setGeometryLocations =
  (locations, directionString, zoom = 6) =>
  (dispatch) => {
    dispatch({ type: "setGeometryLocations", payload: { locations, directionString, zoom } });
  };

export const setCenterMap =
  (locations, zoom = 8) =>
  (dispatch) => {
    dispatch({ type: "CENTER_MAP", payload: { locations, zoom } });
  };

export const setGeometryLocationsInitial = (isMarkerShown) => (dispatch) => {
  dispatch({ type: "setGeometryLocationsInitial", payload: isMarkerShown });
};

export const handleOpenDialogFullScreen = (open) => (dispatch) => {
  dispatch({ type: "setOpenDialogFullScreen", payload: open });
};
