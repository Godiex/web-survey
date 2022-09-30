import React from "react";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useMaterialUIController } from "context";
import PropTypes from "prop-types";
import ViewCustomerNavbar from "./viewCustomerNavbar";

function LayoutViewCustomer({ children }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  return (
    <PageLayout background="white">
      <Grid item mr={1} ml={1} xs={12}>
        <ViewCustomerNavbar />
        <Container>
          <Grid
            container
            sx={{
              backgroundColor: ({ palette: { background, white } }) =>
                darkMode ? background.default : white.main,
            }}
          >
            <Grid item mr={3} ml={3} xs={12}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </PageLayout>
  );
}
LayoutViewCustomer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutViewCustomer;
