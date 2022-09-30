import * as React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ListPaymentGateway from "./components/listPaymentGateway";

function PaymentGateway() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <ListPaymentGateway />
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default PaymentGateway;
