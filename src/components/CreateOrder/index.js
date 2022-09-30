import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Dialog, DialogContent, DialogTitle, Autocomplete, Typography } from "@mui/material";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import InfoIcon from "@mui/icons-material/Info";
import MDBox from "../MDBox";
import MDButton from "../MDButton";
import { getAllService } from "../../services/GenerateServices/GenerateService";
import { getPollsterUsers } from "../../store/user/actions";
import { createOrder } from "../../store/solicitudes/actions";

function CreateOrder({ open, onClose, idUser, idService, closeSolicitudes, idSolicitud }) {
  const [listServices, setListServices] = useState([]);
  const [userIdSelected, setUserId] = useState(null);
  const [serviceIdSelected, setServiceId] = useState(null);
  const [isEmployedSelected, setIsEmployedSelected] = useState(true);
  const alert = useAlert();
  const dispatch = useDispatch();

  const users = useSelector(({ user }) => user.data);

  const initialValues = {
    serviceId: "",
    customerId: "",
    userId: "",
  };

  const handleSubmit = async (_, { resetForm }) => {
    try {
      const newData = {
        serviceId: serviceIdSelected.id,
        customerId: idUser,
        userId: userIdSelected?.id,
        visitDate: null,
      };
      await closeSolicitudes(idSolicitud);
      await dispatch(createOrder(newData));
      onClose();
      alert.success("Se ha enviado la solicitud correctamente");
      resetForm();
    } catch (e) {
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
    }
  };

  useEffect(() => {
    getAllService().then((val) => setListServices(val));
  }, []);

  useEffect(() => {
    if (idService) {
      const serviceSelected = listServices.find(
        (service) => service.id === idService.toUpperCase()
      );
      if (serviceSelected) {
        setServiceId(serviceSelected);
        if (serviceSelected.automaticEmployeeSelection) setIsEmployedSelected(false);
        else setIsEmployedSelected(serviceSelected.timeCollectionMoney === "After");
      }
    }
  }, [idService]);

  useEffect(() => {
    (async () => {
      await dispatch(getPollsterUsers());
    })();
  }, []);

  return (
    <>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        style={{ height: "700px" }}
      >
        <DialogTitle>Crear Orden</DialogTitle>

        <DialogContent style={{ marginTop: -10 }} width="90%" height="90%">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Autocomplete
                      id="serviceId"
                      name="serviceId"
                      disabled={idSolicitud !== ""}
                      options={listServices}
                      value={serviceIdSelected}
                      onChange={(e, value) => {
                        setServiceId(value);
                        setUserId(null);
                        if (value.automaticEmployeeSelection) setIsEmployedSelected(false);
                        else setIsEmployedSelected(value.timeCollectionMoney === "After");
                      }}
                      getOptionLabel={(option) => option.nameService ?? option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Servicios"
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
                  <Grid item xs={6} sm={6} md={6}>
                    <Autocomplete
                      id="userId"
                      name="userId"
                      disabled={!isEmployedSelected}
                      options={users}
                      value={userIdSelected}
                      getOptionLabel={(option) =>
                        `${option.firstName} ${option.lastName}` ?? option
                      }
                      onChange={(e, value) => {
                        setUserId(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Empleado"
                          variant="standard"
                          fullWidth
                          name="userId"
                          InputLabelProps={{ shrink: true }}
                          error={errors.userId && touched.userId}
                          helperText={touched.userId && errors.userId}
                        />
                      )}
                    />
                    {serviceIdSelected && serviceIdSelected.automaticEmployeeSelection && (
                      <Grid mt={1} container>
                        <Grid
                          item
                          xs={6}
                          sm={1}
                          md={1}
                          display="flex"
                          justifyItems="center"
                          alignContent="center"
                        >
                          <InfoIcon />
                        </Grid>
                        <Grid item xs={6} sm={11} md={11}>
                          <Typography variant="caption" display="block" gutterBottom>
                            El empleado se asignará de forma automática según la agenda de cada
                            empleado
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item style={{ marginLeft: "80%" }}>
                    <MDBox mt={4} mb={1} pr={1}>
                      <MDButton type="submit" variant="gradient" color="dark" fullWidth>
                        Enviar orden
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}

CreateOrder.defaultProps = {
  closeSolicitudes: () => true,
  idSolicitud: "",
  idService: "",
};

CreateOrder.propTypes = {
  idService: PropTypes.string,
  idSolicitud: PropTypes.string,
  closeSolicitudes: PropTypes.func,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  idUser: PropTypes.string.isRequired,
};

export default CreateOrder;
