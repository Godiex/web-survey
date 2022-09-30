import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import * as moment from "moment";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import { useAlert } from "react-alert";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { postService, putService } from "../../../store/generateService/actions";

const validationSchema = Yup.object().shape({
  nameService: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
});
const timeCollectionMoneyArray = [
  { id: 0, name: "Antes", value: "Before" },
  { id: 1, name: "Después", value: "After" },
  // { id: 2, name: "No genera cobro", value: "NoGenerateCollection" },
];

const data = [
  { value: true, name: "Si" },
  { value: false, name: "No" },
];

const automaticScheduling = [
  { value: true, name: "Si" },
  { value: false, name: "No" },
];

// eslint-disable-next-line react/prop-types
const DialogCreateService = (props) => {
  const {
    title,
    open,
    onClose,
    titleAccept,
    titleClose,
    servStrategy,
    obj,
    isUpdate,
    get,
    surveys,
    certificate,
  } = props;

  const s =
    obj && obj.survey !== null ? surveys.find((e) => e.id === obj.survey.id) : { name: "", id: "" };
  const tCM = obj && timeCollectionMoneyArray.find((e) => e.value === obj.timeCollectionMoney);
  const gMV = obj && data.find((e) => e.value === obj.generateMonetaryValue);
  const gMB = obj && data.find((e) => e.value === obj.automaticEmployeeSelection);
  const gC = obj && data.find((e) => e.value === obj.generateCertification);
  const currentCertificadoId =
    obj && certificate.find((e) => e.id === obj.certificateId.toUpperCase());
  const initialState = {
    nameService: obj ? obj.nameService : "",
    description: obj ? obj.description : "",
    targetAudiences: obj ? obj.targetAudiences : "",
    validity_startDate: obj ? moment(obj.validity.startDate).format("YYYY-MM-DD") : "",
    validity_endDate: obj ? moment(obj.validity.endDate).format("YYYY-MM-DD") : "",
    generateMonetaryValue: obj ? gMV : data[0],
    automaticScheduling: obj ? gMB : data[0],
    generateCertification: obj ? gC : data[0],
    timeCollectionMoney: obj && tCM ? tCM : timeCollectionMoneyArray[0],
    strategy: obj ? servStrategy.find((e) => e.code === obj.strategy) : "",
    surveyId: obj ? s : { id: "", name: "" },
    isActive: obj ? obj.isActive : true,
    value: obj ? obj.value : 0,
    associatedCertificate:
      obj && currentCertificadoId ? currentCertificadoId : { id: "", name: "" },
  };

  const [loading, setLoading] = useState(false);
  const [isGenerateCertificate, setIsGenerateCertificate] = useState(
    obj ? obj.generateCertification : true
  );
  const [collection, setCollection] = useState(obj && obj.generateMonetaryValue);
  const [curentStrategy, setCurentStrategy] = useState(null);

  const alert = useAlert();
  const theme = useTheme();
  const dispatch = useDispatch();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let validity = {};
      const newData = Object.keys(values).reduce((acc, item) => {
        if (item.includes("validity")) {
          validity = { ...validity, [item.split("_")[1]]: values[item] };
        } else {
          // eslint-disable-next-line no-param-reassign
          acc = { ...acc, [item]: values[item] };
        }
        return {
          ...acc,
          validity,
        };
      }, {});
      const request = {
        ...newData,
        certificateId:
          newData.associatedCertificate.id === "" ? null : newData.associatedCertificate.id,
        generateMonetaryValue: newData.generateMonetaryValue.value,
        automaticEmployeeSelection: newData.automaticScheduling.value,
        generateCertification: newData.generateCertification.value,
        strategy: newData.generateMonetaryValue.value === false ? "" : newData.strategy.code,
        surveyId: newData.surveyId.id === "" ? null : newData.surveyId.id,
        value:
          newData.generateMonetaryValue.value && newData.strategy.code === "STR_CF"
            ? newData.value
            : 0,
        timeCollectionMoney:
          newData.generateMonetaryValue.value === false ? 2 : newData.timeCollectionMoney.id,
      };
      if (isUpdate === true) {
        // eslint-disable-next-line react/prop-types
        await dispatch(putService({ ...request, id: obj.id }, obj.id));
      } else {
        await dispatch(postService({ ...request }));
      }
      alert.success(`Accion realizada con exito`);
      setLoading(false);
      setCurentStrategy(null);
      onClose();
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
      setLoading(false);
    }

    await get();
  };

  useEffect(() => {
    setIsGenerateCertificate(obj ? obj.generateCertification : true);
    setCollection(obj && obj.generateMonetaryValue);
    if (obj) setCurentStrategy(servStrategy.find((e) => e.code === obj.strategy));
  }, [obj]);

  const currentDate = moment().format("YYYY-MM-DD");
  const mindateToValidityStart =
    obj && obj.validity.startDate ? initialState.validity_startDate : currentDate;

  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      maxWidth="lg"
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      {onClose && fullScreen ? (
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
      ) : null}
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <DialogContent>
              <MDBox pb={3} px={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Nombre del Servicio"
                      name="nameService"
                      required
                      error={errors.nameService && touched.nameService}
                      helperText={touched.nameService && errors.nameService}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Público objetivo"
                      name="targetAudiences"
                      error={errors.targetAudiences && touched.targetAudiences}
                      helperText={touched.targetAudiences && errors.targetAudiences}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={12} xl={12}>
                    <Field
                      as={TextField}
                      fullWidth
                      multiline
                      maxRows={4}
                      label="Descripción"
                      name="description"
                      required
                      error={errors.description && touched.description}
                      helperText={touched.description && errors.description}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="generateCertification"
                      defaultValue={initialState.generateCertification}
                      name="generateCertification"
                      options={data}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "generateCertification",
                          value !== null ? value : initialState.generateCertification
                        );
                        if (value) setIsGenerateCertificate(value.value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="¿Genera certificación?"
                          variant="standard"
                          required
                          fullWidth
                          name="generateCertification"
                          InputLabelProps={{ shrink: true }}
                          error={errors.generateCertification && touched.generateCertification}
                          helperText={touched.generateCertification && errors.generateCertification}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="associatedCertificate"
                      defaultValue={initialState.associatedCertificate}
                      name="associatedCertificate"
                      options={certificate}
                      disabled={!isGenerateCertificate}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "associatedCertificate",
                          value !== null ? value : initialState.associatedCertificate
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Certificado Asociado"
                          variant="standard"
                          required
                          fullWidth
                          name="associatedCertificate"
                          InputLabelProps={{ shrink: true }}
                          error={errors.associatedCertificate && touched.associatedCertificate}
                          helperText={touched.associatedCertificate && errors.associatedCertificate}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="generateMonetaryValue"
                      defaultValue={initialState.generateMonetaryValue}
                      name="generateMonetaryValue"
                      options={data}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "generateMonetaryValue",
                          value !== null ? value : initialState.generateMonetaryValue
                        );
                        if (value) setCollection(value.value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="¿Genera valor monetario?"
                          variant="standard"
                          required
                          fullWidth
                          name="generateMonetaryValue"
                          InputLabelProps={{ shrink: true }}
                          error={errors.generateMonetaryValue && touched.generateMonetaryValue}
                          helperText={touched.generateMonetaryValue && errors.generateMonetaryValue}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="timeCollectionMoney"
                      defaultValue={initialState.timeCollectionMoney}
                      name="timeCollectionMoney"
                      disabled={collection === false}
                      options={timeCollectionMoneyArray}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "timeCollectionMoney",
                          value !== null ? value : initialState.timeCollectionMoney
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tiempo de pago del Dinero"
                          variant="standard"
                          required
                          fullWidth
                          name="timeCollectionMoney"
                          InputLabelProps={{ shrink: true }}
                          error={errors.timeCollectionMoney && touched.timeCollectionMoney}
                          helperText={touched.timeCollectionMoney && errors.timeCollectionMoney}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="surveyId"
                      defaultValue={initialState.surveyId}
                      name="surveyId"
                      options={surveys}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue("surveyId", value !== null ? value : initialState.surveyId);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Encuesta"
                          variant="standard"
                          fullWidth
                          required
                          name="surveyId"
                          InputLabelProps={{ shrink: true }}
                          error={errors.surveyId && touched.surveyId}
                          helperText={touched.surveyId && errors.surveyId}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="strategy"
                      defaultValue={initialState.strategy}
                      disabled={collection === false}
                      name="strategy"
                      options={servStrategy}
                      getOptionLabel={(option) => option.nameStrategy ?? option}
                      onChange={(e, value) => {
                        setFieldValue("strategy", value !== null ? value : initialState.strategy);
                        setCurentStrategy(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Estrategia"
                          variant="standard"
                          fullWidth
                          name="strategy"
                          InputLabelProps={{ shrink: true }}
                          error={errors.strategy && touched.strategy}
                          helperText={touched.strategy && errors.strategy}
                        />
                      )}
                    />
                  </Grid>
                  {curentStrategy?.code === "STR_CF" && (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Field
                        as={TextField}
                        label="Costo del servicio"
                        type="number"
                        required={curentStrategy?.code === "STR_CF"}
                        variant="standard"
                        fullWidth
                        name="value"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: 0 }}
                        error={errors.value && touched.value}
                        helperText={touched.value && errors.value}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Field
                      as={TextField}
                      label="Fecha de Inicio de la vigencia"
                      type="date"
                      required
                      variant="standard"
                      fullWidth
                      name="validity_startDate"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: mindateToValidityStart }}
                      error={errors.validity_startDate && touched.validity_startDate}
                      helperText={touched.validity_startDate && errors.validity_startDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Field
                      as={TextField}
                      label="Fecha de fin de la vigencia"
                      type="date"
                      required
                      variant="standard"
                      fullWidth
                      name="validity_endDate"
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: currentDate }}
                      error={errors.validity_endDate && touched.validity_endDate}
                      helperText={touched.validity_endDate && errors.validity_endDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="automaticScheduling"
                      defaultValue={initialState.automaticScheduling}
                      name="automaticScheduling"
                      disabled={collection === false}
                      options={automaticScheduling}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue(
                          "automaticScheduling",
                          value !== null ? value : initialState.timeCollectionMoney
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Agendamiento automático"
                          variant="standard"
                          required
                          fullWidth
                          name="automaticScheduling"
                          InputLabelProps={{ shrink: true }}
                          error={errors.automaticScheduling && touched.automaticScheduling}
                          helperText={touched.automaticScheduling && errors.automaticScheduling}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>
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
    </Dialog>
  );
};

DialogCreateService.defaultProps = {
  title: "",
  titleAccept: "Accept",
  titleClose: "Cancel",
  isUpdate: false,
};

DialogCreateService.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  titleAccept: PropTypes.string,
  titleClose: PropTypes.string,
  servStrategy: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  isUpdate: PropTypes.bool,
  get: PropTypes.func.isRequired,
  surveys: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  certificate: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  obj: PropTypes.shape({
    nameService: PropTypes.string,
    description: PropTypes.string,
    targetAudiences: PropTypes.string,
    validity: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
    generateMonetaryValue: PropTypes.bool,
    automaticEmployeeSelection: PropTypes.bool,
    timeCollectionMoney: PropTypes.number,
    generateCertification: PropTypes.bool,
    strategy: PropTypes.string,
    surveyId: PropTypes.string,
    certificateId: PropTypes.string,
    isActive: PropTypes.bool,
    value: PropTypes.number,
    survey: {
      id: PropTypes.string,
      code: PropTypes.string,
      name: PropTypes.string,
    },
  }).isRequired,
};

export default DialogCreateService;
