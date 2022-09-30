import { useState } from "react";
// react-router-dom components
import { Link } from "react-router-dom";
// @mui material components
import Switch from "@mui/material/Switch";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <IllustrationLayout
      title="Iniciar sesión"
      description="Ingrese su correo electrónico y contraseña"
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <MDInput type="email" label="Correo" fullWidth />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Contraseña" fullWidth />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Recuérdame
          </MDTypography>
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth>
            iniciar sesión
          </MDButton>
        </MDBox>
        <MDBox mt={3} textAlign="center">
          <MDTypography
            component={Link}
            to="/authentication/password-reset/cover"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            ¿Olvidaste la contraseña?
          </MDTypography>
        </MDBox>
        <MDBox mt={1} textAlign="center">
          <MDTypography
            component={Link}
            to="/authentication/sign-up/cover"
            variant="button"
            color="info"
            fontWeight="medium"
            textGradient
          >
            Crear cuenta
          </MDTypography>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Illustration;
