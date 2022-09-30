// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Settings page components
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Autocomplete, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import MDButton from "../MDButton";
import { updateProfile } from "../../store/profile/actions";
import { getIdentificationTypes } from "../../store/identificationTypes/actions";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Campo requerido"),
  lastName: Yup.string().required("Campo requerido"),
  email: Yup.string().required("Campo requerido"),
});

const getNameAdminOrCustomer = (user, typeUser) =>
  typeUser === "admin" ? user?.tenantSettings?.name : user?.firstName;

function BasicInfo({ infoUser, typeUser }) {
  const [loading, setLoading] = useState(false);
  const typesIdentity = useSelector(({ identificationTypes }) => identificationTypes.data);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);
  const dispatch = useDispatch();
  const alert = useAlert();

  const type = infoUser && typesIdentity.find((e) => e.code === infoUser.identificationType);
  const initialState = {
    firstName: infoUser ? getNameAdminOrCustomer(infoUser, typeUser) : "",
    lastName: infoUser ? infoUser?.lastName : "",
    phoneNumber: infoUser ? infoUser?.phoneNumber : "",
    email: infoUser ? infoUser?.email : "",
    identificationType: infoUser ? type : { code: "", name: "" },
    nuip: infoUser ? parseInt(infoUser?.nuip, 10) : "", // numero de identificacion personal
    address: infoUser ? infoUser?.address : "", // Dirección
    area: infoUser ? infoUser?.area : "", // Área
    position: infoUser ? infoUser?.position : "", // Cargo
  };

  const handleSubmit = async (values) => {
    try {
      // eslint-disable-next-line no-param-reassign
      delete values.userName;
      // eslint-disable-next-line no-param-reassign
      delete values.imageUrl;
      setLoading(true);
      const newData = {
        // eslint-disable-next-line react/prop-types
        id: infoUser.id,
        ...values,
        identificationType: values.identificationType.code,
        phoneNumber: values.phoneNumber.toString(),
        nuip: values.nuip.toString(),
      };
      await dispatch(updateProfile(newData));
      alert.success("Actualizado correctamente");
      setLoading(false);
    } catch (e) {
      alert.error("Ocurrió un error al actualizar la información");
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await dispatch(getIdentificationTypes());
    })();
  }, [dispatch]);
  return (
    <Card id="basic-info" sx={{ overflow: "visible" }}>
      <MDBox p={3}>
        <MDTypography variant="h5">Información básica</MDTypography>
      </MDBox>
      {infoUser.firstName === "" ? (
        <Grid container justify="center" align="center">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      ) : (
        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <MDBox pb={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label={typeUser === "admin" ? "Primer nombre" : "Razón social o nombre"}
                      name="firstName"
                      required
                      error={errors.firstName && touched.firstName}
                      helperText={touched.firstName && errors.firstName}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  {typeUser === "admin" && (
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        fullWidth
                        label="Apellido"
                        name="lastName"
                        required
                        error={errors.lastName && touched.lastName}
                        helperText={touched.lastName && errors.lastName}
                        inputProps={{ autoComplete: "off" }}
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      label="Número de teléfono"
                      name="phoneNumber"
                      fullWidth
                      inputProps={{ type: "number", autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="email"
                      disabled
                      fullWidth
                      label="Correo electrónico"
                      inputProps={{ type: "email", autoComplete: "off" }}
                      required
                      error={errors.email && touched.email}
                      helperText={touched.email && errors.email}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="identificationType"
                      defaultValue={initialState.identificationType}
                      name="identificationType"
                      options={typesIdentity}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "identificationType",
                          value !== null ? value : initialState.identificationType
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tipo de documento"
                          variant="standard"
                          fullWidth
                          required
                          name="identificationType"
                          InputLabelProps={{ shrink: true }}
                          error={errors.identificationType && touched.identificationType}
                          helperText={touched.identificationType && errors.identificationType}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="nuip"
                      fullWidth
                      label="Documento de identidad"
                      inputProps={{ type: "number", autoComplete: "off" }}
                      required
                      error={errors.nuip && touched.nuip}
                      helperText={touched.nuip && errors.nuip}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      name="address"
                      fullWidth
                      label="Dirección"
                      inputProps={{ autoComplete: "off" }}
                      required
                      error={errors.address && touched.address}
                      helperText={touched.address && errors.address}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  {typeUser === "admin" && (
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="area"
                        fullWidth
                        label="Área"
                        inputProps={{ autoComplete: "off" }}
                        required
                        error={errors.area && touched.area}
                        helperText={touched.area && errors.area}
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                      />
                    </Grid>
                  )}
                  {typeUser === "admin" && (
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="position"
                        fullWidth
                        label="Cargo"
                        inputProps={{ autoComplete: "off" }}
                        required
                        error={errors.position && touched.position}
                        helperText={touched.position && errors.position}
                        InputLabelProps={{ shrink: true }}
                        variant="standard"
                      />
                    </Grid>
                  )}
                </Grid>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-end"
                  flexWrap="wrap"
                  marginTop={2}
                >
                  {loading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    <MDBox ml="auto">
                      <MDButton
                        type="submit"
                        variant="gradient"
                        color="dark"
                        size="small"
                        sx={() => MDButtonCustomByTenant(primaryColor)}
                      >
                        Guardar cambios
                      </MDButton>
                    </MDBox>
                  )}
                </MDBox>
              </MDBox>
            </Form>
          )}
        </Formik>
      )}
    </Card>
  );
}

BasicInfo.defaultProps = {
  typeUser: "admin",
};

BasicInfo.propTypes = {
  infoUser: PropTypes.shape({
    identificationType: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    nuip: PropTypes.string,
    address: PropTypes.string,
    area: PropTypes.string,
    position: PropTypes.string,
  }).isRequired,
  typeUser: PropTypes.string,
};

export default BasicInfo;
