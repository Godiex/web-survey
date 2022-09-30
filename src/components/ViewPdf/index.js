import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const ViewPdf = ({ open, onClose, data }) => (
  <Dialog
    aria-labelledby="responsive-dialog-title"
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="xl"
    style={{ height: "700px" }}
  >
    <DialogTitle>Detalle Certificado</DialogTitle>
    {onClose ? (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
    <DialogContent style={{ marginTop: -10 }} width="90%" height="90%">
      <object
        width="100%"
        type="application/pdf"
        style={{ height: "500px" }}
        aria-label="this object has text"
        data={data}
      />
    </DialogContent>
  </Dialog>
);

ViewPdf.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.string.isRequired,
};

export default ViewPdf;
