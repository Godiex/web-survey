import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  // useMediaQuery,
} from "@mui/material";
import * as Yup from "yup";
// import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
// eslint-disable-next-line import/named
import { URL_MAP, generateId } from "../../../utils/utils";
import LoadingMap from "../../../components/Map/LoadingMap";
import Map from "../../../components/Map/MapGeolocation";
import AutocompleteGoogleMap from "../../../components/Map/AutocompleteGoogleMap";
import { createCompany, updateCompany } from "../../../store/tenant/actions";

const validationSchema = Yup.object().shape({
  id: Yup.string().required("Campo requerido"),
  name: Yup.string().required("Campo requerido"),
  phoneNumber: Yup.string().required("Campo requerido"),
  adminEmail: Yup.string().required("Campo requerido"),
  regime: Yup.object().required("Campo requerido"),
  connectionString: Yup.string(),
  legalRepresentative_nuip: Yup.string().required("Campo requerido"),
  legalRepresentative_name: Yup.string().required("Campo requerido"),
  legalRepresentative_identificationType: Yup.object().required("Campo requerido"),
  identificationType: Yup.object().required("Campo requerido"),
  neighborhood: Yup.string().required("Campo requerido"),
  percentageToCollect: Yup.number()
    .max(100, "El porcentaje no puede ser mayor a 100.")
    .min(0, "Porcentaje minimo es 0")
    .required("El Número de radicación del proceso es Requerido."),
});

const selectRegiments = [{ name: "Simplificado" }, { name: "SAS" }, { name: "Gran contribuyente" }];

