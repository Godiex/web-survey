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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

function CardPermissions({ color, title, percentage, icon, handleChange, check }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <Grid container>
          <Grid xs={3}>
            <MDBox
              variant="gradient"
              bgColor={color}
              color={color === "light" ? "dark" : "white"}
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="4rem"
              height="4rem"
              mt={-3}
            >
              <Icon fontSize="medium" color="inherit">
                {icon}
              </Icon>
            </MDBox>
          </Grid>
          <Grid xs={7}>
            <Grid container>
              <Tooltip title={title}>
                <MDTypography noWrap="true" variant="button" fontWeight="light" color="text">
                  <strong>{title}</strong>
                </MDTypography>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid xs={2}>
            <Checkbox
              onChange={(event) => handleChange(event, title)}
              inputProps={{ "aria-label": "controlled" }}
              checked={check}
            />
          </Grid>
        </Grid>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <Grid container>
          <Grid container>
            <Tooltip title={percentage.label}>
              <MDTypography noWrap="true" variant="button" fontWeight="light" color="text">
                {percentage.label}
              </MDTypography>
            </Tooltip>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
CardPermissions.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
  check: false,
};

// Typechecking props for the ComplexStatisticsCard
CardPermissions.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
  handleChange: PropTypes.func.isRequired,
  check: PropTypes.bool,
};

export default CardPermissions;
