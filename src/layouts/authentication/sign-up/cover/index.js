/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import { Field, Form, Formik } from "formik";

import Grid from "@mui/material/Grid";

import * as Yup from "yup";

import httpRequest from "../../../../services/httpRequest";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Campo requerido"),
  lastName: Yup.string().required("Campo requerido"),
  email: Yup.string()
    .email("Utilizar formato ejemplo@email.com")
    .required("El Correo electrónico es Requerido"),
  userName: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
  confirmPassword: Yup.string().required("Campo requerido"),
  phoneNumber: Yup.string().required("Campo requerido"),
});

function Cover() {
  const handleRegisterUser = async (dataUser) => {
    await httpRequest.create(`identity/register`, dataUser);
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Registrate
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa los datos para registrarte
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              userName: "",
              password: "",
              confirmPassword: "",
              phoneNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleRegisterUser(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <MDBox mb={2}>
                      <Field
                        name="firstName"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Nombres"
                        fullWidth
                        error={errors.firstName && touched.firstName}
                        helperText={touched.firstName && errors.firstName}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <MDBox mb={2}>
                      <Field
                        name="lastName"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Apellidos"
                        fullWidth
                        error={errors.lastName && touched.lastName}
                        helperText={touched.lastName && errors.lastName}
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
                        variant="standard"
                        label="Email"
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
                        name="userName"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Usuario"
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
                        variant="standard"
                        label="Contraseña"
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
                        variant="standard"
                        label="Confirmar contraseña"
                        fullWidth
                        error={errors.confirmPassword && touched.confirmPassword}
                        helperText={touched.confirmPassword && errors.confirmPassword}
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
                        variant="standard"
                        label="Teléfono"
                        fullWidth
                        error={errors.phoneNumber && touched.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <MDBox mt={4} mb={1}>
                    <MDButton type="submit" variant="gradient" color="info">
                      Registrar
                    </MDButton>
                  </MDBox>
                </Grid>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}
export default Cover;
