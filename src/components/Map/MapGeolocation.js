import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { connection } from "../../services/webWorkers/RealTimeClients";

const Map = ({ customers = [], hiddenDetail, handleShowDetail, filter, zoomtwo }) => {
  const [employees, setEmployees] = useState([]);
  const position = useSelector(({ map }) => map.location);
  const isMarkerShown = useSelector(({ map }) => map.isMarkerShown);
  const [showDetail, setShowDetail] = useState(false);
  const direction = useSelector(({ map }) => map.directionString);
  const zoom = useSelector(({ map }) => map.zoom);
  const [connectionWS, setConnectionWS] = useState(null);

  const addUbication = (data, fullData) => {
    const employeesFilters = employees.filter((item) => item.userId !== fullData.userId);
    setEmployees([
      ...employeesFilters,
      {
        id: fullData.userId,
        coordinates: {
          lng: parseFloat(fullData.geographicalCoordinates.longitude),
          lat: parseFloat(fullData.geographicalCoordinates.latitude),
        },
      },
    ]);
  };
  // "NotificationFromServer"

  const handledHiddenDetail = (m) => {
    if (m) {
      hiddenDetail(m);
    }
  };
  const handledShowDetail = (m) => {
    if (m) {
      handleShowDetail(m);
    }
  };

  useEffect(() => {
    const newConnection = connection;
    setConnectionWS(newConnection);
  }, []);

  useEffect(() => {
    if (connectionWS) {
      connectionWS
        .start()
        .then(() => {
          connectionWS.on("NotificationFromServer", (data, fullData) =>
            addUbication(data, fullData)
          );
        }) // eslint-disable-next-line no-console
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connectionWS]);

  return (
    <GoogleMap
      center={position || { lat: 4.703174, lng: -73.706568 }}
      zoom={!zoomtwo ? zoom : zoomtwo}
    >
      {isMarkerShown && (
        <Marker onClick={() => setShowDetail(true)} position={position}>
          {showDetail ? (
            <InfoWindow
              onCloseClick={() => {
                setShowDetail(false);
              }}
            >
              <Typography>{direction}</Typography>
            </InfoWindow>
          ) : null}
        </Marker>
      )}
      {filter !== 1 &&
        employees.map((r) => (
          <Marker
            key={r.id}
            position={r.coordinates}
            icon={{
              url: "https://cdn.aidcol.com/docs/empresa-02.png",
            }}
          />
        ))}
      {filter !== 1 &&
        customers.map((m) => (
          <Marker
            key={m.id}
            position={m.coordinates}
            title={m.name.value}
            onClick={() => handledShowDetail(m)}
            icon={{
              url: "https://cdn.aidcol.com/docs/empresa-02.png",
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
        ))}
    </GoogleMap>
  );
};

Map.defaultProps = {
  customers: [],
  hiddenDetail: () => {},
  handleShowDetail: () => {},
  filter: null,
  zoomtwo: null,
};

Map.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  hiddenDetail: PropTypes.func,
  handleShowDetail: PropTypes.func,
  filter: PropTypes.number,
  zoomtwo: PropTypes.number,
};

export default withScriptjs(withGoogleMap(Map));
