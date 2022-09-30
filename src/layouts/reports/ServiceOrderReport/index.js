import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import { getOrders } from "../../../store/order/actions";
import {
  generateServiceOrderReport,
  generateServiceOrderExcelReport,
  generateServiceOrderPdfReport,
} from "../../../services/report/ReportService";

function ServiceOrderReport() {
  const [page] = useState(0);
  const [pageSize] = useState(5);
  const [orderSelectedId, setOrderSelectedId] = useState(null);
  const [dataReport, setDataReport] = useState(null);

  const orders = useSelector(({ order }) => order.data);

  const dispatch = useDispatch();

  const getDataOrder = async () => {
    const request = {
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
    };
    await dispatch(getOrders(request));
  };

  useEffect(() => {
    (async () => {
      await getDataOrder();
    })();
  }, []);

  useEffect(() => {
    if (orderSelectedId != null) {
      (async () => {
        const data = await generateServiceOrderReport(orderSelectedId);
        setDataReport(data);
      })();
    }
  }, [orderSelectedId]);

  const handleDownloadPDf = async () => {
    const data = {
      id: orderSelectedId,
    };
    const blob = await generateServiceOrderPdfReport(data);
    const bloobUrl = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = bloobUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
  };

  const handleDownloadExcel = async () => {
    const data = {
      id: orderSelectedId,
    };
    const blob = await generateServiceOrderExcelReport(data);
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
        <Grid>
          <MDBox>
            <Card>
              <CardHeader title="Reporte Orden de Servicio" />
              <Grid container>
                <Grid item ml={4} mb={4} xs={6}>
                  <Autocomplete
                    id="serviceId"
                    name="serviceId"
                    options={orders}
                    getOptionLabel={(option) =>
                      `${option.serviceName[0]} , ${option.customerName[0]} ` ?? option
                    }
                    onChange={(e, value) => {
                      setDataReport(null);
                      setOrderSelectedId(value.id);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Servicios"
                        variant="standard"
                        fullWidth
                        required
                        name="serviceId"
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </Grid>
                <Grid item ml={4} mb={4} xs={5}>
                  <MDBox>
                    <MDButton
                      type="submit"
                      onClick={handleDownloadPDf}
                      disabled={!dataReport}
                      variant="gradient"
                      color="dark"
                    >
                      PDF
                    </MDButton>
                    <MDButton
                      type="submit"
                      disabled={!dataReport}
                      sx={{ marginLeft: "5%" }}
                      variant="gradient"
                      color="dark"
                      onClick={handleDownloadExcel}
                    >
                      EXCEL
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </Card>
          </MDBox>
        </Grid>
        {dataReport != null && (
          <Formik>
            <Form>
              <Grid mt={1} spacing={2} container>
                <Grid item xs={12}>
                  <MDBox>
                    <Card>
                      <CardHeader title="Información Cliente" />
                      <Grid ml={0} mb={2} container spacing={2}>
                        <Grid item xs={4}>
                          <Field
                            defaultValue={dataReport?.customer.address}
                            as={TextField}
                            inputProps={{ readOnly: true }}
                            sx={{ width: "70%" }}
                            label="Dirección"
                            name="address"
                            required
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            defaultValue={dataReport?.customer?.identificationType}
                            label="Tipo de Identificación"
                            inputProps={{ readOnly: true }}
                            sx={{ width: "70%" }}
                            name="identificationType"
                            required
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            defaultValue={dataReport?.customer?.nIdentification}
                            label="Número de identificación"
                            sx={{ width: "70%" }}
                            name="nIdentification"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            sx={{ width: "70%" }}
                            label="Nombre"
                            defaultValue={dataReport?.customer?.name}
                            name="name"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            defaultValue={dataReport?.customer?.arl}
                            sx={{ width: "70%" }}
                            label="ARL"
                            name="arl"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            sx={{ width: "70%" }}
                            label="Número de teléfono"
                            defaultValue={dataReport?.customer?.phoneNumber}
                            name="phoneNumber"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            sx={{ width: "70%" }}
                            label="Número de empleados"
                            defaultValue={dataReport?.customer?.customerDetail?.employeesNumber}
                            name="phoneNumber"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            sx={{ width: "70%" }}
                            label="Total metros cuadrados"
                            defaultValue={dataReport?.customer?.customerDetail?.totalSquareMeters}
                            name="phoneNumber"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            as={TextField}
                            sx={{ width: "70%" }}
                            defaultValue={dataReport?.customer?.customerDetail?.squareMetersBuilt}
                            label="Metros cuadrados construidos"
                            name="phoneNumber"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item mt={1} xs={6}>
                  <MDBox>
                    <Card>
                      <CardHeader title="Información Empleado" />
                      <Grid ml={0} mb={2} container spacing={2}>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            sx={{ width: "90%" }}
                            defaultValue={dataReport?.user?.identificationType}
                            label="Tipo de Identificación"
                            name="identificationType"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            label="Número de identificación"
                            defaultValue={dataReport?.user?.nuip}
                            sx={{ width: "90%" }}
                            name="nuip"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            label="Nombre"
                            defaultValue={dataReport?.user?.firstName}
                            sx={{ width: "90%" }}
                            name="nIdentification"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            sx={{ width: "90%" }}
                            label="Apellido"
                            defaultValue={dataReport?.user?.lastName}
                            name="adress"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            label="Dirección"
                            sx={{ width: "90%" }}
                            name="identificationType"
                            defaultValue={dataReport?.user?.address}
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Field
                            as={TextField}
                            label="Correo"
                            sx={{ width: "90%" }}
                            name="nIdentification"
                            defaultValue={dataReport?.user?.email}
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label="Número de teléfono"
                            defaultValue={dataReport?.user?.phoneNumber}
                            sx={{ width: "95%" }}
                            name="nIdentification"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </MDBox>
                </Grid>
                <Grid item mt={1} xs={6}>
                  <MDBox>
                    <Card>
                      <CardHeader title="Información Servicio" />
                      <Grid ml={0} mb={2} container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            sx={{ width: "90%" }}
                            label="Nombre"
                            defaultValue={dataReport?.service?.nameService}
                            name="adress"
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            label="Descripción"
                            sx={{ width: "90%" }}
                            name="nIdentification"
                            defaultValue={dataReport?.service?.description}
                            multiline
                            rows={7}
                            required
                            inputProps={{ readOnly: true }}
                            variant="standard"
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </MDBox>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        )}
      </DashboardLayout>
    </>
  );
}

export default ServiceOrderReport;
