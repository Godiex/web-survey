import { useState, useEffect } from "react";
// react-router components
import { useLocation, useNavigate } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import useMediaQuery from "@mui/material/useMediaQuery";
// Material Dashboard 2 PRO React components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import AlertConfirm from "components/AlertConfirm";
// Material Dashboard 2 PRO React example components
import Breadcrumbs from "examples/Breadcrumbs";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";
// Material Dashboard 2 PRO React context
import { useMaterialUIController, setTransparentNavbar, setMiniSidenav } from "context";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../../../components/Notifications";
import { logout } from "../../../store/auth/actions";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const matches = useMediaQuery("(min-width:998px)");
  const dispatches = useDispatch();
  const navigate = useNavigate();

  const countNotifi = useSelector(({ notifications }) => notifications.countUnseenNotifications);

  // const history = useHistory();
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu d
  const renderMenu = () => (
    <Notifications
      isOpen={Boolean(openMenu)}
      anchorEl={openMenu}
      onClose={handleCloseMenu}
      idMenuNotificacions="menu-notifications-app-admin"
    />
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
    fontSize: "medium",
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <Grid container spacing={2}>
          <Grid item xs={matches ? 8 : 6}>
            <MDBox
              color="inherit"
              mb={{ xs: 1, md: 0 }}
              sx={(theme) => navbarRow(theme, { isMini })}
            >
              <Breadcrumbs title={route[0]} light={light} />
            </MDBox>
          </Grid>
          <Grid item xs>
            {isMini ? null : (
              <MDBox>
                <MDBox color={light ? "white" : "inherit"}>
                  <MDTypography
                    fontWeight="bold"
                    textTransform="capitalize"
                    variant="button"
                    color={light ? "white" : "dark"}
                    noWrap
                  >
                    {localStorage.getItem("userName")}
                  </MDTypography>
                  <IconButton
                    sx={navbarIconButton}
                    size="medium"
                    disableRipple
                    aria-controls="notification-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={async () => {
                      navigate("/cuenta", { replace: true });
                    }}
                  >
                    <Icon sx={iconsStyle}>account_circle</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    disableRipple
                    color="inherit"
                    sx={navbarMobileMenu}
                    onClick={handleMiniSidenav}
                  >
                    <Icon sx={iconsStyle} fontSize="medium">
                      {miniSidenav ? "menu_open" : "menu"}
                    </Icon>
                  </IconButton>
                  <IconButton
                    size="medium"
                    disableRipple
                    color="inherit"
                    sx={navbarIconButton}
                    aria-controls="notification-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={handleOpenMenu}
                  >
                    <MDBadge badgeContent={countNotifi} color="error" size="xs" circular>
                      <Icon sx={iconsStyle}>notifications</Icon>
                    </MDBadge>
                  </IconButton>
                  <IconButton
                    width="20px"
                    disableRipple
                    color="inherit"
                    sx={navbarIconButton}
                    aria-controls="notification-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <Icon sx={iconsStyle}>power_settings_new_icon</Icon>
                  </IconButton>
                  {renderMenu()}
                </MDBox>
              </MDBox>
            )}
          </Grid>
        </Grid>
      </Toolbar>
      <AlertConfirm
        open={isOpen}
        title="! Atención ¡"
        context="¿Seguro que desea cerrar su sesión?"
        onClose={() => setIsOpen(!isOpen)}
        onAccept={async () => {
          await dispatches(logout());
          navigate("../", { replace: true });
        }}
      />
      <Divider
        orientation="vertical"
        style={{ background: "black", width: "98%", height: "1px" }}
        variant="inset"
        flexItem
      />
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
