import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import { CardActionArea, DialogActions, Checkbox } from "@mui/material";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import MDTypography from "components/MDTypography";
import { toPay } from "./ModalToPayService";

function ModalToPay({ isOpen, onClose, credential, paymentsGateway, serviceOrderId }) {
  const dispatch = useDispatch();
  const [currentTarget, setCurrentTarget] = useState(null);

  const filterByCode = (code) =>
    paymentsGateway.find((paymentGateway) => paymentGateway.code === code);

  const handleChange = (credentialSelected) => {
    setCurrentTarget(credentialSelected);
  };

  const handleClose = () => {
    handleChange(null);
    onClose();
  };

  const handleSubmit = async () => {
    await dispatch(toPay(currentTarget, serviceOrderId));
    handleClose();
  };

  return (
    <Dialog
      maxWidth="lg"
      open={isOpen}
      fullWidth="true"
      onClose={() => handleClose()}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle>Metodo de pago</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} m={0.5}>
          {credential.map((item) => (
            <Grid p={2} xs={12} sm={4} md={4}>
              <Card>
                <CardActionArea onClick={() => handleChange(item)}>
                  <CardContent>
                    <MDTypography variant="caption" color="text">
                      <Checkbox checked={currentTarget?.id === item.id} />
                      &nbsp;&nbsp;&nbsp;
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        textTransform="capitalize"
                      >
                        {filterByCode(item.paymentGatewayCode)?.name}
                      </MDTypography>
                    </MDTypography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <MDButton onClick={() => handleClose()} variant="outlined" color="info">
          Cancelar
        </MDButton>
        <MDButton
          onClick={() => handleSubmit()}
          disabled={!currentTarget}
          variant="gradient"
          color="info"
        >
          Realizar pago
        </MDButton>
      </DialogActions>
    </Dialog>
  );
}

ModalToPay.defaultProps = {
  isOpen: false,
  onClose: () => {},
  credential: [],
};

ModalToPay.propTypes = {
  isOpen: PropTypes.bool,
  credential: PropTypes.node,
  serviceOrderId: PropTypes.node.isRequired,
  paymentsGateway: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

export default ModalToPay;
