import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { useDispatch } from "react-redux";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Map from "../../components/Map/MapGeolocation";
import LoadingMap from "../../components/Map/LoadingMap";
import MDTypography from "../../components/MDTypography";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import { getCustomersServiceMap } from "../../services/Customer/CustomerService";
// eslint-disable-next-line import/named
import { URL_MAP } from "../../utils/utils";
// eslint-disable-next-line import/named
import { getPersonalProfile } from "../../services/Personal/PersonalService";
// eslint-disable-next-line import/named
import { setCenterMap } from "../../store/map/actions";

const options = ["Mostrar solo los clientes", "Mostrar solo los empleados"];

const DashBoardMap = () => {
  const [menu, setMenu] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [dataMap, setDataMap] = useState([]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    (async () => {
      const data = await getCustomersServiceMap();
      setDataMap(data);
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

  return (
    <PageLayout>
      <MDBox width="100vw" height="100%">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
          mt={2}
          ml={2}
        >
          <MDBox display="flex">
            <MDButton variant={menu ? "contained" : "outlined"} color="dark" onClick={openMenu}>
              filtros&nbsp;
              <Icon>keyboard_arrow_down</Icon>
            </MDButton>
            {renderMenu}
          </MDBox>
        </MDBox>
        <Map
          googleMapURL={URL_MAP}
          containerElement={<div style={{ height: `600px`, width: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
          loadingElement={<LoadingMap />}
          isMarkerShown
          zoomtwo={14}
          filter={selectedIndex}
          hiddenDetail={handledHiddenDetail}
          handleShowDetail={handledShowDetail}
          customers={dataMap}
        />
      </MDBox>
    </PageLayout>
  );
};

export default DashBoardMap;
