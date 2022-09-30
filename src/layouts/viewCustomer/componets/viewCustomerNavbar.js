import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MDTypography from "components/MDTypography";
import { menuOptions, profileOptions } from "./routesCustomerApp";
import { logout } from "../../../store/auth/actions";
import Notifications from "../../../components/Notifications";
import logo from "../../../image/logo.png";

export default function ViewCustomerNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);

  const countNotifi = useSelector(({ notifications }) => notifications.countUnseenNotifications);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNotifications = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  const handleCloseNotifications = () => {
    setNotificationsAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handlelogout = async () => {
    await dispatch(logout());
    navigate("../", { replace: true });
  };

  const handleActionsOptionsPerfil = (key, route) => {
    switch (key) {
      case "logout":
        return () => handlelogout();
      default:
        return () => navigate(route, { replace: true });
    }
  };

  const renderMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id={menuId}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {profileOptions.map(({ name, type, key, route }) => {
        if (type === "menu-item") {
          return (
            <MenuItem key={key} onClick={handleActionsOptionsPerfil(key, route)}>
              <MDTypography>{name}</MDTypography>
            </MenuItem>
          );
        }
        if (type === "Divider") return <Divider sx={{ margin: 0 }} />;
        return null;
      })}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleOpenNotifications}>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={countNotifi} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderOptionNavbar = () => {
    const element = menuOptions.map(({ name, key, route }) => (
      <Button
        component={Link}
        to={route}
        key={key}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "#fff", display: "block" }}
      >
        {name}
      </Button>
    ));
    return element;
  };

  const rederLogo = (
    <>
      <MDBox
        component="img"
        src={logo}
        borderRadius="lg"
        shadow="md"
        width="10%"
        height="10%"
        sx={{ mr: 2, backgroundColor: "#fff" }}
      />
      <Typography sx={{ color: "#fff" }}>AIDCOL</Typography>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#ff7006", color: "#fff" }}>
        <Toolbar>
          <Link to="/app-cliente/dashboard">
            {" "}
            <Typography
              variant="h6"
              noWrap
              component="div"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              {rederLogo}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {renderOptionNavbar()}
            </Menu>
          </Box>
          <Link to="/app-cliente/dashboard">
            {" "}
            <Typography
              variant="h6"
              noWrap
              component="div"
              display="inline-flex"
              justifyContent="center"
              alignItems="center"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              {rederLogo}
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {renderOptionNavbar()}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleOpenNotifications}
            >
              <Badge badgeContent={countNotifi} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Notifications
        isOpen={Boolean(notificationsAnchorEl)}
        anchorEl={notificationsAnchorEl}
        onClose={handleCloseNotifications}
        idMenuNotificacions="menu-notifications-app-customer"
      />
    </Box>
  );
}
