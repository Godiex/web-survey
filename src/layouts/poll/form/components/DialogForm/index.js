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
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MDButton from "components/MDButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
});

function DialogForm({
  open,
  handleClose,
  typeForm,
  handleChange,
  hidden,
  handleSaveForm,
  dataEdit,
  codeForm,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="md">
        <Formik
          initialValues={{
            name: typeForm === "registro" ? "" : dataEdit.name,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await handleSaveForm(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {typeForm === "registro" ? "Nuevo Formulario" : "Editar Formulario"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <Field
                        name="code"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Código"
                        fullWidth
                        value={codeForm}
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={9} lg={9}>
                    <MDBox>
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
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox mt={-0.5}>
                      <div style={{ fontSize: "13px" }}>Ocultar Formulario</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            checked={hidden}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label=""
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
                  {typeForm === "registro" ? "Agregar" : "Guardar cambios"}
                </MDButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

DialogForm.defaultProps = {
  open: false,
  dataEdit: PropTypes.shape({
    name: "",
    code: "",
  }),
};

DialogForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  hidden: PropTypes.string.isRequired,
  handleSaveForm: PropTypes.func.isRequired,
  dataEdit: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
  codeForm: PropTypes.string.isRequired,
};

export default DialogForm;
