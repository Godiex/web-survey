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
  description: Yup.string().required("Campo requerido"),
});
function DialogForm({
  open,
  handleClose,
  typeForm,
  handleHtmlSwith,
  htmlSwitch,
  handleHiddenSection,
  hiddenSection,
  handleSaveSection,
  dataEdit,
  codeSection,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="md">
        <Formik
          initialValues={{
            name: typeForm === "registro" ? "" : dataEdit.name,
            description: typeForm === "registro" ? "" : dataEdit.description,
            html: typeForm === "registro" ? "" : dataEdit.html,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSaveSection(values);
            resetForm({
              name: "",
              description: "",
              html: "",
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {typeForm === "registro" ? "Nueva sección" : "Editar sección"}
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
                        value={codeSection}
                        disabled
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={7} lg={7}>
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
                  <Grid item xs={12} md={2} lg={2}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Ver</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={hiddenSection}
                            onChange={handleHiddenSection}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <Field
                        name="description"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Descripción"
                        fullWidth
                        error={errors.description && touched.description}
                        helperText={touched.description && errors.description}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Usar HTML</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={htmlSwitch}
                            onChange={handleHtmlSwith}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  {htmlSwitch ? (
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox>
                        <Field
                          name="html"
                          type="text"
                          as={MDInput}
                          variant="standard"
                          multiline
                          rows={5}
                          label="HTML"
                          fullWidth
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                  ) : null}
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleClose} variant="outlined" color="info">
                  Cerrar
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
  htmlSwitch: false,
  hiddenSection: false,
  dataEdit: PropTypes.shape({
    code: "",
    description: "",
    hidden: false,
    html: "",
    name: "",
    order: 0,
    useHtml: false,
  }),
};

DialogForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  handleHtmlSwith: PropTypes.func.isRequired,
  htmlSwitch: false,
  hiddenSection: PropTypes.bool,
  handleHiddenSection: PropTypes.func.isRequired,
  handleSaveSection: PropTypes.func.isRequired,
  dataEdit: PropTypes.shape({
    code: PropTypes.string,
    description: PropTypes.string,
    hidden: PropTypes.bool,
    html: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    useHtml: PropTypes.bool,
  }),
  codeSection: PropTypes.string.isRequired,
};

export default DialogForm;
