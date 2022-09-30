import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useAlert } from "react-alert";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { updateCredentialsMercadoPago } from "../../../../store/paymentCredentials/actions";

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required("Campo requerido"),
});

function DialogEditCredentialMercadoPago({ credential, open, onClose }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);

  const initialState = {
    accountName: credential ? credential.accountName : "",
  };

  const handleClose = () => {
    onClose();
  };

  const handleCreate = async (values) => {
    setLoading(true);
    const mensaje = await dispatch(
      updateCredentialsMercadoPago({ id: credential.id, accountName: values.accountName })
    );
    if (typeof mensaje !== "string") alert.error(mensaje[0], { position: "top right" });
    else onClose();
    setLoading(false);
  };

  return (
    <div>
      <Dialog
        maxWidth="md"
        open={open}
        fullWidth="true"
        onClose={() => {}}
        aria-labelledby="responsive-dialog-title"
      >
        <MDBox m={3}>
          <DialogTitle>Registro de pasarela de Mercado Pago</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={initialState}
              validationSchema={validationSchema}
              onSubmit={handleCreate}
            >
              {({ errors, touched }) => (
                <Form>
                  <MDBox mt={2} px={2}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="accountName"
                          fullWidth
                          label="Nombre para credencial"
                          inputProps={{ autoComplete: "off" }}
                          required
                          error={errors.address && touched.address}
                          helperText={touched.address && errors.address}
                          InputLabelProps={{ shrink: true }}
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                    <MDBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      marginTop={2}
                    >
                      <Grid item xs={12} display="flex" justifyContent="end">
                        <MDButton type="submit">
                          {loading ? (
                            <Grid container justifyContent="center" alignItems="center">
                              <Grid item>
                                <CircularProgress color="secondary" />
                              </Grid>
                            </Grid>
                          ) : (
                            "Editar credencial"
                          )}
                        </MDButton>
                        <MDButton mx={2} onClick={() => handleClose()}>
                          Cancelar
                        </MDButton>
                      </Grid>
                    </MDBox>
                  </MDBox>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </MDBox>
      </Dialog>
    </div>
  );
}
DialogEditCredentialMercadoPago.defaultProps = {
  credential: null,
};

DialogEditCredentialMercadoPago.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  credential: PropTypes,
};

export default DialogEditCredentialMercadoPago;
