import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { assignUserOrder } from "../../../store/order/actions";

const validationSchema = Yup.object().shape({
  employee: Yup.object().required("Campo requerido"),
});

function DialogAssociateEmployee({ open, order, onClose, title, employees, callback }) {
  const initialState = {
    employee: { id: "", name: "" },
  };
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async (value) => {
    setLoading(true);
    try {
      const data = {
        serviceOrderId: order.id,
        userId: value.employee.id,
      };
      await dispatch(assignUserOrder(order.id, data));
      setLoading(false);
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
      setLoading(false);
    }

    onClose();
    callback();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Autocomplete
                      id="employee"
                      name="employee"
                      options={employees}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue("employee", value !== null ? value : initialState.employee);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Empleado a asignar"
                          variant="standard"
                          required
                          fullWidth
                          name="employee"
                          InputLabelProps={{ shrink: true }}
                          error={errors.employee && touched.employee}
                          helperText={touched.employee && errors.employee}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </DialogContent>
            <DialogActions>
              <MDBox>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button color="secondary" onClick={onClose}>
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    {loading ? (
                      <MDBox px={5}>
                        <CircularProgress color="secondary" />
                      </MDBox>
                    ) : (
                      <MDButton type="submit" variant="gradient" color="dark" size="small">
                        Asignar Empleado
                      </MDButton>
                    )}
                  </Grid>
                </Grid>
              </MDBox>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

DialogAssociateEmployee.propTypes = {
  open: PropTypes.bool.isRequired,
  order: PropTypes.node.isRequired,
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  employees: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default DialogAssociateEmployee;
