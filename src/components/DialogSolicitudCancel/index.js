import React from "react";
import { useAlert } from "react-alert";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Field, Formik, Form } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

import MDBox from "../MDBox";
import MDButton from "../MDButton";
import { cancelService } from "../../store/viewCustomer/actions";
import { cancelledOrder } from "../../store/order/actions";

function DialogSolicitudCancel({ open, onClose, idSolicitud, type, callBack }) {
  const alert = useAlert();
  const dispatch = useDispatch();

  const initialValues = {
    description: "",
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Campo requerido"),
  });

  const handleSubmit = async (values) => {
    try {
      const data = {
        cancellationDescription: values.description,
        id: idSolicitud,
      };
      if (type === 0) {
        dispatch(cancelService(idSolicitud, data));
        callBack();
      } else {
        dispatch(cancelledOrder(idSolicitud, data));
        callBack();
      }
      onClose();
      alert.show(`Solicitud cancelada correctamente`, {
        type: "success",
        position: "top right",
      });
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
    }
  };

  return (
    <>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xl"
        style={{ height: "700px" }}
      >
        {type === 0 && <DialogTitle>Cancelar Solicitud</DialogTitle>}
        {type === 1 && <DialogTitle>Cancelar Orden</DialogTitle>}
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    <Field
                      as={TextField}
                      label="Descripción"
                      name="description"
                      fullWidth
                      required
                      inputProps={{ type: "text", autoComplete: "off" }}
                      error={errors.description && touched.description}
                      helperText={touched.description && errors.description}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item style={{ marginLeft: "80%" }}>
                    <MDBox mt={4} mb={1} pr={1}>
                      {type === 0 && (
                        <MDButton type="submit" variant="gradient" color="dark" fullWidth>
                          Cancelar Solicitud
                        </MDButton>
                      )}
                      {type === 1 && (
                        <MDButton type="submit" variant="gradient" color="dark" fullWidth>
                          Cancelar Orden
                        </MDButton>
                      )}
                    </MDBox>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
DialogSolicitudCancel.defaultProps = {
  callBack: () => {},
};

DialogSolicitudCancel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  callBack: PropTypes.func,
  idSolicitud: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
};

export default DialogSolicitudCancel;
