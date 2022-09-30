import { Dialog, DialogContent, DialogTitle, Autocomplete } from "@mui/material";
import { Form, Formik, Field } from "formik";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  item: Yup.object().required("Campo requerido"),
});

const DialogAssociateClient = ({ title, open, onClose, handleSubmit, data }) => {
  const initialState = {
    item: { id: "", name: "" },
  };
  const options = [{ label: "", id: 1 }];

  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      aria-labelledby="responsive-dialog-title"
      open={open}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>{title}</DialogTitle>
      {onClose ? (
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
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Nombre completo o razón social"
                    name="name"
                    disabled
                    required
                    defaultValue={data?.name[0]}
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
                    name="identificationType"
                    disabled
                    options={options}
                    defaultValue={data?.identificationType}
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
                    disabled
                    fullWidth
                    required
                    inputProps={{ type: "number", autoComplete: "off" }}
                    defaultValue={data?.nIdentification}
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
                    disabled
                    defaultValue={data?.email}
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
                    disabled
                    inputProps={{ autoComplete: "off" }}
                    required
                    defaultValue={data?.address}
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
                    disabled
                    defaultValue={data?.phoneNumber}
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
                    disabled
                    defaultValue={data?.contactName}
                    inputProps={{ autoComplete: "off" }}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Autocomplete
                    id="serviceId"
                    name="serviceId"
                    disabled
                    defaultValue={data?.service.nameService}
                    options={options}
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
            </DialogContent>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

DialogAssociateClient.defaultProps = {
  title: "",
  titleAccept: "Accept",
  titleClose: "Cancel",
  label: "",
};

DialogAssociateClient.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  titleAccept: PropTypes.string,
  titleClose: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default DialogAssociateClient;
