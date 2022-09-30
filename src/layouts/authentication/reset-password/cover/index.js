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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

// Service
import { forgotPassword } from "../../../../store/user/actions";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Utilizar formato ejemplo@email.com"),
  tenant: Yup.string().required("Campo requerido"),
});

const initialState = {
  email: "",
  tenant: "",
};

function Cover() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tenant, setValueTenan] = useState("");
  const [emailRecover, setEmailRecover] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();
  const tenants = useSelector(({ company }) => company.dataTenants);

  const handleChange = (event) => {
    setValueTenan(event.target.value);
  };

  // const handleChangeEmail = (event) => {
  //   console.log(event);
  //   setEmail(event.target.value);
  // };

  const handleResetPassword = async () => {
    const data = {
      email: emailRecover,
    };
    try {
      setLoading(true);
      await dispatch(forgotPassword(tenant, data));
      alert.show(
        "El correo de restablecimiento de contraseña se ha enviado a su correo electrónico.",
        { position: "top right" }
      );
      setLoading(false);
      navigate("/authentication/reset-password");
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
      setLoading(false);
    }
  };

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Recuperar contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Escribe tu email y te enviaremos las instrucciones para recuperarla
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Formik initialValues={initialState} validationSchema={validationSchema}>
            {({ errors, touched }) => (
              <Form>
                <MDBox mb={4}>
                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    variant="standard"
                    label="Email"
                    onChange={(value) => {
                      setEmailRecover(value.target.value);
                    }}
                    value={emailRecover}
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    inputProps={{ autoComplete: "off" }}
                  />
                </MDBox>
                <MDBox mb={4}>
                  <TextField
                    select
                    label="Seleccionar empresa"
                    onChange={handleChange}
                    fullWidth
                    value={tenant}
                    variant="standard"
                    id="outlined-size-normal"
                  >
                    {tenants.map((tenan) => (
                      <MenuItem key={tenan.id} value={tenan.id}>
                        {tenan.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </MDBox>
                {loading ? (
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      <CircularProgress color="secondary" />
                    </Grid>
                  </Grid>
                ) : (
                  <MDBox mt={6} mb={1}>
                    <MDButton
                      onClick={handleResetPassword}
                      type="submit"
                      variant="gradient"
                      color="info"
                      fullWidth
                    >
                      Enviar
                    </MDButton>
                  </MDBox>
                )}
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
