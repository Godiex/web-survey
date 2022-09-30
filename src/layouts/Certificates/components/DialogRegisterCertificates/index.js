import React, { useRef, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import JoditEditor from "jodit-react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  nDaysExpire: Yup.number()
    .min(1, "El numero de dias debe ser mayor a 1")
    .required("Campo requerido"),
});

function DialogRegisterCertificates({
  open,
  handleClose,
  handleSaveCertificate,
  typeDialog,
  dataEdit,
  setDataText,
  StateDataText,
  codeCertificate,
}) {
  const config = {
    readonly: false,
    language: "es",
    addNewLineOnDBLClick: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };
  const editor = useRef(null);

  const handleChangeEditor = (value) => {
    setDataText(value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="lg">
        <Formik
          initialValues={{
            name: typeDialog === "registro" ? "" : dataEdit.name,
            nDaysExpire: typeDialog === "registro" ? 0 : dataEdit.nDaysExpire,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSaveCertificate(values, StateDataText);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {typeDialog === "registro" ? "Nuevo Certificado" : "Editar Certificado"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={4}>
                      <Field
                        name="code"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Código"
                        fullWidth
                        disabled
                        value={codeCertificate}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox mb={4}>
                      <Field
                        name="nDaysExpire"
                        type="number"
                        as={MDInput}
                        variant="standard"
                        label="Numero de dias para expirar"
                        fullWidth
                        error={errors.nDaysExpire && touched.nDaysExpire}
                        helperText={touched.nDaysExpire && errors.nDaysExpire}
                        inputProps={{ autoComplete: "off", min: 1 }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox mb={4}>
                      <Field
                        name="name"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Nombre"
                        fullWidth
                        error={errors.name && touched.name}
                        helperText={touched.name && errors.name}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography
                      variant="subtitle2"
                      fontSize="14px"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Nota:</strong> Para que la informacion del certificado incluya
                      informacion de la empresa tales como Nombre, Dirección, Tipo de identificación
                      Número de identiicación, ARL, Número telefónico, Email, Se debe hacer de la
                      siguiente forma.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontSize="14px"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Nombre:</strong> [[NombreCliente]]
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontSize="14px"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Dirección:</strong> [[Direccion]]
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontSize="14px"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Tipo de identificación:</strong> [[NumeroIdentificacion]]
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      fontSize="14px"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>ARL:</strong> [[Arl]]
                    </Typography>
                    <Typography
                      fontSize="14px"
                      variant="subtitle2"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Número de teléfono:</strong> [[NumeroTelefono]]
                    </Typography>
                    <Typography
                      fontSize="14px"
                      variant="subtitle2"
                      aling="justify"
                      gutterBottom
                      component="div"
                      color="#212121"
                    >
                      <strong>Correo electrónico:</strong> [[Email]]
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    {useMemo(
                      () => (
                        <JoditEditor
                          ref={editor}
                          value={StateDataText}
                          onBlur={handleChangeEditor}
                          onChange={handleChangeEditor}
                          config={config}
                        />
                      ),
                      []
                    )}
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
      </Dialog>
    </div>
  );
}

DialogRegisterCertificates.defaultProps = {
  open: false,
  dataEdit: {},
  setDataText: "",
  StateDataText: "",
  codeCertificate: "",
};

DialogRegisterCertificates.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleSaveCertificate: PropTypes.func.isRequired,
  typeDialog: PropTypes.string.isRequired,
  dataEdit: PropTypes.objectOf(PropTypes.string),
  setDataText: PropTypes.elementType,
  StateDataText: PropTypes.string,
  codeCertificate: PropTypes.string,
};

export default DialogRegisterCertificates;
