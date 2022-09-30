import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ListPaymentsGenerated from "./components/ListPaymentsGenerated";

function PaymentsGenerated() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid sx={{ mt: 4 }} container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <ListPaymentsGenerated />
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}
export default PaymentsGenerated;
