import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CardHeader from "@mui/material/CardHeader";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import TableReports from "../TableReport";
import {
  generateMetricsReport,
  generateMetricsPdfReport,
  generateMetricsExcelReport,
} from "../../../services/report/ReportService";

function ReportTest() {
  const [rowCount] = useState(5);
  const [reportData, setReportData] = useState(null);
  const [dataPie, setDataPie] = useState(null);
  const [dataChart, setDataChart] = useState(null);
  const [columnsRequestService] = useState([
    {
      field: "serviceName",
      headerName: "Nombre Servicio",
      type: "string",
      fieldRef: "serviceName",
      width: 500,
    },
    {
      field: "amount",
      headerName: "Total",
      fieldRef: "amount",
      width: 500,
    },
  ]);
  const [columnsPaymentCustomers] = useState([
    {
      field: "customerName",
      headerName: "Nombre Cliente",
      type: "string",
      fieldRef: "customerName",
      width: 500,
    },
    {
      field: "totalGenerated",
      headerName: "Total",
      fieldRef: "totalGenerated",
      width: 500,
    },
  ]);
  const [requestServiceData, setRequestServiceData] = useState([]);
  const [paymentCustomersData, setpaymentCustomersData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    (async () => {
      const data = await generateMetricsReport();
      setReportData(data);
    })();
  }, []);

  const buildPieData = () => {
    const pieData = [
      {
        id: "En progreso",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountInProgress
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Pendientes",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountPending
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Canceladas",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountCancelled
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Asignadas",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountAssigned
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Aprobadas",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountFinishedApproved
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Rechazadas",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountFinishedRejected
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
      {
        id: "Sin Asignar",
        value:
          reportData !== undefined && reportData !== null
            ? reportData?.numberServiceOrderByState.amountPendingAssignment
            : 0,
        color: "hsl(288, 70%, 50%)",
      },
    ];
    setDataPie(pieData);
  };

  const buildBarData = () => {
    const DataBar = [
      {
        state: "SIP",
        "Solicitudes en Progreso": reportData.numberServiceSolicitudeByState.amountInProgress,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
      {
        state: "SCA",
        "Solicitudes Canceladas": reportData.numberServiceSolicitudeByState.amountCanceled,
        "value stateColor": "hsl(173, 70%, 50%)",
      },
      {
        state: "SC",
        "Solicitudes Cerradas": reportData.numberServiceSolicitudeByState.amountClosed,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
      {
        state: "SP",
        "Solicitudes Pendientes": reportData.numberServiceSolicitudeByState.amountPending,
        "value stateColor": "hsl(288, 70%, 50%)",
      },
    ];
    setDataChart(DataBar);
  };

  const buildRequestServiceData = () => {
    const listRequest = [];
    reportData.numbersOfTimesTheyRequestService.forEach((e) => {
      const request = {
        id: requestServiceData.length,
        serviceName: e.serviceName,
        amount: e.amount,
      };
      listRequest.push(request);
    });
    setRequestServiceData(listRequest);
  };

  const buildPaymentCustomersData = () => {
    const listRequest = [];
    reportData.totalPaidByCustomers.forEach((e) => {
      const request = {
        id: paymentCustomersData.length,
        customerName: e.customerName,
        totalGenerated: e.totalGenerated,
      };
      listRequest.push(request);
    });
    setpaymentCustomersData(listRequest);
  };

  useEffect(() => {
    if (reportData != null) {
      buildPieData();
      buildBarData();
      buildRequestServiceData();
      buildPaymentCustomersData();
    }
  }, [reportData]);

  const handleDownloadPDf = async () => {
    const blob = await generateMetricsPdfReport();
    const bloobUrl = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = bloobUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadExcel = async () => {
    const blob = await generateMetricsExcelReport();
    const bloobUrl = window.URL.createObjectURL(
      new Blob([blob], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    );
    const link = document.createElement("a");
    link.href = bloobUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {reportData !== null && dataPie !== null && dataChart !== null ? (
          <>
            <MDBox>
              <MDButton
                style={{ marginLeft: "2%" }}
                onClick={handleDownloadPDf}
                type="submit"
                variant="gradient"
                color="dark"
              >
                PDF
              </MDButton>
              <MDButton
                style={{ marginLeft: "2%" }}
                onClick={handleDownloadExcel}
                type="submit"
                variant="gradient"
                color="dark"
              >
                EXCEL
              </MDButton>
            </MDBox>
            <Grid container>
              <Grid item xs={6}>
                <MDBox mt={2}>
                  <Card sx={{ marginLeft: "2%" }}>
                    <CardHeader title="Registro de usuarios" />
                    <Grid container pl={2} spacing={1} mb={4}>
                      <Grid item xs={6} sm={6} mt={2} style={{ height: "200px" }}>
                        <ResponsivePie
                          data={dataPie}
                          innerRadius={0.5}
                          padAngle={0.7}
                          cornerRadius={3}
                          activeOuterRadiusOffset={8}
                          borderWidth={1}
                          enableArcLinkLabels={false}
                          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                          arcLinkLabelsSkipAngle={10}
                          arcLinkLabelsTextColor="#333333"
                          arcLinkLabelsThickness={2}
                          arcLinkLabelsColor={{ from: "color" }}
                          arcLabelsSkipAngle={10}
                          arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                        />
                      </Grid>
                      <Grid item xs sm={6}>
                        <MDBox mt={1} mb={1} pr={1} ml={1}>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            Solicitudes en progreso{" "}
                            {reportData?.numberServiceOrderByState.amountInProgress}
                          </p>
                          <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                            Solicitudes pendientes{" "}
                            {reportData?.numberServiceOrderByState.amountPending}
                          </p>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            Solicitudes canceladas{" "}
                            {reportData?.numberServiceOrderByState.amountCancelled}
                          </p>
                          <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                            Solicitudes asignadas{" "}
                            {reportData?.numberServiceOrderByState.amountAssigned}
                          </p>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            Solicitudes sin asignar{" "}
                            {reportData?.numberServiceOrderByState.amountPendingAssignment}
                          </p>
                          <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                            Solicitudes Aprobadas{" "}
                            {reportData?.numberServiceOrderByState.amountFinishedApproved}
                          </p>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            Solicitudes Rechazadas{" "}
                            {reportData?.numberServiceOrderByState.amountFinishedRejected}
                          </p>
                          <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                            Total de solicitudes {reportData?.numberServiceOrderByState.totalAmount}
                          </p>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox mt={2}>
                  <Card sx={{ marginLeft: "2%" }}>
                    <CardHeader title="Registro de usuarios" />
                    <Grid container pl={2} spacing={1} mb={4}>
                      <Grid item xs={6} sm={6} mt={2} mb={3.8} style={{ height: "200px" }}>
                        <ResponsiveBar
                          data={dataChart}
                          keys={[
                            "Solicitudes en Progreso",
                            "Solicitudes Canceladas",
                            "Solicitudes Cerradas",
                            "Solicitudes Pendientes",
                          ]}
                          indexBy="state"
                          margin={{ top: 5, right: 0, bottom: 20, left: 30 }}
                          valueScale={{ type: "linear" }}
                          indexScale={{ type: "band", round: true }}
                          axisTop={null}
                          axisRight={null}
                          axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "country",
                            legendPosition: "middle",
                            legendOffset: 32,
                          }}
                          axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "food",
                            legendPosition: "middle",
                            legendOffset: -40,
                          }}
                          enableGridY={false}
                          enableLabel={false}
                          labelSkipWidth={12}
                          labelSkipHeight={12}
                          labelTextColor={{
                            from: "color",
                            modifiers: [["darker", 1.6]],
                          }}
                          legends={[]}
                          role="application"
                          ariaLabel="Nivo bar chart demo"
                        />
                      </Grid>
                      <Grid item xs sm={6}>
                        <MDBox mt={4} mb={1} pr={1} ml={1}>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            En progreso {reportData.numberServiceSolicitudeByState.amountInProgress}
                          </p>
                          <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                            Canceladas {reportData.numberServiceSolicitudeByState.amountCanceled}
                          </p>
                          <p style={{ fontSize: "17px", color: "#FF7006" }}>
                            Cerradas {reportData.numberServiceSolicitudeByState.amountClosed}
                          </p>
                          <p style={{ fontSize: "17px", color: "#1B4E7C" }}>
                            Pendientes {reportData.numberServiceSolicitudeByState.amountPending}
                          </p>
                          <p style={{ fontSize: "17px", color: "#96BE1F" }}>
                            Total {reportData.numberServiceSolicitudeByState.totalAmount}
                          </p>
                        </MDBox>
                      </Grid>
                    </Grid>
                  </Card>
                </MDBox>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} mt={2} sm={12}>
                <Card>
                  <TableReports
                    listClients={paymentCustomersData}
                    rowCount={rowCount}
                    page={page}
                    pageSize={pageSize}
                    changePage={setPage}
                    changePageSize={setPageSize}
                    tableColumns={columnsPaymentCustomers}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} mt={2} sm={12}>
                <Card>
                  <TableReports
                    listClients={requestServiceData}
                    rowCount={rowCount}
                    page={page}
                    pageSize={pageSize}
                    changePage={setPage}
                    changePageSize={setPageSize}
                    tableColumns={columnsRequestService}
                  />
                </Card>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </DashboardLayout>
    </>
  );
}

export default ReportTest;
