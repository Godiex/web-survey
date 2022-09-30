import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import ChangePassword from "../../../components/ChangePassword";

function ChangePasswordCustomer() {
  return (
    <LayoutViewCustomer>
      {" "}
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </LayoutViewCustomer>
  );
}
export default ChangePasswordCustomer;
