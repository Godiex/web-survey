import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { CardActionArea, CardContent } from "@mui/material";
import MDBox from "components/MDBox";
import { useAlert } from "react-alert";
import { getLinkMercadoPagoRegister } from "../../../store/paymentCredentials/actions";

function DialogCreateCredential({ onClose, open, paymentsGateway }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const handleCredentiaslMercadoPago = async () => {
    const url = await dispatch(getLinkMercadoPagoRegister());
    window.location.href = url;
  };

  const handleSelectGateway = (code) => {
    switch (code) {
      case "MERCADO_PAGO":
        handleCredentiaslMercadoPago();
        break;
      default:
        alert.error("Pasarela sin soporte", { position: "top right" });
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        open={open}
        fullWidth="true"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <MDBox m={3}>
          <DialogTitle>Agregar pasarela de pago</DialogTitle>
          <DialogContent>
            <Grid container spacing={1}>
              {paymentsGateway.map((paymentGateway) => (
                <Grid item xs>
                  <Card>
                    <CardActionArea>
                      <CardContent onClick={() => handleSelectGateway(paymentGateway.code)}>
                        {paymentGateway.name}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        </MDBox>
      </Dialog>
    </div>
  );
}
DialogCreateCredential.defaultProps = {};

DialogCreateCredential.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  paymentsGateway: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default DialogCreateCredential;
