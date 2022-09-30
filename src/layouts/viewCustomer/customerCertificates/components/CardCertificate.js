import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { useMaterialUIController } from "context";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import ViewPdf from "../../../../components/ViewPdf";
import { getCertificatePdf } from "../../../../store/certificate/actions";
import { formatDate } from "../../../../utils/utils";
import FooterCardCustomer from "../../componets/FooterCardCustomer";

function CardCertificate({ certificate }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const handleCloseOrderDetails = () => setOpenOrderDetails(false);
  const [pdfLink, setPdfLink] = useState("");
  const dispatch = useDispatch();

  const handleDownload = async (url, name) => {
    const blob = await dispatch(getCertificatePdf(url));
    const bloobUrl = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = bloobUrl;
    link.download = `${name}.pdf`;
    setPdfLink(link);
    setOpenOrderDetails(true);
  };

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "#fffff"}
      coloredShadow="dark"
      borderRadius="lg"
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox p={2}>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Certificado:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {certificate.certificateName}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Fecha de la certificación:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {formatDate(certificate.createdOn)}
              </MDTypography>
            </MDTypography>
          </MDBox>
          <MDBox mb={1} lineHeight={0}>
            <MDTypography variant="caption" color="text">
              Fecha expiración del certificado:&nbsp;&nbsp;&nbsp;
              <MDTypography variant="caption" fontWeight="medium">
                {formatDate(certificate.expiresOn)}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>

        <FooterCardCustomer>
          <MDBox width="100%">
            <Grid container spacing={0.5}>
              <Grid xs>
                <MDBox
                  display="flex"
                  width="100%"
                  height="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <MDButton
                    onClick={() =>
                      handleDownload(certificate.routeCertificate, certificate.certificateName)
                    }
                    variant="text"
                    color="secondary"
                  >
                    &nbsp;Descargar
                  </MDButton>
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        </FooterCardCustomer>
      </MDBox>
      <ViewPdf open={openOrderDetails} data={pdfLink} onClose={handleCloseOrderDetails} />
    </MDBox>
  );
}
CardCertificate.propTypes = {
  certificate: PropTypes.shape({
    id: PropTypes.string,
    certificateName: PropTypes.string,
    createdOn: PropTypes.string,
    expiresOn: PropTypes.string,
    routeCertificate: PropTypes.string,
    serviceOrderId: PropTypes.string,
  }).isRequired,
};

export default CardCertificate;
