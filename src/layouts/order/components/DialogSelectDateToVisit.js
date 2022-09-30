import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as Yup from "yup";
import * as moment from "moment";
import { formatDate } from "../../../utils/utils";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";

const validationSchema = Yup.object().shape({
  dateTovisit: Yup.string().required("Campo requerido"),
});

function DialogSelectDateToVisit({ dateToVisit, open, onClose, onAccept }) {
  const [loading, setLoading] = useState(false);
  const currentDate = moment().format("YYYY-MM-DDTHH:mm");
  const initialState = {
    dateTovisit: !dateToVisit ? null : formatDate(dateToVisit, "YYYY-MM-DDTHH:mm"),
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const isUpdate = await onAccept(data.dateTovisit);
      setLoading(false);
      if (isUpdate) onClose();
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
      setLoading(false);
    }
  };

  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      aria-labelledby="responsive-dialog-title"
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
    >
      <DialogTitle>Fecha para la visita</DialogTitle>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <MDBox pb={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Field
                      as={TextField}
                      label="Fecha de visita"
                      type="datetime-local"
                      required
                      variant="standard"
                      fullWidth
                      name="dateTovisit"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: currentDate }}
                      error={errors.nameClient && touched.nameClient}
                      helperText={touched.nameClient && errors.nameClient}
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
                <MDButton type="submit" variant="gradient" color="dark" size="small">
                  Asignar Fecha
                </MDButton>
              )}
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
DialogSelectDateToVisit.defaultProps = {
  dateToVisit: null,
};

DialogSelectDateToVisit.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  dateToVisit: PropTypes.string,
};

export default DialogSelectDateToVisit;
