import React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CardHistory from "./CardHistory";

function DialogHistory({ openDialogHistory, closeDialogHistory, history }) {
  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      aria-labelledby="responsive-dialog-title"
      open={openDialogHistory}
      onClose={() => closeDialogHistory()}
      fullWidth="true"
      maxWidth="xl"
    >
      <DialogTitle>Registro de pagos</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {history.length > 0 &&
            history.map((historyData) => (
              <Grid item xs={12} md={6} lg={6}>
                <CardHistory historyData={historyData} />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

DialogHistory.defaultProps = {
  openDialogHistory: false,
};

DialogHistory.propTypes = {
  openDialogHistory: PropTypes.bool,
  closeDialogHistory: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DialogHistory;
