import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  useMediaQuery,
  Autocomplete,
} from "@mui/material";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { useTheme } from "@emotion/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";

const validationSchema = Yup.object().shape({
  item: Yup.object().required("Campo requerido"),
});

const DialogAssociateClient = ({
  title,
  open,
  onClose,
  titleAccept,
  titleClose,
  data,
  handleSubmit,
  loading,
  label,
}) => {
  const initialState = {
    item: { id: "", name: "" },
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Autocomplete
                      id="item"
                      defaultValue={initialState.item}
                      name="item"
                      fullWidth
                      options={data}
                      getOptionLabel={(option) => option.name ?? option}
                      onChange={(e, value) => {
                        setFieldValue("item", value !== null ? value : initialState.item);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={label}
                          variant="standard"
                          required
                          fullWidth
                          name="item"
                          InputLabelProps={{ shrink: true }}
                          error={errors.item && touched.item}
                          helperText={touched.item && errors.item}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </DialogContent>
            <DialogActions>
              <MDButton variant="outlined" color="secondary" size="small" onClick={onClose}>
                {titleClose}
              </MDButton>
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
