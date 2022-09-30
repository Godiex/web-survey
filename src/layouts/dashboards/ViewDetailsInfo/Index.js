import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import MDBox from "../../../components/MDBox";

function ViewDetailInfo({ open, onClose, data, dataType }) {
  const [dataPie, setDataPie] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [dataLine, setDataLine] = useState(null);

  const buildPieData = () => {
    const pieData = [
      {
        id: "En progreso",
        value:
          data !== undefined && data !== null
            ? data?.numberServiceOrderByState.amountInProgress
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Pendientes",
        value:
          data !== undefined && data !== null ? data?.numberServiceOrderByState.amountPending : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Canceladas",
        value:
          data !== undefined && data !== null ? data?.numberServiceOrderByState.amountCancelled : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Asignadas",
        value:
          data !== undefined && data !== null ? data?.numberServiceOrderByState.amountAssigned : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Aprobadas",
        value:
          data !== undefined && data !== null
            ? data?.numberServiceOrderByState.amountFinishedApproved
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Rechazadas",
        value:
          data !== undefined && data !== null
            ? data?.numberServiceOrderByState.amountFinishedRejected
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Sin Asignar",
        value:
          data !== undefined && data !== null
            ? data?.numberServiceOrderByState.amountPendingAssignment
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
    ];
    setDataPie(pieData);
  };

  const buildBarData = () => {
    const DataBar = [
      {
        state: "SIP",
        "Solicitudes en Progreso": data.numberServiceSolicitudeByState.amountInProgress,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
      {
        state: "SCA",
        "Solicitudes Canceladas": data.numberServiceSolicitudeByState.amountCanceled,
        "value stateColor": "hsl(173, 70%, 50%)",
      },
      {
        state: "SC",
        "Solicitudes Cerradas": data.numberServiceSolicitudeByState.amountClosed,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
      {
        state: "SP",
        "Solicitudes Pendientes": data.numberServiceSolicitudeByState.amountPending,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
    ];
    setDataChart(DataBar);
  };

  const buildLineData = () => {
    const DataLine = [];
    data?.numbersOfTimesTheyRequestService.forEach((e) => {
      const dataL = {
        Servicio: e.serviceName,
        Valor: e.amount,
        color: "red",
      };
      DataLine.push(dataL);
    });
    setDataLine(DataLine);
  };

  useEffect(() => {
    if (data !== null && data !== undefined) {
      buildPieData();
      buildBarData();
      buildLineData();
    }
  }, []);

  return (
    <>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xl"
        style={{ height: "600px" }}
      >
        <DialogTitle>Detalle</DialogTitle>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#000",
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <DialogContent>
          {dataType === 1 && data !== null ? (
            <>
              <Grid container pl={10} spacing={1} mb={4}>
                <Grid item xs sm={6}>
                  <MDBox mt={10} pr={1} ml={3}>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes en progreso {data?.numberServiceOrderByState.amountInProgress}
                    </p>
                    <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                      Solicitudes pendientes {data?.numberServiceOrderByState.amountPending}
                    </p>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes canceladas {data?.numberServiceOrderByState.amountCancelled}
                    </p>
                    <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                      Solicitudes asignadas {data?.numberServiceOrderByState.amountAssigned}
                    </p>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes sin asignar{" "}
                      {data?.numberServiceOrderByState.amountPendingAssignment}
                    </p>
                    <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                      Solicitudes Aprobadas {data?.numberServiceOrderByState.amountFinishedApproved}
                    </p>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes Rechazadas{" "}
                      {data?.numberServiceOrderByState.amountFinishedRejected}
                    </p>
                    <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                      Total de solicitudes{" "}
                      {data?.numberServiceOrderByState.amountFinishedRejected +
                        data?.numberServiceOrderByState.amountFinishedApproved +
                        data?.numberServiceOrderByState.amountPendingAssignment +
                        data?.numberServiceOrderByState.amountAssigned +
                        data?.numberServiceOrderByState.amountCancelled +
                        data?.numberServiceOrderByState.amountPending +
                        data?.numberServiceOrderByState.amountInProgress}
                    </p>
                  </MDBox>
                </Grid>
                <Grid item xs={6} sm={4} style={{ height: "500px" }}>
                  <ResponsivePie
                    data={dataPie}
                    innerRadius={0.5}
                    padAngle={0.7}
                    margin={{ right: 10, bottom: 80 }}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    enableArcLinkLabels={false}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              {dataType === 2 && data !== null ? (
                <Grid container pl={10} spacing={1} mb={4}>
                  <Grid item xs sm={4}>
                    <MDBox mt={5} mb={1} pr={1} ml={3}>
                      <p style={{ fontSize: "17px", color: "#FF7006" }}>
                        En progreso {data.numberServiceSolicitudeByState.amountInProgress}
                      </p>
                      <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                        Canceladas {data.numberServiceSolicitudeByState.amountCanceled}
                      </p>
                      <p style={{ fontSize: "17px", color: "#FF7006" }}>
                        Cerradas {data.numberServiceSolicitudeByState.amountClosed}
                      </p>
                      <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                        Pendientes {data.numberServiceSolicitudeByState.amountPending}
                      </p>
                      <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                        Total{" "}
                        {data.numberServiceSolicitudeByState.amountInProgress +
                          data.numberServiceSolicitudeByState.amountClosed +
                          data.numberServiceSolicitudeByState.amountCanceled +
                          data.numberServiceSolicitudeByState.amountPending}
                      </p>
                    </MDBox>
                  </Grid>
                  <Grid item xs={5} style={{ height: "250px", width: "300px" }}>
                    <ResponsiveBar
                      data={dataChart}
                      keys={[
                        "Solicitudes en Progreso",
                        "Solicitudes Canceladas",
                        "Solicitudes Cerradas",
                        "Solicitudes Pendientes",
                      ]}
                      indexBy="state"
                      margin={{ top: 5, right: 0, bottom: 20, left: 30 }}
                      valueScale={{ type: "linear" }}
                      indexScale={{ type: "band", round: true }}
                      axisTop={null}
                      axisRight={null}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "country",
                        legendPosition: "middle",
                        legendOffset: 32,
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "food",
                        legendPosition: "middle",
                        legendOffset: -40,
                      }}
                      enableGridY={false}
                      enableLabel={false}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: "color",
                        modifiers: [["darker", 1.6]],
                      }}
                      legends={[]}
                      role="application"
                      ariaLabel="Nivo bar chart demo"
                    />
                  </Grid>
                </Grid>
              ) : (
                <>
                  {dataType === 3 ? (
                    <Grid container pl={10} spacing={1} mb={4}>
                      <Grid item xs={12} style={{ height: "250px", width: "300px" }}>
                        <ResponsiveBar
                          data={dataLine}
                          keys={["Valor"]}
                          indexBy="Servicio"
                          margin={{ top: 5, right: 0, bottom: 20, left: 30 }}
                          valueScale={{ type: "linear" }}
                          indexScale={{ type: "band", round: true }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "country",
                            legendPosition: "middle",
                            legendOffset: 32,
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "food",
                            legendPosition: "middle",
                            legendOffset: -40,
                          }}
                          enableGridY={false}
                          enableLabel={false}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: "color",
                          }}
                          legends={[]}
                          role="application"
                          ariaLabel="Nivo bar chart demo"
                        />
                      </Grid>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

ViewDetailInfo.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.any, PropTypes.any])).isRequired,
  dataType: PropTypes.number.isRequired,
};

export default ViewDetailInfo;
