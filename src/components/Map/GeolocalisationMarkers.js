import React, { useState } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import LoadingMap from "./LoadingMap";

const GeolocalisationMarkers = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2my9oiT7J893l33umJHfS0zkhZzl5Qis&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <LoadingMap />,
    containerElement: <div style={{ height: `600px`, width: "400px" }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({ data = [], customers = [], hiddenDetail, handleShowDetail }) => {
  const [showDetail, setShowDetail] = useState(false);

  const handledHiddenDetail = (m) => {
    if (m) {
      hiddenDetail(m);
    } else setShowDetail(false);
  };
  const handledShowDetail = (m) => {
    if (m) {
      handleShowDetail(m);
    } else setShowDetail(true);
  };
  const position = useSelector(({ map }) => map.location);
  const direction = useSelector(({ map }) => map.directionString);
  const isMarkerShown = useSelector(({ map }) => map.isMarkerShown);
  const zoom = useSelector(({ map }) => map.zoom);

  return (
    <GoogleMap center={position || { lat: 4.703174, lng: -73.706568 }} zoom={zoom}>
      {isMarkerShown && (
        <Marker onClick={() => handledShowDetail()} position={position}>
          {showDetail ? (
            <InfoWindow
              onCloseClick={() => {
                handledHiddenDetail();
              }}
            >
              <Typography>{direction}</Typography>
            </InfoWindow>
          ) : null}
        </Marker>
      )}
      {data.map((r) => (
        <Marker
          position={{
            lat: r.geographicalCoordinates.latitude,
            lng: r.geographicalCoordinates.longitude,
          }}
        />
      ))}
      {customers.map((m) => {
        // eslint-disable-next-line no-console
        console.log({ m });
        return (
          <Marker
            key={m.id}
            position={m.coordinates}
            opacity={0.7}
            title={m.name.value}
            onClick={() => handledShowDetail(m)}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          >
            {m.showDetail === true ? (
              <InfoWindow
                onCloseClick={() => {
                  handledHiddenDetail(m);
                }}
              >
                <Typography>{`Cliente: ${m.name.value}`}</Typography>
              </InfoWindow>
            ) : null}
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default GeolocalisationMarkers;
