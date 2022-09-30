import {
  Autocomplete,
  CssBaseline,
  Dialog,
  Slide,
  TextField,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, forwardRef } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
// import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MDBox from "./MDBox";
import MDInput from "./MDInput";
import GeolocalisationMarkers from "./Map/GeolocalisationMarkers";
import MDButton from "./MDButton";
import httpRequest from "../services/httpRequest";
import AutocompleteGoogleMap from "./Map/AutocompleteGoogleMap";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Razón social de la empresa o nombre debe tener máximo 40 dígitos."),
  email: Yup.string().required("Campo requerido"),
  employeesNumber: Yup.number().test(
    "Is positive?",
    "No puede ser negativo.",
    (value) => value > 0
  ),
  nIdentification: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Número de documento debe tener máximo 10 dígitos."),
  arl: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Arl debe tener máximo 40 dígitos."),
  totalSquareMeters: Yup.number()
    .required("Campo requerido")
    .test("Is positive?", "No puede ser negativo.", (value) => value > 0),
  squareMetersBuilt: Yup.number()
    .required("Campo requerido")
    .test("Is positive?", "No puede ser negativo.", (value) => value > 0),
  representativeName: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Nombre  del representante legal debe tener máximo 40 dígitos."),
  nuip: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Número de documento del representante legal debe tener máximo 10 dígitos."),
  addressRepresentative: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo dirección del representante legal debe tener máximo 40 dígitos."),
  emailRepresentative: Yup.string().required("Campo requerido"),
  identificationType: Yup.object().required("Campo requerido"),
});

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const levelsRisk = [
  { value: 0, name: "NIVEL 1" },
  { value: 1, name: "NIVEL 2" },
  { value: 2, name: "NIVEL 3" },
  { value: 3, name: "NIVEL 4" },
  { value: 4, name: "NIVEL 5" },
  { value: 5, name: "NIVEL 6" },
];
const industrialOptions = [
  { value: true, name: "SI" },
  { value: false, name: "NO" },
];

