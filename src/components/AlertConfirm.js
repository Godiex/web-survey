import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import PropTypes from "prop-types";
import MDButton from "./MDButton";

export default function AlertConfirm({ open, title, context, onClose, onAccept, get, loading }) {
  const handleAccept = async () => {
    await onAccept();
    if (get) await get();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{context}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {loading === true ? (
          <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <CircularProgress color="secondary" />
            </Grid>
          </Grid>
        ) : (
          <>
            <MDButton variant="outlined" color="secondary" onClick={handleClose} size="small">
              Cerrar
            </MDButton>
            <MDButton variant="gradient" color="dark" onClick={handleAccept} size="small">
              Aceptar
            </MDButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

AlertConfirm.defaultProps = {
  title: "Alert",
  context: "Context",
  get: () => {},
};

AlertConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  context: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  get: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};
