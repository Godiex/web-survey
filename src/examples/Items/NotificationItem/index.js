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

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Icon from "@mui/material/Icon";

const getIcon = (label) => {
  switch (label) {
    case 0:
      return <Icon>info_icon</Icon>;
    case 1:
      return <Icon>check_circle_outline_icon </Icon>;
    case 2:
      return <Icon>warning_amber_icon </Icon>;
    case 3:
      return <Icon>report_gmailerrorred_icon </Icon>;
    default:
      return <Icon>info_icon</Icon>;
  }
};
const getTitle = (label) => {
  switch (label) {
    case 0:
      return <>INFO</>;
    case 1:
      return <>EXITOSO</>;
    case 2:
      return <>ADVERTENCIA</>;
    case 3:
      return <>ERROR</>;
    default:
      return <>INFO</>;
  }
};

const NotificationItem = forwardRef(({ label, message, loading, ...rest }, ref) => (
  <MenuItem disabled={loading} {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <MDBox component={Link} width={300} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <Grid container>
        <Grid item xs={2} display="flex" alignItems="center">
          <MDTypography variant="body1" color="secondary">
            {loading ? <Skeleton variant="circular" width={40} height={40} /> : getIcon(label)}
          </MDTypography>
        </Grid>
        <Grid item xs={10}>
          <Grid item xs>
            <Grid>
              <MDTypography variant="button" color="secondary" fontWeight="regular" align="right">
                {loading ? <Skeleton animation="wave" /> : getTitle(label)}
              </MDTypography>
            </Grid>
          </Grid>
          <Grid item xs>
            <MDTypography sx={{ whiteSpace: "normal" }} variant="caption" fontWeight="regular">
              {loading ? <Skeleton animation="wave" /> : <>{message}</>}
            </MDTypography>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  </MenuItem>
));
NotificationItem.defaultProps = {
  loading: false,
  message: "",
  label: 1,
};

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  label: PropTypes.number,
  message: PropTypes.string,
  loading: PropTypes.bool,
};

export default NotificationItem;
