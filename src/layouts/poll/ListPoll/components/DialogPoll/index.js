import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "components/MDButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
});

function DialogPoll({ open, handleClose, handlePoll, dataEditPoll, typeForm, codeSurveys }) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <Formik
          initialValues={{
            name: typeForm === "registro" ? "" : dataEditPoll.name,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handlePoll(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {typeForm === "registro" ? "Nueva encuesta" : "Editar Encuesta"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={4}>
                      <Field
                        name="code"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Código"
                        fullWidth
                        disabled
                        value={codeSurveys}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={4}>
                      <Field
                        name="name"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Nombre"
                        fullWidth
                        error={errors.name && touched.name}
                        helperText={touched.name && errors.name}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleClose} variant="outlined" color="info">
                  Cancelar
                </MDButton>
                <MDButton type="submit" variant="gradient" color="info">
                  Guardar
                </MDButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

DialogPoll.defaultProps = {
  open: false,
  dataEditPoll: {
    code: "",
    name: "",
  },
};

DialogPoll.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handlePoll: PropTypes.func.isRequired,
  dataEditPoll: PropTypes.shape({ code: PropTypes.string, name: PropTypes.string }),
  typeForm: PropTypes.string.isRequired,
  codeSurveys: PropTypes.string.isRequired,
};

export default DialogPoll;
