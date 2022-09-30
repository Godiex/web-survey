import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import CardHeader from "@mui/material/CardHeader";
import { Field, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import {
  generateHistoryPaymentsReport,
  generateHistoryPaymentsExcelReport,
  generateHistoryPaymentsPdfReport,
} from "../../../services/report/ReportService";

function PaymentsReport() {
  const [dataPayments, setDataPayments] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await generateHistoryPaymentsReport();
      setDataPayments(data[0]);
    })();
  }, []);

  const handleDownloadExcel = async () => {
    const blob = await generateHistoryPaymentsExcelReport();
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

  const handleDownloadPDf = async () => {
    const blob = await generateHistoryPaymentsPdfReport();
    const bloobUrl = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
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
        {dataPayments !== null ? (
          <>
            <MDBox>
              <MDButton onClick={handleDownloadPDf} type="submit" variant="gradient" color="dark">
                PDF
              </MDButton>
              <MDButton
                onClick={handleDownloadExcel}
                type="submit"
                sx={{ marginLeft: "5%" }}
                variant="gradient"
                color="dark"
              >
                EXCEL
              </MDButton>
            </MDBox>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <MDBox>
                  <Card>
                    <CardHeader title="Orden de Pago" />
                    <Formik>
                      <Form>
                        <Grid container pl={3} pr={3} pb={3}>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  defaultValue={dataPayments?.paymentOrderNumber}
                                  sx={{ width: "70%" }}
                                  label="Número orden de Pago"
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  defaultValue={dataPayments?.valueToPay}
                                  sx={{ width: "70%" }}
                                  label="Valor a Pagar"
                                  name="valueToPay"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  defaultValue={dataPayments?.paymentStatus}
                                  label="Estado de pago"
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>

                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  defaultValue={dataPayments?.isPaid === true ? "Sí" : "No"}
                                  sx={{ width: "70%" }}
                                  label="¿Pagado?"
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={12} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  defaultValue={dataPayments?.serviceName}
                                  label="Servicio"
                                  name="valueToPay"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    </Formik>
                  </Card>
                </MDBox>
              </Grid>
              <Grid item xs={6}>
                <MDBox>
                  <Card>
                    <CardHeader title="Cliente" />
                    <Formik>
                      <Form>
                        <Grid container pl={3} pr={3} pb={3}>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Tipo de Identificación"
                                  defaultValue={dataPayments?.customer.identificationType}
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Número de identificación"
                                  defaultValue={dataPayments?.customer.nIdentification}
                                  name="valueToPay"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  defaultValue={dataPayments?.customer.name}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Nombre"
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  defaultValue={dataPayments?.customer.email}
                                  sx={{ width: "70%" }}
                                  label="Email"
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Número de Empleados"
                                  defaultValue={
                                    dataPayments?.customer.customerDetail.employeesNumber
                                  }
                                  name="valueToPay"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Nivel de Riesgo"
                                  defaultValue={dataPayments?.customer.riskLevel}
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                              <Grid item xs={6} mt={3}>
                                <Field
                                  as={TextField}
                                  inputProps={{ readOnly: true }}
                                  sx={{ width: "70%" }}
                                  label="Total m²"
                                  defaultValue={dataPayments?.customer.totalSquareMeters}
                                  name="numberOrder"
                                  required
                                  variant="standard"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Form>
                    </Formik>
                  </Card>
                </MDBox>
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

export default PaymentsReport;
