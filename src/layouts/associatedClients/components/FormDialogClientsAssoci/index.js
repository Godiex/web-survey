import Dialog from "@mui/material/Dialog";
import MDBox from "components/MDBox";
import { Field, Form, Formik } from "formik";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import MDInput from "components/MDInput";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "components/MDButton";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Razón social de la empresa o nombre debe tener máximo 40 dígitos."),
  nIdentification: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Número de documento debe tener máximo 10 dígitos."),
  arl: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Arl debe tener máximo 40 dígitos."),
  riskLevel: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Nivel de riesgo debe tener máximo 40 dígitos."),
  totalSquareMeters: Yup.number().required("Campo requerido"),
  squareMetersBuilt: Yup.number().required("Campo requerido"),
  representativeName: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo Nombre  del representante legal debe tener máximo 40 dígitos."),
  nuip: Yup.string()
    .required("Campo requerido")
    .max(10, "El campo Número de documento del representante legal debe tener máximo 10 dígitos."),
  addressRepresentative: Yup.string()
    .required("Campo requerido")
    .max(40, "El campo dirección del representante legal debe tener máximo 40 dígitos."),
});

function FormDialogClientsAssoci({
  open,
  handleClose,
  listIdentification,
  setTypeIdentification,
  typeIdentification,
  handleRegisterClients,
  listEconomicActivities,
  setEconomicActivities,
  economicActivities,
  setTypeIdentRepresentative,
  typeIdentRepresentative,
  typeForm,
  dataClient,
}) {
  const handleChange = (event) => {
    setTypeIdentification(event.target.value);
  };

  const handleChangeEconomic = (e) => {
    setEconomicActivities(e.target.value);
  };

  const handleTypeIdentRepresentative = (eventRepre) => {
    setTypeIdentRepresentative(eventRepre.target.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <MDBox>
          <Formik
            initialValues={{
              name: typeForm === "registro" ? "" : dataClient.name,
              nIdentification: typeForm === "registro" ? "" : dataClient.nIdentification,
              address: typeForm === "registro" ? "" : dataClient.address,
              phoneNumber: typeForm === "registro" ? "" : dataClient.phoneNumber,
              email: typeForm === "registro" ? "" : dataClient.email,
              arl: typeForm === "registro" ? "" : dataClient.arl,
              employeesNumber:
                typeForm === "registro"
                  ? 0
                  : !!dataClient &&
                    !!dataClient.customerDetail &&
                    dataClient.customerDetail.employeesNumber,
              riskLevel:
                typeForm === "registro"
                  ? ""
                  : !!dataClient &&
                    !!dataClient.customerDetail &&
                    dataClient.customerDetail.riskLevel,
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
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleRegisterClients(
                values,
                typeIdentification,
                economicActivities,
                typeIdentRepresentative
              );
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <DialogTitle>
                  {typeForm === "registro" ? "Nuevo cliente asociado" : "Editar cliente asociado"}
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="name"
                          type="text"
                          as={MDInput}
                          label="Razón social de la empresa o nombre (*)"
                          variant="standard"
                          fullWidth
                          error={errors.name && touched.name}
                          helperText={touched.name && errors.name}
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
                          name="nIdentification"
                          type="text"
                          as={MDInput}
                          label="Número de documento (*)"
                          variant="standard"
                          fullWidth
                          error={errors.nIdentification && touched.nIdentification}
                          helperText={touched.nIdentification && errors.nIdentification}
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
                          label="Dirección"
                          variant="standard"
                          fullWidth
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
                          label="Teléfono"
                          variant="standard"
                          fullWidth
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
                          label="Email"
                          variant="standard"
                          fullWidth
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2} mt={1}>
                        <TextField
                          select
                          label="Código actividad económica (*)"
                          onChange={handleChangeEconomic}
                          name="economicActivityCode"
                          value={economicActivities}
                          fullWidth
                          variant="standard"
                          id="outlined-size-normal"
                        >
                          {listEconomicActivities.map((economic) => (
                            <MenuItem key={economic.code} value={economic.code}>
                              {economic.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="arl"
                          type="text"
                          as={MDInput}
                          label="Arl (*)"
                          variant="standard"
                          fullWidth
                          error={errors.arl && touched.arl}
                          helperText={touched.arl && errors.arl}
                          inputProps={{ autoComplete: "off" }}
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
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="riskLevel"
                          type="text"
                          as={MDInput}
                          label="Nivel de riesgo (*)"
                          variant="standard"
                          fullWidth
                          error={errors.riskLevel && touched.riskLevel}
                          helperText={touched.riskLevel && errors.riskLevel}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="totalSquareMeters"
                          type="number"
                          as={MDInput}
                          label="Total metros cuadrados (*)"
                          variant="standard"
                          fullWidth
                          error={errors.totalSquareMeters && touched.totalSquareMeters}
                          helperText={touched.totalSquareMeters && errors.totalSquareMeters}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="squareMetersBuilt"
                          type="number"
                          as={MDInput}
                          label="Metros cuadrados construidos (*)"
                          variant="standard"
                          fullWidth
                          error={errors.squareMetersBuilt && touched.squareMetersBuilt}
                          helperText={touched.squareMetersBuilt && errors.squareMetersBuilt}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2}>
                        <Field
                          name="representativeName"
                          type="text"
                          as={MDInput}
                          label="Nombre del representante legal (*)"
                          variant="standard"
                          fullWidth
                          error={errors.representativeName && touched.representativeName}
                          helperText={touched.representativeName && errors.representativeName}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                      <MDBox mb={2} mt={1}>
                        <TextField
                          select
                          label="Tipo de documento del representante legal (*)"
                          onChange={handleTypeIdentRepresentative}
                          name="identiTypeRepresentative"
                          value={typeIdentRepresentative}
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
                          label="Número de documento del representante legal (*)"
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
                          name="addressRepresentative"
                          type="text"
                          as={MDInput}
                          label="Dirección del representante legal (*)"
                          variant="standard"
                          fullWidth
                          error={errors.addressRepresentative && touched.addressRepresentative}
                          helperText={touched.addressRepresentative && errors.addressRepresentative}
                          inputProps={{ autoComplete: "off" }}
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
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <MDButton onClick={handleClose} variant="outlined" color="info">
                    Cancelar
                  </MDButton>
                  <MDButton type="submit" variant="gradient" color="info">
                    Guardar
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

FormDialogClientsAssoci.defaultProps = {
  open: false,
  setTypeIdentification: "",
  typeIdentification: "",
  setEconomicActivities: "",
  economicActivities: "",
  setTypeIdentRepresentative: "",
  typeIdentRepresentative: "",
  typeForm: "",
  dataClient: {
    name: "",
    nIdentification: "",
    address: "",
    email: "",
    arl: "",
    phoneNumber: "",
    customerDetail: {
      employeesNumber: 0,
      riskLevel: "",
      totalSquareMeters: 0,
      legalRepresentative: {
        name: "",
        nuip: "",
        address: "",
        phoneNumber: "",
        email: "",
      },
    },
  },
};

FormDialogClientsAssoci.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  listIdentification: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  setTypeIdentification: PropTypes.element,
  typeIdentification: PropTypes.string,
  handleRegisterClients: PropTypes.func.isRequired,
  listEconomicActivities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  setEconomicActivities: PropTypes.element,
  economicActivities: PropTypes.string,
  setTypeIdentRepresentative: PropTypes.element,
  typeIdentRepresentative: PropTypes.string,
  typeForm: PropTypes.string,
  dataClient: PropTypes.shape({
    name: PropTypes.string,
    nIdentification: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    arl: PropTypes.string,
    phoneNumber: PropTypes.string,
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
      },
    }),
  }),
};

export default FormDialogClientsAssoci;
