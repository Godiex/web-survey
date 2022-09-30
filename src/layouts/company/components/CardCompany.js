import PropTypes from "prop-types";
// @mui material components
import Icon from "@mui/material/Icon";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

function CardCompany({ noGutter, onUpdate, company, checked, onChangeCheck }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleSetVisible = () => {
    onChangeCheck(company.id, checked);
  };

  const handleClick = () => {
    onUpdate(company);
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {company.name}
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Nombre empresa:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company.legalRepresentative.name}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Email:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {company.adminEmail}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          NIT:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {company.nIdentification}
          </MDTypography>
        </MDTypography>
      </MDBox>
      <MDBox width="100%">
        <Grid container spacing={0.5}>
          <Grid xs>
            <MDBox mr={1} display="flex" width="100%" justifyContent="center" alignItems="center">
              <Switch checked={checked} onChange={handleSetVisible} />
            </MDBox>
          </Grid>
          <Grid xs>
            <MDBox display="flex" width="100%" justifyContent="center" alignItems="center">
              <MDButton
                onClick={() => handleClick()}
                variant="text"
                color={darkMode ? "white" : "dark"}
              >
                <Icon>edit</Icon>&nbsp;editar
              </MDButton>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
CardCompany.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
CardCompany.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  onChangeCheck: PropTypes.func.isRequired,
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    adminEmail: PropTypes.string,
    nIdentification: PropTypes.string,
    legalRepresentative: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
  noGutter: PropTypes.bool,
};

export default CardCompany;
