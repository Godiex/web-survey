import React from "react";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import StatusCell from "../../../../components/StatusCell/StatusCell";
import { formatDate } from "../../../../utils/utils";
import FooterCardCustomer from "../../componets/FooterCardCustomer";
import TitleCardCustomer from "../../componets/TitleCardCustomer";

function CardCustomerServices({ serviceRequest, onCancel }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const renderState = (value) => {
    let status;
    if (value === "Canceled") {
      status = <StatusCell icon="close" color="error" status="Cancelada" />;
    } else if (value === "Assigned") {
      status = <StatusCell icon="assignment_turned_in" color="info" status="Asignado" />;
    } else if (value === "PendingPayment") {
      status = <StatusCell icon="pending_actions" color="warning" status="Pendiente de pago" />;
    } else if (value === "Closed") {
      status = <StatusCell icon="done" color="success" status="Finalizada" />;
    } else if (value === "Certified") {
      status = <StatusCell icon="done_all" color="success" status="Certificada" />;
    } else if (value === "InProgress") {
      status = <StatusCell icon="rotate_left" color="dark" status="En Proceso" />;
    } else {
      status = <StatusCell icon="rotate_left" color="dark" status="En Proceso" />;
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
        <TitleCardCustomer>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Nombre del servicio:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {serviceRequest?.service.nameService}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </TitleCardCustomer>
        <MDBox p={2}>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Nombre del servicio:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {serviceRequest?.service.nameService}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Fecha de solicitud:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {formatDate(serviceRequest?.createdOn)}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Descripcion del servicio:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {serviceRequest?.service.description}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
        <FooterCardCustomer>
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
                  {renderState(serviceRequest.state)}
                </MDBox>
              </Grid>
              <Grid xs>
                {serviceRequest.state !== "Closed" &&
                  serviceRequest.state !== "Canceled" &&
                  serviceRequest.state !== "Certified" && (
                    <MDBox
                      display="flex"
                      width="100%"
                      height="100%"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <MDButton
                        onClick={() => onCancel(serviceRequest.id)}
                        variant="text"
                        color="error"
                        disabled={
                          serviceRequest.state === "Closed" ||
                          serviceRequest.state === "Canceled" ||
                          serviceRequest.state === "Certified"
                        }
                      >
                        &nbsp;Cancelar
                      </MDButton>
                    </MDBox>
                  )}
              </Grid>
            </Grid>
          </MDBox>
        </FooterCardCustomer>
      </MDBox>
    </MDBox>
  );
}
CardCustomerServices.propTypes = {
  onCancel: PropTypes.func.isRequired,
  serviceRequest: PropTypes.shape({
    id: PropTypes.string,
    state: PropTypes.string,
    createdOn: PropTypes.string,
    isAnonymous: PropTypes.bool,
    service: PropTypes.shape({
      id: PropTypes.string,
      nameService: PropTypes.string,
      description: PropTypes.string,
    }),
  }).isRequired,
};

export default CardCustomerServices;
