import { Autocomplete, CircularProgress } from "@mui/material";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import useMediaQuery from "@mui/material/useMediaQuery";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDTypography from "../../components/MDTypography";
import logo from "../../assets/images/logos/logo.svg";
import SectionTwo from "../../image/SectionTwo.png";

// eslint-disable-next-line import/named
import {
  getServiceWithoutToken,
  resetServiceWithoutToken,
} from "../../store/generateService/actions";
import Basic from "../authentication/sign-in/basic/index";
import { getTenantsWithoutToken } from "../../store/tenant/actions";
import { getIdentificationTypes } from "../../store/identificationTypes/actions";
import { createSolicitudesAnonymous } from "../../store/solicitudes/actions";

const initialValues = {
  name: "",
  identificationType: { name: "", code: "" },
  nIdentification: "",
  address: "",
  email: "",
  phoneNumber: "",
  contactName: "",
  serviceId: { nameService: "", id: "" },
  tenant: { name: "", id: "" },
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  email: Yup.string().required("Campo requerido"),
  address: Yup.string().required("Campo requerido"),
  phoneNumber: Yup.string().required("Campo requerido"),
  nIdentification: Yup.string().required("Campo requerido"),
});

const LandingPage = () => {
  const [tenantSelected, setTenantSelected] = useState("");
  const [typeSelect, setTypeSelect] = useState("");
  const [serviceSelect, setServiceSelect] = useState("");
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();
  const services = useSelector(({ service }) => service.dataService);
  const tenants = useSelector(({ company }) => company.dataTenants);
  const typesIdentity = useSelector(({ identificationTypes }) => identificationTypes.data);
  const matches = useMediaQuery("(min-width:1030px)");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const newData = {
        name: values.name,
        identificationType: values.identificationType.code,
        nIdentification: values.nIdentification.toString(),
        address: values.address,
        email: values.email,
        phoneNumber: values.phoneNumber.toString(),
        contactName: values.contactName,
        serviceId: values.serviceId.id,
      };
      await dispatch(createSolicitudesAnonymous(tenantSelected.id, newData));
      setLoading(false);
      alert.success("Se ha enviado la solicitud correctamente");
      resetForm();
      setTenantSelected(null);
      setTypeSelect(null);
      setServiceSelect(null);
    } catch (e) {
      setLoading(false);
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (tenantSelected !== "") {
        await dispatch(getServiceWithoutToken(tenantSelected.id));
      }
    })();
  }, [tenantSelected]);

  useEffect(() => {
    (async () => {
      await dispatch(getTenantsWithoutToken());
      await dispatch(getIdentificationTypes());
    })();
  }, []);
  return (
    <PageLayout background="white">
      <MDBox
        width="100vw"
        height="100%"
        sx={{
          backgroundImage: `url(${SectionTwo})`,
          backgroundRepeat: "no-repeat",
          minHeight: "100vH",
          backgroundPositionX: "right",
        }}
      >
        <MDBox component="img" src={logo} width="20%" height="20%" style={{ marginLeft: "40%" }} />
        <Grid container pl={5} spacing={2}>
          <Grid item xs={12} sm={!matches ? 12 : 5} md={!matches ? 12 : 5}>
            <Basic />
          </Grid>
          {matches ? (
            <Grid item xs={12} sm={1} md={1}>
              <Divider
                orientation="vertical"
                style={{ background: "black", height: "85%", marginTop: "25%", width: "3px" }}
                variant="inset"
                flexItem
              />
            </Grid>
          ) : (
            <Grid item xs={12} sm={1} md={11}>
              <Divider
                style={{ background: "black", marginLeft: "50px", width: "3px" }}
                variant="inset"
                flexItem
              />
            </Grid>
          )}

          <Grid item xs={12} sm={!matches ? 12 : 5} md={!matches ? 12 : 5}>
            <MDBox pt={4} pb={3} px={1} role="form">
              <MDTypography
                variant="h4"
                textAlign="center"
                fontWeight="medium"
                color="#1B4E7C"
                mt={1}
              >
                Solicitud de servicio
              </MDTypography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form>
                    <Grid container spacing={2} px={2}>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Autocomplete
                          id="tenant"
                          defaultValue={initialValues.tenant}
                          name="tenant"
                          options={tenants}
                          value={tenantSelected}
                          getOptionLabel={(option) => option.name ?? option}
                          onChange={(e, value) => {
                            setFieldValue("tenant", value !== null ? value : initialValues.tenant);
                            setTenantSelected(value);
                            if (!value) {
                              dispatch(resetServiceWithoutToken());
                              setFieldValue("serviceId", { nameService: "", id: "" });
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Empresa"
                              variant="standard"
                              fullWidth
                              required
                              name="tenant"
                              InputLabelProps={{ shrink: true }}
                              error={errors.tenant && touched.tenant}
                              helperText={touched.tenant && errors.tenant}
                            />
                          )}
                        />
                      </Grid>
                      <MDTypography
                        variant="h5"
                        textAlign="center"
                        fontWeight="medium"
                        color="#1B4E7C"
                        style={{ marginLeft: "37%", marginTop: "2%" }}
                      >
                        Datos del cliente
                      </MDTypography>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          label="Nombre completo o razón social"
                          name="name"
                          required
                          error={errors.name && touched.name}
                          helperText={touched.name && errors.name}
                          inputProps={{ autoComplete: "off" }}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Autocomplete
                          id="identificationType"
                          defaultValue={initialValues.identificationType}
                          name="identificationType"
                          options={typesIdentity}
                          value={typeSelect}
                          getOptionLabel={(option) => option.name ?? option}
                          onChange={(e, value) => {
                            setFieldValue(
                              "identificationType",
                              value !== null ? value : initialValues.identificationType
                            );
                            setTypeSelect(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Tipo de identificación"
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
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          as={TextField}
                          label="Identificación"
                          name="nIdentification"
                          fullWidth
                          required
                          inputProps={{ type: "number", autoComplete: "off" }}
                          error={errors.nIdentification && touched.nIdentification}
                          helperText={touched.nIdentification && errors.nIdentification}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          as={TextField}
                          name="email"
                          fullWidth
                          label="Correo electrónico"
                          required
                          inputProps={{ type: "email", autoComplete: "off" }}
                          error={errors.email && touched.email}
                          helperText={touched.email && errors.email}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
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
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          required
                          label="Teléfono"
                          name="phoneNumber"
                          inputProps={{ autoComplete: "off", type: "number" }}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                          error={errors.phoneNumber && touched.phoneNumber}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          as={TextField}
                          fullWidth
                          label="Nombre de contacto"
                          name="contactName"
                          inputProps={{ autoComplete: "off" }}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6}>
                        <Autocomplete
                          id="serviceId"
                          defaultValue={initialValues.serviceId}
                          name="serviceId"
                          options={services}
                          value={serviceSelect}
                          getOptionLabel={(option) => option.nameService ?? option}
                          onChange={(e, value) => {
                            setFieldValue(
                              "serviceId",
                              value !== null ? value : initialValues.serviceId
                            );
                            setFieldValue("tenant", null);
                            setServiceSelect(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Servicio"
                              variant="standard"
                              fullWidth
                              required
                              name="serviceId"
                              InputLabelProps={{ shrink: true }}
                              error={errors.serviceId && touched.serviceId}
                              helperText={touched.serviceId && errors.serviceId}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                    <MDBox mt={4} mb={1} pr={1}>
                      {loading === true ? (
                        <Grid container justifyContent="center" alignItems="center">
                          <Grid item>
                            <CircularProgress color="secondary" />
                          </Grid>
                        </Grid>
                      ) : (
                        <MDButton
                          type="submit"
                          variant="gradient"
                          style={{ backgroundColor: "#96BE1F", color: "#3C3C3B" }}
                          fullWidth
                        >
                          Enviar solicitud
                        </MDButton>
                      )}
                    </MDBox>
                  </Form>
                )}
              </Formik>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
};

export default LandingPage;
