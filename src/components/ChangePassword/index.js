// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import MDInput from "components/MDInput";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { updatePassword } from "../../store/profile/actions";

const initialValues = {
  password: "",
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Campo requerido"),
  newPassword: Yup.string()
    .required("Campo requerido")
    .min(8, "El campo contraseña debe tener mínimo 8 digitos.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "El campo contraseña debe tener mínimo un número, mínimo una letra minúscula y mínimo una mayúscula."
    ),
  confirmNewPassword: Yup.string()
    .required("Campo requerido")
    .when("newPassword", {
      is: (val) => val && val.length > 0,
      then: Yup.string().oneOf([Yup.ref("newPassword")], "Ambas contraseñas deben ser iguales"),
    }),
});

const passwordRequirements = [
  "Un caracter especial",
  "Min 8 characters",
  "Un número (se recomiendan 2)",
  "Cambiarla a menudo",
];

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <MDBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <MDTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </MDTypography>
      </MDBox>
    );
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await dispatch(
        updatePassword(values, () => {
          alert.success("Actualizado correctamente");
        })
      );
      resetForm({ values: "" });
      setLoading(false);
    } catch (e) {
      alert.error("Ocurrió un error al actualizar la contraseña");
      setLoading(false);
    }
  };

  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Cambio de contraseña</MDTypography>
      </MDBox>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <MDBox pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    fullWidth
                    variant="standard"
                    label="Contraseña actual"
                    inputProps={{ type: "password", autoComplete: "" }}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={MDInput}
                    name="newPassword"
                    variant="standard"
                    fullWidth
                    label="Nueva contraseña"
                    inputProps={{ type: "password", autoComplete: "" }}
                    error={errors.newPassword && touched.newPassword}
                    helperText={touched.newPassword && errors.newPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={MDInput}
                    name="confirmNewPassword"
                    variant="standard"
                    fullWidth
                    label="Confirmar nueva contraseña"
                    inputProps={{ type: "password", autoComplete: "" }}
                    error={errors.confirmNewPassword && touched.confirmNewPassword}
                    helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                  />
                </Grid>
              </Grid>
              <MDBox mt={6} mb={1}>
                <MDTypography variant="h5">Requisitos de contraseña</MDTypography>
              </MDBox>
              <MDBox mb={1}>
                <MDTypography variant="body2" color="text">
                  Siga esta guía para obtener una contraseña segura
                </MDTypography>
              </MDBox>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                flexWrap="wrap"
              >
                <MDBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
                  {renderPasswordRequirements}
                </MDBox>
                <MDBox ml="auto">
                  <MDButton
                    disabled={loading}
                    type="submit"
                    variant="gradient"
                    color="dark"
                    size="small"
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Actualiza contraseña
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Form>
        )}
      </Formik>
    </Card>
  );
}

export default ChangePassword;