// eslint-disable-next-line react/prop-types
const DialogFullScreen = ({
  open,
  onClose,
  typeForm,
  dataClient,
  listIdentification,
  listEconomicActivities,
  so,
  get,
  associatedRequest,
}) => {
  const initialState = {
    // eslint-disable-next-line no-nested-ternary
    name: so ? so.name[0] : typeForm === "registro" ? "" : dataClient.name,
    // eslint-disable-next-line no-nested-ternary
    nIdentification: so
      ? so.nIdentification
      : typeForm === "registro"
      ? ""
      : dataClient.nIdentification,
    // eslint-disable-next-line no-nested-ternary
    phoneNumber: so ? so.phoneNumber : typeForm === "registro" ? "" : dataClient.phoneNumber,
    // eslint-disable-next-line no-nested-ternary
    email: so ? so.email : typeForm === "registro" ? "" : dataClient.email,
    arl: typeForm === "registro" ? "" : dataClient.arl,
    economicActivityCode:
      typeForm === "registro"
        ? { code: "", name: "" }
        : listEconomicActivities.find((e) => e.code === dataClient.economicActivityCode),
    identiTypeRepresentative:
      typeForm === "registro"
        ? { code: "", name: "" }
        : !!dataClient &&
          dataClient.customerDetail &&
          dataClient.customerDetail.legalRepresentative &&
          listIdentification.find(
            (e) => e.code === dataClient.customerDetail.legalRepresentative.identificationType
          ),
    // eslint-disable-next-line no-nested-ternary
    identificationType: so
      ? listIdentification.find((e) => e.code === so.identificationType)
      : typeForm === "registro"
      ? { code: "", name: "" }
      : listIdentification.find((e) => e.code === dataClient.identificationType),
    employeesNumber:
      typeForm === "registro"
        ? 0
        : !!dataClient && !!dataClient.customerDetail && dataClient.customerDetail.employeesNumber,
    riskLevel:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          levelsRisk.find((e) => e.name === dataClient.customerDetail.riskLevel),
    totalSquareMeters:
      typeForm === "registro"
        ? 0
        : !!dataClient &&
          !!dataClient.customerDetail &&
          dataClient.customerDetail.totalSquareMeters,
    squareMetersBuilt:
      typeForm === "registro"
        ? 0
        : !!dataClient &&
          !!dataClient.customerDetail &&
          dataClient.customerDetail.squareMetersBuilt,
    representativeName:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          !!dataClient.customerDetail.legalRepresentative &&
          dataClient.customerDetail.legalRepresentative.name,
    nuip:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          !!dataClient.customerDetail.legalRepresentative &&
          dataClient.customerDetail.legalRepresentative.nuip,
    addressRepresentative:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          !!dataClient.customerDetail.legalRepresentative &&
          dataClient.customerDetail.legalRepresentative.address,
    phoneNumberRepresentative:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          !!dataClient.customerDetail.legalRepresentative &&
          dataClient.customerDetail.legalRepresentative.phoneNumber,
    emailRepresentative:
      typeForm === "registro"
        ? ""
        : !!dataClient &&
          !!dataClient.customerDetail &&
          !!dataClient.customerDetail.legalRepresentative &&
          dataClient.customerDetail.legalRepresentative.email,
    industrial:
      typeForm === "registro"
        ? { value: false, name: "NO" }
        : !!dataClient && {
            value: dataClient?.industrial,
            name: dataClient?.industrial ? "SI" : "NO",
          },
  };

  const position = useSelector(({ map }) => map.location);
  const direction = useSelector(({ map }) => map.directionString);
  const alert = useAlert();
  const handleRegisterClients = async (values) => {
    const dataRegister = {
      id: typeForm === "registro" ? "" : dataClient.id,
      name: values.name,
      identificationType: values.identificationType.code,
      nIdentification: values.nIdentification,
      address: direction,
      phoneNumber: values.phoneNumber,
      email: values.email,
      economicActivityCode: values.economicActivityCode.code,
      arl: values.arl,
      industrial: values.industrial.value,
      geographicalCoordinates: {
        latitude: position.lat.toString(),
        longitude: position.lng.toString(),
      },
      customerDetail: {
        riskLevel: values.riskLevel.value,
        employeesNumber: values.employeesNumber,
        totalSquareMeters: values.totalSquareMeters,
        squareMetersBuilt: values.squareMetersBuilt,
        legalRepresentative: {
          name: values.representativeName,
          identificationType: values.identiTypeRepresentative.code,
          nuip: values.nuip,
          address: values.addressRepresentative,
          phoneNumber: values.phoneNumberRepresentative,
          email: values.emailRepresentative,
        },
      },
    };
    try {
      if (typeForm === "registro") {
        const idNewCustomer = await httpRequest.create(`customers/create`, dataRegister);
        if (typeof idNewCustomer === "string") {
          alert.success("Cliente creado correctamente", { position: "top right" });
          onClose();
          if (associatedRequest !== null) await associatedRequest({ item: { id: idNewCustomer } });
        } else {
          alert.error("Error al momento de crear el cliente", { position: "top right" });
        }
      } else {
        const idCustomer = await httpRequest.update(
          `customers/${dataClient.id}/update`,
          "",
          dataRegister
        );
        if (typeof idCustomer === "string") {
          alert.success("Cliente actualizado correctamente", { position: "top right" });
          onClose();
        } else {
          alert.error("Error al momento de actualizar el cliente", { position: "top right" });
        }
      }
    } catch (e) {
      alert.error(
        `Error al momento de ${typeForm === "registro" ? "crear" : "actualizar"} el cliente`,
        { position: "top right" }
      );
    }

    await get();
  };
  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
      <CssBaseline />
      <ElevationScroll>
        <AppBar color="dark">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} color="inherit" variant="h6" component="div">
              {typeForm === "registro" ? "Nuevo cliente asociado" : "Editar cliente asociado"}
            </Typography>
            <Button autoFocus color="inherit" onClick={onClose}>
              Cerrar
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Container>
        <Box sx={{ my: 2 }}>
          <Grid container spacing={3} style={{ padding: "3.5rem 0 0 0" }}>
            <Grid item xs={5}>
              <Grid container spacing={3}>
                <Formik
                  initialValues={initialState}
                  validationSchema={validationSchema}
                  onSubmit={(values) => {
                    handleRegisterClients(values);
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form>
                      <Grid container spacing={1} style={{ marginTop: "15px" }}>
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <AutocompleteGoogleMap
                            defaultValue={typeForm === "registro" ? null : dataClient.address}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="name"
                              type="text"
                              as={MDInput}
                              label="Razón social de la empresa o nombre"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.name && touched.name}
                              helperText={touched.name && errors.name}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="identificationType"
                            defaultValue={initialState.identificationType}
                            name="identificationType"
                            options={listIdentification}
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
                                required
                                fullWidth
                                name="identificationType"
                                InputLabelProps={{ shrink: true }}
                                error={errors.identificationType && touched.identificationType}
                                helperText={touched.identificationType && errors.identificationType}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="nIdentification"
                              type="text"
                              as={MDInput}
                              label="Número de documento"
                              required
                              variant="standard"
                              fullWidth
                              error={errors.nIdentification && touched.nIdentification}
                              helperText={touched.nIdentification && errors.nIdentification}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="phoneNumber"
                              type="string"
                              as={MDInput}
                              label="Teléfono"
                              variant="standard"
                              fullWidth
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="email"
                              type="email"
                              required
                              as={MDInput}
                              label="Email"
                              error={errors.email && touched.email}
                              helperText={touched.email && errors.email}
                              variant="standard"
                              fullWidth
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="economicActivityCode"
                            defaultValue={initialState.economicActivityCode}
                            name="economicActivityCode"
                            options={listEconomicActivities}
                            getOptionLabel={(option) => option.name ?? option}
                            onChange={(e, value) => {
                              setFieldValue(
                                "economicActivityCode",
                                value !== null ? value : initialState.economicActivityCode
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Código actividad económica"
                                variant="standard"
                                required
                                fullWidth
                                name="economicActivityCode"
                                InputLabelProps={{ shrink: true }}
                                error={errors.economicActivityCode && touched.economicActivityCode}
                                helperText={
                                  touched.economicActivityCode && errors.economicActivityCode
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="arl"
                              type="text"
                              as={MDInput}
                              label="Arl"
                              required
                              variant="standard"
                              fullWidth
                              error={errors.arl && touched.arl}
                              helperText={touched.arl && errors.arl}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="employeesNumber"
                              type="number"
                              as={MDInput}
                              fullWidth
                              label="Número de trabajadores"
                              variant="standard"
                              error={errors.employeesNumber && touched.employeesNumber}
                              helperText={touched.employeesNumber && errors.employeesNumber}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Autocomplete
                              id="riskLevel"
                              defaultValue={initialState.riskLevel}
                              name="riskLevel"
                              options={levelsRisk}
                              getOptionLabel={(option) => option.name ?? option}
                              onChange={(e, riskLevel) => {
                                setFieldValue(
                                  "riskLevel",
                                  riskLevel !== null ? riskLevel : initialState.riskLevel
                                );
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Nivel de riesgo"
                                  variant="standard"
                                  required
                                  fullWidth
                                  name="riskLevel"
                                  InputLabelProps={{ shrink: true }}
                                  error={errors.riskLevel && touched.riskLevel}
                                  helperText={touched.riskLevel && errors.riskLevel}
                                />
                              )}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="totalSquareMeters"
                              type="number"
                              as={MDInput}
                              label="Total metros cuadrados"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.totalSquareMeters && touched.totalSquareMeters}
                              helperText={touched.totalSquareMeters && errors.totalSquareMeters}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="squareMetersBuilt"
                              type="number"
                              as={MDInput}
                              label="Metros cuadrados construidos"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.squareMetersBuilt && touched.squareMetersBuilt}
                              helperText={touched.squareMetersBuilt && errors.squareMetersBuilt}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="representativeName"
                              type="text"
                              as={MDInput}
                              label="Nombre del representante legal"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.representativeName && touched.representativeName}
                              helperText={touched.representativeName && errors.representativeName}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="identiTypeRepresentative"
                            defaultValue={initialState.identiTypeRepresentative}
                            name="identiTypeRepresentative"
                            options={listIdentification}
                            getOptionLabel={(option) => option.name ?? option}
                            onChange={(e, value) => {
                              setFieldValue(
                                "identiTypeRepresentative",
                                value !== null ? value : initialState.identiTypeRepresentative
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Tipo de documento del representante legal"
                                variant="standard"
                                required
                                fullWidth
                                name="identiTypeRepresentative"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors.identiTypeRepresentative &&
                                  touched.identiTypeRepresentative
                                }
                                helperText={
                                  touched.identiTypeRepresentative &&
                                  errors.identiTypeRepresentative
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="nuip"
                              type="text"
                              as={MDInput}
                              label="Número de documento del representante legal"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.nuip && touched.nuip}
                              helperText={touched.nuip && errors.nuip}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="addressRepresentative"
                              type="text"
                              as={MDInput}
                              label="Dirección del representante legal"
                              variant="standard"
                              required
                              fullWidth
                              error={errors.addressRepresentative && touched.addressRepresentative}
                              helperText={
                                touched.addressRepresentative && errors.addressRepresentative
                              }
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="phoneNumberRepresentative"
                              type="string"
                              as={MDInput}
                              label="Teléfono del representante legal"
                              variant="standard"
                              fullWidth
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <MDBox mb={2}>
                            <Field
                              name="emailRepresentative"
                              type="email"
                              as={MDInput}
                              label="Email del representante legal"
                              variant="standard"
                              fullWidth
                              required
                              error={errors.emailRepresentative && touched.emailRepresentative}
                              helperText={touched.emailRepresentative && errors.emailRepresentative}
                              inputProps={{ autoComplete: "off" }}
                              InputLabelProps={{ shrink: true }}
                            />
                          </MDBox>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="industrial"
                            defaultValue={initialState.industrial}
                            name="industrial"
                            options={industrialOptions}
                            getOptionLabel={(option) => option.name ?? option}
                            onChange={(e, industrialValue) => {
                              setFieldValue(
                                "industrial",
                                industrialValue !== null
                                  ? industrialValue.value
                                  : initialState.industrial
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="¿es industrial ?"
                                variant="standard"
                                required
                                fullWidth
                                name="industrial"
                                InputLabelProps={{ shrink: true }}
                                error={errors.industrial && touched.industrial}
                                helperText={touched.industrial && errors.industrial}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                      <MDBox display="flex">
                        <MDButton onClick={onClose} variant="outlined" color="info">
                          Cancelar
                        </MDButton>
                        <MDBox ml={1}>
                          <MDButton type="submit" variant="gradient" color="info">
                            Guardar
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
            <Grid style={{ marginLeft: "5px" }} item xs={6}>
              <Grid container>
                <Grid item>
                  <GeolocalisationMarkers isMarkerShown />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Dialog>
  );
};

DialogFullScreen.defaultProps = {
  associatedRequest: null,
};

DialogFullScreen.propTypes = {
  // eslint-disable-next-line react/require-default-props
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  listIdentification: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  // eslint-disable-next-line react/require-default-props
  setTypeIdentification: PropTypes.element,
  // eslint-disable-next-line react/require-default-props
  typeIdentification: PropTypes.string,
  get: PropTypes.func.isRequired,
  associatedRequest: PropTypes.func,
  listEconomicActivities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  // eslint-disable-next-line react/require-default-props
  setEconomicActivities: PropTypes.element,
  // eslint-disable-next-line react/require-default-props
  economicActivities: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  setTypeIdentRepresentative: PropTypes.element,
  // eslint-disable-next-line react/require-default-props
  typeIdentRepresentative: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  typeForm: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  so: PropTypes.shape({
    name: PropTypes.string,
    identificationType: PropTypes.string,
    nIdentification: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    contactName: PropTypes.string,
  }),
  // eslint-disable-next-line react/require-default-props
  dataClient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    identificationType: PropTypes.string,
    economicActivityCode: PropTypes.string,
    nIdentification: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    arl: PropTypes.string,
    phoneNumber: PropTypes.string,
    industrial: PropTypes.bool,
    customerDetail: PropTypes.shape({
      employeesNumber: PropTypes.number,
      riskLevel: PropTypes.string,
      totalSquareMeters: PropTypes.number,
      squareMetersBuilt: PropTypes.number,
      legalRepresentative: {
        name: PropTypes.string,
        nuip: PropTypes.string,
        address: PropTypes.string,
        phoneNumber: PropTypes.string,
        email: PropTypes.string,
        identificationType: PropTypes.string,
      },
    }),
  }),
};

export default DialogFullScreen;
