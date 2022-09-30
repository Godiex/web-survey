import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// @mui material components
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
// Authentication layout components
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import { useQuery } from "utils/utils";
import { login, loginWithToken, getPermissionsUserAction } from "../../../../store/auth/actions";
import { getDetailTenantById } from "../../../../store/tenant/actions";
import { ENDPOINT } from "../../../../services/httpRequest";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Campo requerido"),
  password: Yup.string().required("Campo requerido"),
});

const initialState = {
  email: "",
  password: "",
};

function Basic() {
  const query = useQuery();
  const isErroExpired = query.get("session-expired");
  const currentuserData = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const redirectByUser = (profileData) => {
    if (profileData.userType && profileData.userType === "Customer")
      navigate("/app-cliente/dashboard");
    else navigate("/dashboard");
  };
  const urlTenan = window.location;
  const [loading, setLoading] = useState(false);
  const [listTenans, setListTenans] = useState([]);
  const [tenant, setValueTenan] = useState("root");

  const handleSubmit = async (value) => {
    try {
      setLoading(true);
      await dispatch(login(value.email, value.password, tenant));
      await dispatch(getPermissionsUserAction());
      await dispatch(getDetailTenantById(tenant));
      const user = await dispatch(loginWithToken());
      localStorage.setItem("userName", user.userName);
      localStorage.setItem("isRefresh", true);
      if (user) {
        redirectByUser(user);
      }
      alert.show("Bienvenido", { position: "top right" });
      setLoading(false);
    } catch (e) {
      alert.error(`Error al momento de iniciar sesión, ${e.Messages[0]}`, {
        position: "top right",
      });
      setLoading(false);
    }
  };

  const getListTenans = async () => {
    try {
      const response = await axios.get(`${ENDPOINT}/tenants/basictenantinfo`);
      setListTenans(response.data);
    } catch (error) {
      alert.error("Error al obtener empresas", { position: "top right" });
    }
  };

  useEffect(() => {
    if (urlTenan.hostname !== "localhost") {
      const tenanAuto = urlTenan.hostname.split(".localhost", 1);
      setValueTenan(tenanAuto);
    } else {
      getListTenans();
    }
  }, []);
  useEffect(() => {
    if (isErroExpired) {
      alert.error(`Error se expiró la sesión o ya tiene una sesión iniciada en otro equipo`, {
        position: "top right",
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && currentuserData.userType) redirectByUser(currentuserData);
  }, []);

  // useEffect(() => {
  //   if (urlTenan.hostname !== "localhost") {
  //     const tenanAuto = urlTenan.hostname.split(".localhost", 1);
  //     setValueTenan(tenanAuto);
  //   } else {
  //     getListTenans();
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && currentuserData.userType) redirectByUser(currentuserData);
  }, []);

  useEffect(() => {
    if (urlTenan.hostname !== "www.aidcol.com") {
      const tenanAuto = urlTenan.hostname.split(".aidcol.com", 1);
      setValueTenan(tenanAuto);
    } else {
      getListTenans();
    }
  }, []);

  const handleChange = (event) => {
    setValueTenan(event.target.value);
  };

  return (
    <MDBox pt={4} pb={3} px={5}>
      <MDTypography variant="h4" textAlign="center" fontWeight="medium" color="#1B4E7C" mt={1}>
        Iniciar Sesión
      </MDTypography>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <MDBox mb={2}>
              <Field
                as={MDInput}
                type="email"
                name="email"
                label="Usuario"
                fullWidth
                variant="standard"
                error={errors.email && touched.email}
                helperText={touched.email && errors.email}
                inputProps={{ autoComplete: "off" }}
              />
            </MDBox>
            <MDBox mb={2}>
              <Field
                as={MDInput}
                type="password"
                name="password"
                label="Contraseña"
                variant="standard"
                fullWidth
                error={errors.password && touched.password}
                helperText={touched.password && errors.password}
                inputProps={{ autoComplete: "off" }}
              />
            </MDBox>
            {listTenans.length > 0 ? (
              <MDBox mb={2}>
                <TextField
                  select
                  label="Seleccionar empresa"
                  onChange={handleChange}
                  value={tenant}
                  fullWidth
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
            ) : null}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MDBox textAlign="center">
                  <MDTypography variant="button" color="text">
                    <MDTypography
                      component={Link}
                      to="/authentication/password-reset/cover"
                      variant="button"
                      style={{ color: "#FF7006" }}
                      fontWeight="medium"
                    >
                      ¿Olvidaste tu contraseña?
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </Grid>
            </Grid>

            <MDBox mt={4} mb={1}>
              {loading === true ? (
                <Grid container justifyContent="center" alignItems="center">
                  <Grid item>
                    <CircularProgress color="secondary" />
                  </Grid>
                </Grid>
              ) : (
                <MDButton
                  disabled={loading}
                  type="submit"
                  variant="gradient"
                  style={{ backgroundColor: "#96BE1F", color: "#3C3C3B" }}
                  fullWidth
                >
                  {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                </MDButton>
              )}
            </MDBox>
          </Form>
        )}
      </Formik>
    </MDBox>
  );
}

export default Basic;
