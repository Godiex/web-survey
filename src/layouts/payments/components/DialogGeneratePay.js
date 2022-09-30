import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { generatePay } from "../../../store/paymentsGenerated/actions";

function DialogGeneratePay({ open, onClose, payment }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (paymentOrderId) => {
    const dataRequest = { paymentOrderId };
    setLoading(true);
    const response = await dispatch(generatePay(dataRequest));
    if (response) onClose();
    setLoading(false);
  };
  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      aria-labelledby="responsive-dialog-title"
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
    >
      <DialogTitle>Registrar pago</DialogTitle>
      <DialogContent>
        <MDBox pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                disabled
                label="Servicio a pagar"
                type="text"
                value={payment?.serviceName}
                required
                variant="standard"
                fullWidth
                name="dateTovisit"
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                disabled
                label="Cliente"
                value={payment?.customer.name}
                type="text"
                required
                variant="standard"
                fullWidth
                name="dateTovisit"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                disabled
                label="Total a pagar"
                value={payment?.valueToPay}
                type="text"
                required
                variant="standard"
                fullWidth
                name="dateTovisit"
              />
            </Grid>
          </Grid>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={onClose}>
          Cancelar
        </Button>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <MDButton
            onClick={() => handleSubmit(payment?.id)}
            type="submit"
            variant="gradient"
            color="dark"
            size="small"
          >
            Registrar pago
          </MDButton>
        )}
      </DialogActions>
    </Dialog>
  );
}

DialogGeneratePay.defaultProps = {
  payment: null,
};

DialogGeneratePay.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  payment: PropTypes.objectOf(),
};

export default DialogGeneratePay;
