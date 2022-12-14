/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router components
import { Link } from "react-router-dom";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React example components
import DefaultNavbarMenu from "examples/Navbars/DefaultNavbar/DefaultNavbarMenu";

function AuthenticationMenu({ routes, open, close, mobileMenu }) {
  const renderAuthenticationMenuRoute = (routeName) =>
    routes.map(({ key, name, icon, routeF }) => {
      let template;

      if (key === routeName && !mobileMenu) {
        template = (
          <MenuItem component={Link} to={routeF} key={key}>
            <Icon sx={{ mr: 1 }}>{icon}</Icon>
            {name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon sx={{ fontWeight: "bold", ml: "auto" }}>chevron_right</Icon>
          </MenuItem>
        );
      } else if (key === routeName && mobileMenu) {
        template = (
          <Link to={routeF}>
            <MDBox key={key} px={2} mt={0} mb={2}>
              <MDTypography variant="button" fontWeight="bold" gutterBottom>
                <MDTypography component="span" variant="body2" color="text">
                  <Icon sx={{ mr: 1, mb: -0.375 }}>{icon}</Icon>
                </MDTypography>
                {name}
              </MDTypography>
            </MDBox>
          </Link>
        );
      }

      return template;
    });

  const renderMenuContent = (
    <MDBox display="block">
      {renderAuthenticationMenuRoute("sign-in")}
      {renderAuthenticationMenuRoute("sign-up")}
      {renderAuthenticationMenuRoute("reset-password")}
      {renderAuthenticationMenuRoute("lock")}
      {renderAuthenticationMenuRoute("2-step-verification")}
      {renderAuthenticationMenuRoute("error")}
    </MDBox>
  );

  return mobileMenu ? (
    renderMenuContent
  ) : (
    <DefaultNavbarMenu open={open} close={close}>
      {renderMenuContent}
    </DefaultNavbarMenu>
  );
}

// Setting default values for the props of AuthenticationMenu
AuthenticationMenu.defaultProps = {
  mobileMenu: false,
  open: false,
  close: false,
};

// Typechecking props for the AuthenticationMenu
AuthenticationMenu.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  close: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  mobileMenu: PropTypes.bool,
};

export default AuthenticationMenu;
