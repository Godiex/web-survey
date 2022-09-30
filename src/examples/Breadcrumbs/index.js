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

// react-router-dom components

// prop-types is a library for typechecking of props.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Breadcrumbs({ title, light }) {
  const [date, setDate] = useState(null);
  const [mainTittle, setMainTittle] = useState("");
  useEffect(() => {
    const fecha = new Date();
    setDate(`${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`);
    setMainTittle(title.replace("-", " "));
  }, []);

  useEffect(() => {
    if (mainTittle.includes("-")) {
      setMainTittle(mainTittle.replace("-", " "));
    }
  }, [mainTittle]);
  return (
    <MDBox>
      <Grid container spacing={1}>
        <Grid item xs>
          <MDTypography
            fontWeight="bold"
            textTransform="capitalize"
            variant="h4"
            color={light ? "white" : "dark"}
            noWrap
          >
            {mainTittle}
          </MDTypography>
        </Grid>
        <Grid item xs>
          <MDTypography
            fontWeight="bold"
            textTransform="capitalize"
            variant="button"
            color={light ? "white" : "dark"}
            noWrap
          >
            {date}
          </MDTypography>
        </Grid>
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false,
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  title: PropTypes.string.isRequired,
  light: PropTypes.bool,
};

export default Breadcrumbs;
