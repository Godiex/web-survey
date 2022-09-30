import React from "react";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";
import StatusCell from "../../../../components/StatusCell/StatusCell";
import FooterCardCustomer from "../../componets/FooterCardCustomer";

function CardsPayments({ payment, callback }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleCancel = async () => {
    callback(payment);
  };

  const renderState = (value) => {
    let status;
    if (!value) {
      status = <StatusCell icon="close" color="error" status="Pendiente" />;
    } else {
      status = <StatusCell icon="done_all" color="success" status="pagada" />;
    }
    return status;
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "#fffff"}
      coloredShadow="dark"
      borderRadius="lg"
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox p={2}>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Servicio a pagar:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {payment?.serviceName}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Valor del servicio:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {payment?.valueToPay}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>

        <FooterCardCustomer>
          {" "}
          <MDBox width="100%">
            <Grid container spacing={0.5}>
              <Grid xs>
                <MDBox
                  mr={1}
                  display="flex"
                  width="100%"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  {renderState(payment.isPaid)}
                </MDBox>
              </Grid>
              <Grid xs>
                <MDBox
                  display="flex"
                  width="100%"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MDButton
                    onClick={() => handleCancel(payment)}
                    variant="text"
                    color="success"
                    disabled={payment.isPaid}
                  >
                    <Icon>paid_icon </Icon>&nbsp;Pagar
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </FooterCardCustomer>
      </MDBox>
    </MDBox>
  );
}

CardsPayments.defaultProps = {
  callback: () => {},
};
CardsPayments.propTypes = {
  callback: PropTypes.func,
  payment: PropTypes.shape({
    id: PropTypes.string,
    paymentOrderNumber: PropTypes.number,
    isPaid: PropTypes.bool,
    serviceName: PropTypes.string,
    valueToPay: PropTypes.bool,
  }).isRequired,
};

export default CardsPayments;
