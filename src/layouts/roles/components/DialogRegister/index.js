import * as React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
});

function DialogRegister({
  open,
  handleClose,
  handleCreateRole,
  loading,
  dataEditRole,
  typeAction,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <Formik
          initialValues={{
            name: typeAction === "registrar" ? "" : dataEditRole.name,
            description: typeAction === "registrar" ? "" : dataEditRole.description,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleCreateRole(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>{typeAction === "registrar" ? "Nuevo Rol" : "Editar Rol"}</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
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
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={4}>
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
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleClose} variant="outlined" color="info">
                  Cancelar
                </MDButton>
                <MDButton type="submit" disabled={loading} variant="gradient" color="info">
                  {loading ? "Cargando..." : "Guardar"}
                </MDButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

DialogRegister.defaultProps = {
  open: false,
  loading: false,
  dataEditRole: {
    name: "",
    description: "",
  },
};

DialogRegister.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleCreateRole: PropTypes.func.isRequired,
  dataEditRole: PropTypes.shape({ name: PropTypes.string, description: PropTypes.string }),
  typeAction: PropTypes.string.isRequired,
};

export default DialogRegister;
