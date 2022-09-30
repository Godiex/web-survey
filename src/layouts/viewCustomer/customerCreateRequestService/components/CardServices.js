import React from "react";
// import { useDispatch } from "react-redux";
import { useMaterialUIController } from "context";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function CardsServices({ servicio, isCheck, callback }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  //   const dispatch = useDispatch();

  const handleChange = (id) => {
    callback(id);
  };

  return (
    <MDBox borderRadius="lg" mt={2} bgColor={darkMode ? "transparent" : "grey-100"}>
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "rgba(52, 52, 52, 0)",
          boxShadow: 0,
        }}
      >
        <CardActionArea sx={{ borderRadius: "lg" }} onClick={() => handleChange(servicio)}>
          <CardContent>
            <Grid container spacing={0.5}>
              <Grid item xs={12} sm={10} md={10}>
                {" "}
                <MDBox width="100%" display="flex" flexDirection="column">
                  <MDBox mb={1} lineHeight={0}>
                    <MDTypography variant="caption" color="text">
                      Nombre del servicio:&nbsp;&nbsp;&nbsp;
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        textTransform="capitalize"
                      >
                        {servicio.nameService}
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                  <MDBox mb={1} lineHeight={0}>
                    <MDTypography variant="caption" color="text">
                      Descripción:&nbsp;&nbsp;&nbsp;
                      <MDTypography variant="caption" fontWeight="medium">
                        {servicio.description}
                      </MDTypography>
                    </MDTypography>
                  </MDBox>
                  <MDBox width="100%">
                    <Grid container spacing={0.5}>
                      <Grid xs>
                        <MDTypography variant="caption" color="text">
                          Genera certificado:&nbsp;&nbsp;&nbsp;
                          <MDTypography variant="caption" fontWeight="medium">
                            {servicio.generateCertification ? "SI" : "NO"}
                          </MDTypography>
                        </MDTypography>
                      </Grid>
                    </Grid>
                  </MDBox>
                </MDBox>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                md={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Checkbox checked={isCheck} sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </MDBox>
  );
}
CardsServices.defaultProps = {
  isCheck: false,
};
CardsServices.propTypes = {
  isCheck: PropTypes.bool,
  callback: PropTypes.func.isRequired,
  servicio: PropTypes.shape({
    id: PropTypes.string,
    certificateId: PropTypes.string,
    description: PropTypes.string,
    generateCertification: PropTypes.bool,
    generateMonetaryValue: PropTypes.bool,
    isActive: PropTypes.bool,
    nameService: PropTypes.string,
    strategy: PropTypes.string,
    survey: PropTypes.shape({
      id: PropTypes.string,
      code: PropTypes.string,
      name: PropTypes.string,
    }),
    targetAudiences: PropTypes.string,
    timeCollectionMoney: PropTypes.string,
    validity: PropTypes.shape({ startDate: PropTypes.string, endDate: PropTypes.string }),
  }).isRequired,
};

export default CardsServices;
