import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { createCredentialsMercadoPago } from "../../../../store/paymentCredentials/actions";

const initialState = {
  accountName: "",
};

const validationSchema = Yup.object().shape({
  accountName: Yup.string().required("Campo requerido"),
});

function DialogTransactionMercadoPago({ code, open, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [message, setmessage] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleCreate = async (values) => {
    setLoading(true);
    setFinished(true);
    const responseCreate = await dispatch(
      createCredentialsMercadoPago({ code, accountName: values.accountName })
    );
    const newMenssges =
      typeof responseCreate === "string" ? "Se registro exitoso" : `Error: ${responseCreate[0]}`;
    setmessage(newMenssges);
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
            {loading && (
              <Grid container justifyContent="center" alignItems="center">
                <Grid item>
                  <CircularProgress color="secondary" />
                </Grid>
              </Grid>
            )}
            {!finished && (
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
                        flexWrap="wrap"
                        marginTop={2}
                      >
                        <Grid item xs={12} display="flex" justifyContent="end">
                          <MDButton type="submit">Crear credencial</MDButton>
                        </Grid>
                      </MDBox>
                    </MDBox>
                  </Form>
                )}
              </Formik>
            )}
            {finished && (
              <Grid container spacing={2}>
                <Grid item>{message}</Grid>
                <Grid item xs={12} display="flex" justifyContent="end">
                  <MDButton onClick={() => handleClose()}>Cerrar</MDButton>
                </Grid>
              </Grid>
            )}
          </DialogContent>
        </MDBox>
      </Dialog>
    </div>
  );
}
DialogTransactionMercadoPago.defaultProps = {
  code: null,
};

DialogTransactionMercadoPago.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  code: PropTypes.string,
};

export default DialogTransactionMercadoPago;
