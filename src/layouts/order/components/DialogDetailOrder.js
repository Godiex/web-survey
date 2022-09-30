import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import moment from "moment";
import { forwardRef } from "react";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import DetailAnswersInOrder from "./DetailAnswersInOrder";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function DialogDetailOrder({
  openDetailOrder,
  handleCloseDetailOrder,
  dataDetailOrder,
  suvery,
  questions,
  attachments,
}) {
  return (
    <div>
      <Dialog
        fullScreen
        open={openDetailOrder}
        onClose={handleCloseDetailOrder}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h5" component="div">
              Detalle de la orden
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseDetailOrder}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {dataDetailOrder ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h5" align="center" gutterBottom component="div">
                      Información del empleado
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Nombre: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.firstName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Apellidos: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Tipo de documento: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.identificationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Número de identificación: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.nuip}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Teléfono: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Cargo: </strong>
                      {!!dataDetailOrder && dataDetailOrder?.user?.position}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Fecha de visita: </strong>
                      {moment(!!dataDetailOrder && dataDetailOrder?.user?.visitDate).format(
                        "DD/MM/YYYY"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h5" align="center" gutterBottom component="div">
                      Información del cliente
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Nombre: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Tipo de documento: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.identificationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Número de identificación: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.nIdentification}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Dirección: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Teléfono: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.phoneNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>ARL: </strong>
                      {!!dataDetailOrder && dataDetailOrder.customer.arl}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Nivel de riesgo: </strong>
                      {!!dataDetailOrder &&
                        dataDetailOrder.customer &&
                        dataDetailOrder.customer.customerDetail.riskLevel}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Metros cuadrados totales: </strong>
                      {!!dataDetailOrder &&
                        dataDetailOrder.customer &&
                        dataDetailOrder.customer.customerDetail.totalSquareMeters}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Typography variant="body2" color="#212121" gutterBottom>
                      <strong>Metros construidos: </strong>
                      {!!dataDetailOrder &&
                        dataDetailOrder.customer &&
                        dataDetailOrder.customer.customerDetail.squareMetersBuilt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center" gutterBottom component="div">
                  {!!suvery && suvery.Name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {!!suvery &&
                  suvery.Forms.length > 0 &&
                  suvery.Forms.map((form) => (
                    <DetailAnswersInOrder
                      form={form}
                      answers={questions}
                      attachments={attachments}
                    />
                  ))}
              </Grid>
            </Grid>
          ) : (
            <div>No hay resultados</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

DialogDetailOrder.defaultProps = {
  openDetailOrder: false,
  suvery: {},
  questions: [],
  dataDetailOrder: {},
  attachments: [],
};

DialogDetailOrder.propTypes = {
  openDetailOrder: PropTypes.bool,
  handleCloseDetailOrder: PropTypes.func.isRequired,
  suvery: PropTypes.objectOf(PropTypes.string),
  questions: PropTypes.arrayOf(PropTypes.string),
  dataDetailOrder: PropTypes.objectOf(PropTypes.string),
  attachments: PropTypes.objectOf(PropTypes.string),
};

export default DialogDetailOrder;
