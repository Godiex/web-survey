import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Campo requerido"),
  value: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
});

function DialogRegisterOption({
  open,
  handleClose,
  handleThrowRequired,
  throwRequired,
  throwDependency,
  handleThrowDependency,
  handleSaveOption,
  isEdit,
  dataEditOption,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <Formik
          initialValues={{
            text: isEdit ? dataEditOption.text : "",
            value: isEdit ? dataEditOption.value : "",
            description: isEdit ? dataEditOption.description : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSaveOption(values);
            resetForm({
              text: "",
              value: "",
              description: "",
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {isEdit ? "Editar opción" : "Registrar opción"}Registrar opción
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <Field
                      name="text"
                      type="text"
                      as={MDInput}
                      variant="standard"
                      label="Texto"
                      fullWidth
                      error={errors.text && touched.text}
                      helperText={touched.text && errors.text}
                      inputProps={{ autoComplete: "off" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Field
                      name="value"
                      type="text"
                      as={MDInput}
                      variant="standard"
                      label="Valor"
                      fullWidth
                      error={errors.value && touched.value}
                      helperText={touched.value && errors.value}
                      inputProps={{ autoComplete: "off" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Field
                      name="description"
                      type="text"
                      as={MDInput}
                      variant="standard"
                      label="Descripción"
                      fullWidth
                      error={errors.text && touched.text}
                      helperText={touched.text && errors.text}
                      inputProps={{ autoComplete: "off" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <div style={{ fontSize: "13px" }}>¿Es requerida?</div>
                    <FormControlLabel
                      control={
                        <Switch
                          color="secondary"
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={handleThrowRequired}
                          checked={throwRequired}
                        />
                      }
                      label=""
                    />
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <div style={{ fontSize: "13px" }}>¿Tiene dependencia?</div>
                    <FormControlLabel
                      control={
                        <Switch
                          color="secondary"
                          inputProps={{ "aria-label": "controlled" }}
                          onChange={handleThrowDependency}
                          checked={throwDependency}
                        />
                      }
                      label=""
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleClose} variant="outlined" color="info">
                  Cerrar
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

DialogRegisterOption.defaultProps = {
  open: false,
  throwRequired: false,
  throwDependency: false,
  isEdit: false,
  dataEditOption: {},
};

DialogRegisterOption.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  throwRequired: PropTypes.bool,
  handleThrowRequired: PropTypes.func.isRequired,
  throwDependency: PropTypes.bool,
  handleThrowDependency: PropTypes.func.isRequired,
  handleSaveOption: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  dataEditOption: PropTypes.objectOf(PropTypes.string),
};

export default DialogRegisterOption;
