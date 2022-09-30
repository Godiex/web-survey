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
import axios from "axios";
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
import { useDispatch } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { useAlert } from "react-alert";
import { useLocation } from "@reach/router";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

import * as Yup from "yup";

import { Field, Form, Formik } from "formik";

// Service
import { resetPassword } from "../../../store/user/actions";
import { ENDPOINT } from "../../../services/httpRequest";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Utilizar formato ejemplo@email.com"),
  tenant: Yup.string().required("Campo requerido"),
  password: Yup.string()
    .required("Campo requerido")
    .min(8, "El campo contraseña debe tener mínimo 8 digitos.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "El campo contraseña debe tener mínimo un número, mínimo una letra minúscula y mínimo una mayúscula."
    ),
});

const initialState = {
  email: "",
  tenant: "",
};

function PasswordReset() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [emailRecover, setEmailRecover] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [tokenUser, setToken] = useState(null);
  const [tenant, setValueTenan] = useState("");
  const [listTenans, setListTenans] = useState([]);

  const alert = useAlert();

  // const handleChangeEmail = (event) => {
  //   console.log(event);
  //   setEmail(event.target.value);
  // };

  const useQuery = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  };

  const handleChange = (event) => {
    setValueTenan(event.target.value);
  };

  const query = useQuery();
  const [queryItem] = useState(query.get("Token"));

  const getListTenans = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/tenants/basictenantinfo`);
      setListTenans(response.data);
    } catch (error) {
      alert.error("Error al obtener empresas", { position: "top right" });
    }
  };

  useEffect(() => {
    getListTenans();
  }, []);

  useEffect(() => {
    if (queryItem !== null) {
      setToken(queryItem);
    }
  }, [queryItem]);

  const handleResetPassword = async () => {
    const data = {
      email: emailRecover,
      password: newPassword,
      token: tokenUser,
    };
    try {
      setLoading(true);
      await dispatch(resetPassword(tenant, data));
      alert.success("Contraseña cambiada correctamente", { position: "top right" });
      setLoading(false);
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
          mt={-5}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Recuperar contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Escribe tu email y la contraseña nueva
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
                  <Field
                    name="password"
                    as={TextField}
                    variant="standard"
                    label="Contraseña"
                    onChange={(value) => {
                      setNewPassword(value.target.value);
                    }}
                    value={newPassword}
                    fullWidth
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                    inputProps={{ autoComplete: "off" }}
                  />
                </MDBox>
                <MDBox mb={4}>
                  <Field
                    name="email"
                    type="email"
                    as={TextField}
                    variant="standard"
                    label="Token"
                    onChange={(value) => {
                      setToken(value.target.value);
                    }}
                    value={tokenUser}
                    fullWidth
                    disabled={queryItem}
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
                    {listTenans.map((tenan) => (
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

export default PasswordReset;