const DialogFormCreateCompany = (props) => {
  const { title, open, onClose, titleAccept, titleClose, obj, act, typesIdentity, economicType } =
    props;

  const [loading, setLoading] = useState(false);
  const [isCC, setIsCC] = useState(obj ? obj.identificationType === "CC" : false);

  const position = useSelector(({ map }) => map.location);
  const direction = useSelector(({ map }) => map.directionString);

  const dispatch = useDispatch();

  const typeEconomy = obj && economicType.find((e) => e.code === obj.economicActivityCode);
  const economicActivityCode = obj ? typeEconomy : { code: "", name: "" };
  const representativeName = obj ? obj.legalRepresentative.name : "";
  const t = obj && typesIdentity.find((e) => e.code === obj.legalRepresentative.identificationType);
  const idType = obj ? t : { code: "", name: "" };
  const id = obj ? parseInt(obj.legalRepresentative.nuip, 10) : "";
  const representativeAddress = obj ? obj.legalRepresentative.address : "";
  const phone = obj ? obj.legalRepresentative.phoneNumber : "";
  const email = obj ? obj.legalRepresentative.email : "";
  const type = obj && typesIdentity.find((e) => e.code === obj.identificationType);

  // const theme = useTheme();
  // const classes = useStyles();
  const initialState = {
    id: obj ? obj.id : generateId("CMPY"),
    name: obj ? obj.name : "",
    connectionString: obj ? obj.connectionString : "",
    adminEmail: obj ? obj.adminEmail : "",
    identificationType: obj ? type : { code: "", name: "" },
    nIdentification: obj ? parseInt(obj.nIdentification, 10) : "",
    regime: obj ? selectRegiments.find((e) => e.name === obj.regime) : { name: "" },
    phoneNumber: obj ? parseInt(obj.phoneNumber, 10) : "",
    webSite: obj ? obj.webSite : "",
    socialNetwork: obj ? obj.socialNetwork : "",
    economicActivityCode,
    legalRepresentative_name: representativeName,
    legalRepresentative_identificationType: idType,
    legalRepresentative_nuip: id,
    legalRepresentative_address: representativeAddress,
    legalRepresentative_phoneNumber: phone,
    legalRepresentative_email: email,
    subscription_startDate: "",
    subscription_endDate: "",
    neighborhood: obj ? obj.neighborhood : "",
  };

  // const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      moment.locale("es-mx");
      const dateInit = moment(values.subscription_startDate);
      const dateFinish = moment(values.subscription_endDate);
      const different = dateFinish.diff(dateInit, "hour");
      let legalRepresentative = {};
      let subscription = { state: true, subscriptionTime: `${different}:00:00` };
      const newData = Object.keys(values).reduce((acc, item) => {
        if (item.includes("legalRepresentative")) {
          legalRepresentative = { ...legalRepresentative, [item.split("_")[1]]: values[item] };
        } else if (item.includes("subscription")) {
          subscription = { ...subscription, [item.split("_")[1]]: values[item] };
        } else {
          // eslint-disable-next-line no-param-reassign
          acc = { ...acc, [item]: values[item] };
        }
        return { ...acc, legalRepresentative, subscription };
      }, {});
      const dataSend = {
        ...newData,
        legalRepresentative: {
          ...newData.legalRepresentative,
          nuip: newData.legalRepresentative.nuip.toString(),
          phoneNumber: newData.legalRepresentative.phoneNumber.toString(),
          identificationType: newData.legalRepresentative.identificationType.code,
        },
        geographicalCoordinates: {
          latitude: position.lat.toString(),
          longitude: position.lng.toString(),
        },
        city: direction.split(",")[1],
        address: direction,
        nIdentification: newData.nIdentification.toString(),
        phoneNumber: newData.phoneNumber.toString(),
        identificationType: newData.identificationType.code,
        regime: isCC ? "" : newData.regime.name,
        economicActivityCode: newData.economicActivityCode.code,
        percentageToCollect: values.percentageToCollect,
      };
      if (act) {
        delete dataSend.subscription;
        await dispatch(updateCompany(newData.id, dataSend));
        onClose();
        // alert.success("Empresa actualizada correctamente");
      } else {
        await dispatch(createCompany(dataSend));
        resetForm({ values: "" });
        onClose();
        alert.success(`Empresa ${act ? "actualizada" : "creada"} correctamente`);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      onClose();
      alert.error(`Error al ${act ? "actualizar" : "crear"} la empresa`);
    }
  };

  useEffect(() => {
    setIsCC(obj ? obj.identificationType === "CC" : false);
  }, [obj]);

  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      fullScreen
      maxWidth="lg"
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#000",
        }}
      >
        <CloseIcon />
      </IconButton>
      {act === true && !Object.values(obj).length ? (
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
              <DialogContent dividers>
                <Grid container>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <MDBox pb={3} px={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Id"
                            name="id"
                            required
                            disabled
                            error={errors.id && touched.id}
                            helperText={touched.id && errors.id}
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Nombre o razón socia"
                            name="name"
                            required
                            error={errors.name && touched.name}
                            helperText={touched.name && errors.name}
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="connection String"
                            name="connectionString"
                            error={errors.connectionString && touched.connectionString}
                            helperText={touched.connectionString && errors.connectionString}
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                              if (value) setIsCC(value.code === "CC");
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
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            label="Documento de identidad"
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
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="regime"
                            defaultValue={initialState.regime}
                            name="regime"
                            required={!isCC}
                            disabled={isCC}
                            options={selectRegiments}
                            getOptionLabel={(option) => option.name ?? option}
                            onChange={(e, value) => {
                              setFieldValue("regime", value !== null ? value : initialState.regime);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Régimen"
                                variant="standard"
                                fullWidth
                                required
                                name="regime"
                                InputLabelProps={{ shrink: true }}
                                error={errors.regime && touched.regime}
                                helperText={touched.regime && errors.regime}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="economicActivityCode"
                            defaultValue={initialState.economicActivityCode}
                            name="economicActivityCode"
                            options={economicType}
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
                                label="Actividad económica"
                                variant="standard"
                                fullWidth
                                required
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
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <AutocompleteGoogleMap
                            /* eslint-disable-next-line react/prop-types */
                            defaultValue={obj ? obj.address : null}
                            label="Dirección de la empresa"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Barrio"
                            name="neighborhood"
                            variant="standard"
                            InputLabelProps={{ shrink: true }}
                            error={errors.neighborhood && touched.neighborhood}
                            helperText={touched.neighborhood && errors.neighborhood}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Teléfono"
                            name="phoneNumber"
                            required
                            error={errors.phoneNumber && touched.phoneNumber}
                            helperText={touched.phoneNumber && errors.phoneNumber}
                            inputProps={{ autoComplete: "off", type: "number" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Correo electrónico"
                            name="adminEmail"
                            required
                            error={errors.adminEmail && touched.adminEmail}
                            helperText={touched.adminEmail && errors.adminEmail}
                            inputProps={{ autoComplete: "off", type: "email" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Página Web"
                            name="webSite"
                            required
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            name="percentageToCollect"
                            type="number"
                            as={TextField}
                            fullWidth
                            label="Porcentaje de comisión"
                            variant="standard"
                            error={errors.percentageToCollect && touched.percentageToCollect}
                            helperText={touched.percentageToCollect && errors.percentageToCollect}
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </Grid>
                      <MDBox p={3}>
                        <MDTypography variant="h5">
                          Representante legal o contacto principal
                        </MDTypography>
                      </MDBox>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Nombre del representante legal"
                            name="legalRepresentative_name"
                            required
                            error={
                              errors.legalRepresentative_name && touched.legalRepresentative_name
                            }
                            helperText={
                              touched.legalRepresentative_name && errors.legalRepresentative_name
                            }
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                          <Autocomplete
                            id="legalRepresentative_identificationType"
                            defaultValue={initialState.legalRepresentative_identificationType}
                            name="legalRepresentative_identificationType"
                            options={typesIdentity}
                            getOptionLabel={(option) => option.name ?? option}
                            onChange={(e, value) => {
                              // eslint-disable-next-line no-console
                              console.log({ value });
                              setFieldValue(
                                "legalRepresentative_identificationType",
                                value !== null
                                  ? value
                                  : initialState.legalRepresentative_identificationType
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Tipo de identificación"
                                variant="standard"
                                fullWidth
                                required
                                name="legalRepresentative_identificationType"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors.legalRepresentative_identificationType &&
                                  touched.legalRepresentative_identificationType
                                }
                                helperText={
                                  touched.legalRepresentative_identificationType &&
                                  errors.legalRepresentative_identificationType
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Número de documento"
                            name="legalRepresentative_nuip"
                            required
                            error={
                              errors.legalRepresentative_nuip && touched.legalRepresentative_nuip
                            }
                            helperText={
                              touched.legalRepresentative_nuip && errors.legalRepresentative_nuip
                            }
                            inputProps={{ autoComplete: "off", type: "number" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Dirección"
                            name="legalRepresentative_address"
                            inputProps={{ autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Teléfono"
                            name="legalRepresentative_phoneNumber"
                            inputProps={{ autoComplete: "off", type: "number" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            name="legalRepresentative_email"
                            fullWidth
                            label="Correo electrónico"
                            inputProps={{ type: "email", autoComplete: "off" }}
                            InputLabelProps={{ shrink: true }}
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                      {act === false ? (
                        <>
                          <MDBox p={3}>
                            <MDTypography variant="h5">Subscription</MDTypography>
                          </MDBox>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                label="Fecha de Inicio"
                                type="date"
                                variant="standard"
                                fullWidth
                                name="subscription_startDate"
                                InputLabelProps={{ shrink: true }}
                                error={
                                  errors.subscription_startDate && touched.subscription_startDate
                                }
                                helperText={
                                  touched.subscription_startDate && errors.subscription_startDate
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Field
                                as={TextField}
                                label="Fecha de fin"
                                type="date"
                                variant="standard"
                                fullWidth
                                name="subscription_endDate"
                                InputLabelProps={{ shrink: true }}
                                error={errors.subscription_endDate && touched.subscription_endDate}
                                helperText={
                                  touched.subscription_endDate && errors.subscription_endDate
                                }
                              />
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Map
                      googleMapURL={URL_MAP}
                      containerElement={
                        <div
                          style={{ height: `${act === true ? "720px" : "772px"}`, width: "100%" }}
                        />
                      }
                      mapElement={<div style={{ height: "100%" }} />}
                      loadingElement={<LoadingMap />}
                      isMarkerShown
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton variant="outlined" color="secondary" onClick={onClose}>
                  {titleClose}
                </MDButton>
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <MDButton type="submit" variant="gradient" color="dark">
                    {titleAccept}
                  </MDButton>
                )}
              </DialogActions>
            </Form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

DialogFormCreateCompany.defaultProps = {
  title: "Crear empresa",
  titleAccept: "Crear empresa",
  titleClose: "Cerrar",
  act: false,
  subscription: null,
};

DialogFormCreateCompany.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  titleAccept: PropTypes.string,
  titleClose: PropTypes.string,
  act: PropTypes.bool,
  typesIdentity: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  economicType: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  obj: PropTypes.shape({
    economicActivityCode: PropTypes.string,
    neighborhood: PropTypes.string,
    socialNetwork: PropTypes.string,
    id: PropTypes.string,
    connectionString: PropTypes.string,
    adminEmail: PropTypes.string,
    nIdentification: PropTypes.string,
    regime: PropTypes.string,
    phoneNumber: PropTypes.string,
    name: PropTypes.string,
    webSite: PropTypes.string,
    identificationType: PropTypes.string,
    legalRepresentative: PropTypes.shape({
      name: PropTypes.string,
      identificationType: PropTypes.string,
      nuip: PropTypes.string,
      address: PropTypes.string,
      phoneNumber: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
  subscription: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
};

export default DialogFormCreateCompany;
