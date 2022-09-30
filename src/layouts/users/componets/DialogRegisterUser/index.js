import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import * as Yup from "yup";
import MDInput from "components/MDInput";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const objectValidation = {
  firstName: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Nombres debe tener máximo 40 dígitos."),
  lastName: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Apellidos debe tener máximo 40 dígitos."),
  email: Yup.string()
    .email("Utilizar formato ejemplo@email.com")
    .required("El Correo electrónico es Requerido"),
  phoneNumber: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Teléfono debe tener máximo 10 dígitos."),
  nuip: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Número de documento debe tener máximo 10 dígitos."),
  address: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Dirección debe tener máximo 40 dígitos."),
};

// const validationSchema = Yup.object().shape();

function DialogRegisterUser({
  open,
  handleClose,
  handleRegisterUser,
  loading,
  listIdentification,
  typeForm,
  dataUserEdit,
  setTypeIdentification,
  typeIdentification,
}) {
  const [validationSchema, setValidationSchema] = useState(Yup.object().shape(objectValidation));
  const handleChange = (event) => {
    setTypeIdentification(event.target.value);
  };

  useEffect(() => {
    if (typeForm === "registro") {
      const newObjectValidation = {
        ...objectValidation,
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Las contraseñas deben coincidir"
        ),
        userName: Yup.string()
          .required("Campo requerido")
          .max(40, "El campo Usuario debe tener máximo 40 dígitos."),
        password: Yup.string()
          .required("Campo requerido")
          .max(40, "El campo Contraseña debe tener máximo 40 dígitos.")
          .min(8, "El campo contraseña debe tener mínimo 8 digitos.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
            "El campo contraseña debe tener mínimo un número, mínimo una letra minúscula y mínimo una mayúscula."
          ),
      };
      setValidationSchema(newObjectValidation);
    }
  }, []);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <MDBox>
          <Formik
            initialValues={{
              firstName: typeForm === "registro" ? "" : dataUserEdit.firstName,
              lastName: typeForm === "registro" ? "" : dataUserEdit.lastName,
              email: typeForm === "registro" ? "" : dataUserEdit.email,
              userName: typeForm === "registro" ? "" : dataUserEdit.userName,
              password: typeForm === "registro" ? "" : "edit",
              confirmPassword: typeForm === "registro" ? "" : "edit",
              phoneNumber: typeForm === "registro" ? "" : dataUserEdit.phoneNumber,
              role: typeForm === "registro" ? "" : dataUserEdit.role,
              identificationType: typeForm === "registro" ? "" : dataUserEdit.identificationType,
              nuip: typeForm === "registro" ? "" : dataUserEdit.nuip,
              address: typeForm === "registro" ? "" : dataUserEdit.address,
              area: typeForm === "registro" ? "" : dataUserEdit.area,
              position: typeForm === "registro" ? "" : dataUserEdit.position,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleRegisterUser(values, typeIdentification);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogTitle>
                  {typeForm === "registro" ? "Nuevo usuario" : "Editar usuario"}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2} mt={1}>
                        <Field
                          name="firstName"
                          type="text"
                          as={MDInput}
                          label="Nombres (*)"
                          variant="standard"
                          fullWidth
                          error={errors.firstName && touched.firstName}
                          helperText={touched.firstName && errors.firstName}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2} mt={1}>
                        <Field
                          name="lastName"
                          type="text"
                          as={MDInput}
                          label="Apellidos (*)"
                          fullWidth
                          variant="standard"
                          error={errors.lastName && touched.lastName}
                          helperText={touched.lastName && errors.lastName}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2} mt={1}>
                        <TextField
                          select
                          label="Tipo de documento (*)"
                          onChange={handleChange}
                          name="identificationType"
                          value={typeIdentification}
                          fullWidth
                          variant="standard"
                          id="outlined-size-normal"
                        >
                          {listIdentification.map((identification) => (
                            <MenuItem key={identification.code} value={identification.code}>
                              {identification.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="nuip"
                          type="text"
                          as={MDInput}
                          label="Número de documento (*)"
                          variant="standard"
                          fullWidth
                          error={errors.nuip && touched.nuip}
                          helperText={touched.nuip && errors.nuip}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="address"
                          type="text"
                          as={MDInput}
                          label="Dirección (*)"
                          variant="standard"
                          fullWidth
                          error={errors.address && touched.address}
                          helperText={touched.address && errors.address}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="phoneNumber"
                          type="string"
                          as={MDInput}
                          label="Teléfono (*)"
                          variant="standard"
                          fullWidth
                          error={errors.phoneNumber && touched.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="email"
                          type="email"
                          as={MDInput}
                          label="Email (*)"
                          variant="standard"
                          fullWidth
                          error={errors.email && touched.email}
                          helperText={touched.email && errors.email}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="area"
                          type="text"
                          as={MDInput}
                          label="Área"
                          variant="standard"
                          fullWidth
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="position"
                          type="text"
                          as={MDInput}
                          label="Cargo"
                          variant="standard"
                          fullWidth
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    {typeForm === "registro" ? (
                      <>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="userName"
                              type="text"
                              as={MDInput}
                              label="Usuario (*)"
                              variant="standard"
                              fullWidth
                              error={errors.userName && touched.userName}
                              helperText={touched.userName && errors.userName}
                              inputProps={{ autoComplete: "off" }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="password"
                              type="password"
                              as={MDInput}
                              label="Contraseña (*)"
                              variant="standard"
                              fullWidth
                              error={errors.password && touched.password}
                              helperText={touched.password && errors.password}
                              inputProps={{ autoComplete: "off" }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="confirmPassword"
                              type="password"
                              as={MDInput}
                              label="Confirmar contraseña (*)"
                              variant="standard"
                              fullWidth
                              error={errors.confirmPassword && touched.confirmPassword}
                              helperText={touched.confirmPassword && errors.confirmPassword}
                              inputProps={{ autoComplete: "off" }}
                            />
                          </MDBox>
                        </Grid>
                      </>
                    ) : null}
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
        </MDBox>
      </Dialog>
    </div>
  );
}

DialogRegisterUser.defaultProps = {
  open: false,
  loading: false,
  dataUserEdit: {
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    role: "",
    identificationType: "",
    nuip: "",
    address: "",
    area: "",
    position: "",
  },
  typeIdentification: "",
  setTypeIdentification: "",
};

DialogRegisterUser.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleRegisterUser: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  listIdentification: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  typeForm: PropTypes.string.isRequired,
  dataUserEdit: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    phoneNumber: PropTypes.string,
    role: PropTypes.string,
    identificationType: PropTypes.string,
    nuip: PropTypes.string,
    address: PropTypes.string,
    area: PropTypes.string,
    position: PropTypes.string,
  }),
  setTypeIdentification: PropTypes.element,
  typeIdentification: PropTypes.string,
};

export default DialogRegisterUser;
