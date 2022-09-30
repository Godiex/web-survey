import React, { useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ViewPdf from "../../components/ViewPdf";
import ListGeneratedCertificates from "./components/ListGeneratedCertificates";

function CertificatedGenerates() {
  const [pdfLink, setPdfLink] = useState("");
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const handleCloseViewPdf = () => setOpenOrderDetails(false);

  const handleOpenViewPdf = async (linkBlob) => {
    setPdfLink(linkBlob);
    setOpenOrderDetails(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid sx={{ mt: 4 }} container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <ListGeneratedCertificates callback={(linkBlob) => handleOpenViewPdf(linkBlob)} />
            <ViewPdf open={openOrderDetails} data={pdfLink} onClose={handleCloseViewPdf} />
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default CertificatedGenerates;
