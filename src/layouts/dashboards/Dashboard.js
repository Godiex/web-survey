import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import ViewDetailInfo from "./ViewDetailsInfo/Index";
import Map from "../../components/Map/MapGeolocation";
import LoadingMap from "../../components/Map/LoadingMap";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import { getCustomersServiceMap } from "../../services/Customer/CustomerService";
import { getDataDashboard } from "../../services/dashboard/DashboardService";
// eslint-disable-next-line import/named
import { URL_MAP } from "../../utils/utils";
// eslint-disable-next-line import/named
import { getPersonalProfile } from "../../services/Personal/PersonalService";
// eslint-disable-next-line import/named
import { setCenterMap } from "../../store/map/actions";
import logo from "../../assets/images/logos/lista_usuarios.png";
import solicitudes from "../../assets/images/logos/solicitudes_pendientes.png";
import gestion from "../../assets/images/logos/gestion.png";
import encuestasGeneradas from "../../assets/images/logos/encuestas-generadas.png";
import agregarEncuestas from "../../assets/images/logos/agregar-encuestas.png";

const options = ["Mostrar solo los clientes", "Mostrar solo los empleados"];

const Dashboard = () => {
  const [menu, setMenu] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [dataMap, setDataMap] = useState([]);
  const [dataDashboard, setDataDashboard] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [dataLine, setDataLine] = useState(null);
  const [openInfoDetails, setOpenInfoDetails] = useState(false);
  const [dataType, setDataType] = useState(0);
  const matches = useMediaQuery("(min-width:1030px)");
  const matchesPie = useMediaQuery("(min-width:663px)");
  const handleCloseViewDetails = () => setOpenInfoDetails(false);

  const dispatch = useDispatch();

  const buildPieData = () => {
    const pieData = [
      {
        id: "En progreso",
        value:
          dataDashboard !== undefined && dataDashboard !== null
            ? dataDashboard?.numberServiceOrderByState.amountInProgress
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Pendientes",
        value:
          dataDashboard !== undefined && dataDashboard !== null
            ? dataDashboard?.numberServiceOrderByState.amountPending
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Canceladas",
        value:
          dataDashboard !== undefined && dataDashboard !== null
            ? dataDashboard?.numberServiceOrderByState.amountCancelled
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
    ];
    setDataPie(pieData);
  };

  const buildBarData = () => {
    const DataBar = [
      {
        state: "AS",
        "Solicitudes en Progreso": dataDashboard.numberServiceSolicitudeByState.amountInProgress,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
      {
        state: "AC",
        "Solicitudes Canceladas": dataDashboard.numberServiceSolicitudeByState.amountCanceled,
        "value stateColor": "hsl(173, 70%, 50%)",
      },
      {
        state: "AP",
        "Solicitudes Cerradas": dataDashboard.numberServiceSolicitudeByState.amountClosed,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
    ];
    setDataChart(DataBar);
  };

  const buildLineData = () => {
    const DataLine = [];
    dataDashboard.numbersOfTimesTheyRequestService.forEach((e) => {
      const data = {
        Servicio: e.serviceName,
        Valor: e.amount,
        color: "red",
      };
      DataLine.push(data);
    });
    setDataLine(DataLine);
  };

  const handleOpenViewDetails = (type) => {
    if (type === 1) {
      buildPieData();
    } else if (type === 2) {
      buildBarData();
    } else {
      buildLineData();
    }
    setDataType(type);
    setOpenInfoDetails(true);
  };

  const handledHiddenDetail = (m) => {
    if (m) {
      // eslint-disable-next-line no-param-reassign
      m.showDetail = false;
      const newRows = dataMap.map((r) => (r.id === m.id ? m : r));
      setDataMap(newRows);
    }
  };
  const handledShowDetail = (m) => {
    if (m) {
      // eslint-disable-next-line no-param-reassign
      m.showDetail = true;
      const newRows = dataMap.map((r) => (r.id === m.id ? m : r));
      setDataMap(newRows);
    }
  };

  const closeMenu = () => setMenu(null);

  const openMenu = (event) => setMenu(event.currentTarget);

  const handleRemoveFilter = () => {
    setSelectedIndex(null);
    setMenu(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setMenu(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      {options.map((option, index) => (
        <MenuItem
          key={option}
          selected={index === selectedIndex}
          onClick={(event) => handleMenuItemClick(event, index)}
        >
          {option}
        </MenuItem>
      ))}
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={handleRemoveFilter}>
        <MDTypography variant="button" color="error" fontWeight="regular">
          Remover Filtro
        </MDTypography>
      </MenuItem>
    </Menu>
  );

  const ventanaSecundaria = () => {
    window.open("/map", "ventana1", "width=1024,height=1024,scrollbars=NO");
  };

  useEffect(() => {
    (async () => {
      const data = await getCustomersServiceMap();
      setDataMap(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDataDashboard();
        setDataDashboard(data);
      } catch (err) {
        setDataChart([]);
        setDataPie([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getPersonalProfile();
      if (data) {
        const location = {
          lat: parseFloat(data.tenantSettings.geographicalCoordinates.latitude),
          lng: parseFloat(data.tenantSettings.geographicalCoordinates.longitude),
        };
        dispatch(setCenterMap(location, 12));
      }
    })();
  }, []);

  useEffect(() => {
    if (dataDashboard != null) {
      buildLineData();
      buildBarData();
      buildPieData();
    }
  }, [dataDashboard]);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filtros&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
          </MDBox>
          <MDButton onClick={ventanaSecundaria} type="submit" variant="gradient" color="dark">
            Expandir
          </MDButton>
        </MDBox>
        <Map
          googleMapURL={URL_MAP}
          containerElement={<div style={{ height: `250px`, width: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<LoadingMap />}
          isMarkerShown
          filter={selectedIndex}
          hiddenDetail={handledHiddenDetail}
          handleShowDetail={handledShowDetail}
          customers={dataMap}
        />
      </MDBox>
      {dataPie !== null && dataDashboard !== null && dataChart !== null ? (
        <>
          <MDBox mt={2}>
            <Card sx={{ maxWidth: "95%", marginLeft: "2%" }}>
              <CardHeader title="Registro de usuarios" />
              <Grid container pl={2} spacing={1} mb={4}>
                <Grid item xs ml={10} sm={!matchesPie ? 6 : 3}>
                  <MDBox mt={6} mb={1} pr={1}>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes Pendientes {dataDashboard.numberServiceOrderByState.amountPending}
                    </p>
                    <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                      Solicitudes Canceladas{" "}
                      {dataDashboard?.numberServiceOrderByState.amountCancelled}
                    </p>
                    <p style={{ fontSize: "17px", color: "#FF7006" }}>
                      Solicitudes en Progreso{" "}
                      {dataDashboard?.numberServiceOrderByState.amountInProgress}
                    </p>
                    <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                      Total de usuarios{" "}
                      {dataDashboard?.numberServiceOrderByState.amountInProgress +
                        dataDashboard?.numberServiceOrderByState.amountCancelled +
                        dataDashboard.numberServiceOrderByState.amountPending}
                    </p>
                  </MDBox>
                  <MDBox mt={2} mb={1} pr={1} style={{ width: "80%" }}>
                    <MDButton
                      type="submit"
                      variant="gradient"
                      style={{ backgroundColor: "#96BE1F", color: "#3C3C3B" }}
                      fullWidth
                      onClick={() => handleOpenViewDetails(1)}
                    >
                      Ver más
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid
                  item
                  xs={!matchesPie ? 6 : 3}
                  ml={2}
                  mt={-2}
                  sm={4}
                  style={{ height: "300px" }}
                >
                  <ResponsivePie
                    data={dataPie}
                    innerRadius={0.5}
                    padAngle={0.7}
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

                <Grid item xs={!matchesPie ? 12 : 4} pl={2} mt={!matchesPie ? 0 : -2} ml={-4}>
                  <Grid container>
                    <Grid item xs={!matchesPie ? 6 : 12}>
                      <MDBox component={NavLink} to="/usuarios">
                        <MDBox
                          component="img"
                          src={logo}
                          width="25%"
                          height="80px"
                          style={{ marginLeft: "40%" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid mt={3} item xs={!matchesPie ? 6 : 12}>
                      <MDBox
                        component={NavLink}
                        to="/solicitudes"
                        mb={4}
                        pr={1}
                        style={{ width: "100%", height: "5%" }}
                      >
                        <MDBox
                          component="img"
                          src={solicitudes}
                          width="25%"
                          height="80px"
                          style={{ marginLeft: "40%" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid mt={3} item xs={12}>
                      <MDBox
                        component={NavLink}
                        to="/dashboard"
                        pr={1}
                        mb={-2}
                        style={{ width: "100%", height: "5%" }}
                      >
                        <MDBox
                          component="img"
                          src={gestion}
                          width="25%"
                          height="80px"
                          style={{ marginLeft: "40%" }}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
          <Grid container mt={2} ml={2}>
            <Grid item xs={matches ? 6 : 12} mb={!matches ? 2 : 0}>
              <MDBox>
                <Card sx={{ maxWidth: "95%", height: "80%" }}>
                  <CardHeader title="Registro de servicios" />
                  <Grid container spacing={2} pl={2} mb={4}>
                    <Grid item xs={7} style={{ height: "250px", width: "300px" }}>
                      <ResponsiveBar
                        data={dataChart}
                        keys={[
                          "Solicitudes en Progreso",
                          "Solicitudes Canceladas",
                          "Solicitudes Cerradas",
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
                    <Grid item xs={5} mt={3}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid mt={0} item xs={12}>
                            <MDBox
                              component={NavLink}
                              to="/dashboard"
                              pr={1}
                              mb={-2}
                              style={{ width: "100%", height: "5%" }}
                            >
                              <MDBox
                                component="img"
                                src={encuestasGeneradas}
                                width="45%"
                                height="80px"
                              />
                            </MDBox>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid mt={2} item xs={12}>
                            <MDBox
                              component={NavLink}
                              to="/dashboard"
                              pr={1}
                              mb={-2}
                              style={{ width: "100%", height: "5%" }}
                            >
                              <MDBox
                                component="img"
                                src={agregarEncuestas}
                                width="45%"
                                height="80px"
                              />
                            </MDBox>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs sm={12}>
                      <MDBox mt={4} mb={1} pr={1} ml={3}>
                        <p style={{ fontSize: "17px", color: "#FF7006" }}>
                          Canceladas {dataDashboard.numberServiceSolicitudeByState.amountCanceled}
                        </p>
                        <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                          Cerradas {dataDashboard.numberServiceSolicitudeByState.amountClosed}
                        </p>
                        <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                          En progreso{" "}
                          {dataDashboard.numberServiceSolicitudeByState.amountInProgress}
                        </p>
                        <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                          Total{" "}
                          {dataDashboard.numberServiceSolicitudeByState.amountInProgress +
                            dataDashboard.numberServiceSolicitudeByState.amountClosed +
                            dataDashboard.numberServiceSolicitudeByState.amountCanceled}
                        </p>
                      </MDBox>
                      <MDBox mt={2} mb={1} pr={1} style={{ width: "80%" }}>
                        <MDButton
                          type="submit"
                          variant="gradient"
                          style={{ backgroundColor: "#96BE1F", color: "#3C3C3B" }}
                          fullWidth
                          onClick={() => handleOpenViewDetails(2)}
                        >
                          Ver más
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={matches ? 6 : 12}>
              <MDBox>
                <Card sx={{ maxWidth: "91%", height: "80%" }}>
                  <CardHeader title="Registro de servicios" />
                  <Grid container pl={2} spacing={1} mb={4}>
                    <Grid item xs={7} style={{ height: "250px", width: "300px" }}>
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
                          modifiers: [["darker", 1.6]],
                        }}
                        legends={[]}
                        role="application"
                        ariaLabel="Nivo bar chart demo"
                      />
                    </Grid>
                    <Grid item xs={5} mt={3}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Grid mt={2} item xs={12}>
                            <MDBox
                              component={NavLink}
                              to="/dashboard"
                              pr={1}
                              mb={-2}
                              style={{ width: "100%", height: "5%" }}
                            >
                              <MDBox
                                component="img"
                                src={agregarEncuestas}
                                width="45%"
                                height="80px"
                              />
                            </MDBox>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid mt={2} item xs={12}>
                            <MDBox
                              component={NavLink}
                              to="/dashboard"
                              pr={1}
                              mb={-2}
                              style={{ width: "100%", height: "5%" }}
                            >
                              <MDBox
                                component="img"
                                src={agregarEncuestas}
                                width="45%"
                                height="80px"
                              />
                            </MDBox>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs sm={12}>
                      <MDBox mt={2} mb={1} pr={1} style={{ width: "80%" }}>
                        <MDButton
                          type="submit"
                          variant="gradient"
                          style={{ backgroundColor: "#96BE1F", color: "#3C3C3B" }}
                          fullWidth
                          onClick={() => handleOpenViewDetails(3)}
                        >
                          Ver más
                        </MDButton>
                      </MDBox>
                    </Grid>
                  </Grid>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
          <ViewDetailInfo
            open={openInfoDetails}
            data={dataDashboard}
            onClose={handleCloseViewDetails}
            dataType={dataType}
          />
        </>
      ) : (
        <></>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
