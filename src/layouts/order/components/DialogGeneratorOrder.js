import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAlert } from "react-alert";
import { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useTheme } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { closeSolicitudes, createOrder } from "../../../store/solicitudes/actions";

const validationSchema = Yup.object().shape({
  employee: Yup.object().required("Campo requerido"),
  nameClient: Yup.string(),
});

const getFirstIfExist = (first, second) => {
  if (first) return first;
  return second;
};

const DialogGeneratorOrder = (props) => {
  const { title, open, onClose, titleAccept, titleClose, obj, users, get } = props;
  const initialState = {
    nameClient: obj ? getFirstIfExist(obj.customer?.name, obj.name[0]) : "",
    employee: { id: "", name: "" },
    service: obj ? obj.service.nameService : "",
  };
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = {
        userId: obj?.service.timeCollectionMoney === "Before" ? "" : values.employee.id,
        // eslint-disable-next-line react/prop-types
        customerId: obj.customer.id,
        // eslint-disable-next-line react/prop-types
        serviceId: obj.service.id,
        visitDate: null,
      };
      await dispatch(createOrder(data));
      await dispatch(closeSolicitudes(obj.id));
      setLoading(false);
      onClose();
      alert.success(`success`);
      await get();
    } catch (e) {
      setLoading(false);
      onClose();
      alert.error(`Ocurrió un error`);
    }
  };
  return (
    <Dialog
      sx={{ m: 0, p: 2 }}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      open={open}
      onClose={onClose}
      maxWidth="md"
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
                      label="Nombre del cliente"
                      name="nameClient"
                      required
                      disabled
                      error={errors.nameClient && touched.nameClient}
                      helperText={touched.nameClient && errors.nameClient}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Autocomplete
                      id="employee"
                      disabled={obj && obj.service.timeCollectionMoney === "Before"}
                      defaultValue={initialState.employee}
                      name="employee"
                      options={users}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue("employee", value !== null ? value : initialState.employee);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Empleado a asignar"
                          variant="standard"
                          required={obj?.service.timeCollectionMoney !== "Before"}
                          fullWidth
                          name="employee"
                          InputLabelProps={{ shrink: true }}
                          error={errors.employee && touched.employee}
                          helperText={touched.employee && errors.employee}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      label="Servicio"
                      name="service"
                      required
                      disabled
                      error={errors.service && touched.service}
                      helperText={touched.service && errors.service}
                      inputProps={{ autoComplete: "off" }}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={onClose}>
                {titleClose}
              </Button>
              {loading ? (
                <CircularProgress color="secondary" />
              ) : (
                <MDButton type="submit" variant="gradient" color="dark" size="small">
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

DialogGeneratorOrder.defaultProps = {
  title: "",
  titleAccept: "Accept",
  titleClose: "Cancel",
  get: () => {},
};

DialogGeneratorOrder.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  titleAccept: PropTypes.string,
  titleClose: PropTypes.string,
  obj: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    service: PropTypes.shape({
      nameService: PropTypes.string,
      timeCollectionMoney: PropTypes.string,
    }),
    customer: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  get: PropTypes.func,
};

export default DialogGeneratorOrder;
