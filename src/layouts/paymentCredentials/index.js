import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { Icon, Card, CircularProgress } from "@mui/material";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDButtonCustomByTenant from "../../components/MDButton/MDButtonCustomByTenant";
import { searchCredentials } from "../../store/paymentCredentials/actions";
import { getPaymentGateway } from "../../store/paymentGateway/actions";
import CardPaymentGateway from "./components/CardPaymentGateway";
import DialogCreateCredential from "./components/DialogCreateCredential";
import DialogTransactionMercadoPago from "./components/DialogsTransaction/DialogTransactionMercadoPago";
import { useQuery } from "../../utils/utils";

function MyPaymentGateways() {
  const dispatch = useDispatch();
  const query = useQuery();
  const [queryItem, setQueryItem] = useState(query.get("code"));
  const { primaryColor, secondaryColor } = useSelector(({ company }) => company.tenantConfig);
  const [page] = useState(0);
  const [pageSize] = useState(5);
  const [isOpenDialogCreate, setIsOpenDialogCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const credentials = useSelector(({ paymentCredentials }) => paymentCredentials.data);
  const paymentsGateway = useSelector(({ paymentGateway }) => paymentGateway.data);

  const searchMyCredentials = async () => {
    setLoading(true);
    const filsters = {
      advancedSearch: {
        fields: [],
        keyword: "",
      },
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    await dispatch(searchCredentials(filsters));
    setLoading(false);
  };

  const dispatchGetpaymentGateway = async () => {
    await dispatch(getPaymentGateway());
  };

  const handleCangeStateDialog = () => setIsOpenDialogCreate(!isOpenDialogCreate);
  useEffect(() => {
    (async () => {
      await searchMyCredentials();
      await dispatchGetpaymentGateway();
    })();
  }, []);

  const renderBody = () => {
    const template = credentials.length ? (
      credentials.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={index} item xs={12} sm={4} md={4}>
          <Card>
            <CardPaymentGateway
              paymentsGateway={paymentsGateway}
              credential={row}
              callback={() => searchMyCredentials()}
            />
          </Card>
        </Grid>
      ))
    ) : (
      <></>
    );
    return template;
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <MDBox my={3}>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <MDButton
                onClick={() => handleCangeStateDialog()}
                variant="gradient"
                color="info"
                sx={() => MDButtonCustomByTenant(primaryColor, secondaryColor)}
              >
                <Icon>add</Icon>&nbsp; Agregar Pasarela de pago
              </MDButton>
            </MDBox>
          </MDBox>
          <Grid container spacing={3}>
            {loading ? (
              <Grid item xs={12} md={12}>
                <MDBox my={3}>
                  {" "}
                  <MDBox display="flex" justifyContent="center" alignItems="flex-center" mb={2}>
                    {" "}
                    <CircularProgress />
                  </MDBox>
                </MDBox>
              </Grid>
            ) : (
              renderBody()
            )}
          </Grid>
          <DialogCreateCredential
            onClose={() => handleCangeStateDialog()}
            open={isOpenDialogCreate}
            paymentsGateway={paymentsGateway}
            callback={() => searchMyCredentials()}
          />
        </Grid>
      </Grid>
      <DialogTransactionMercadoPago
        code={queryItem}
        open={Boolean(queryItem)}
        onClose={() => setQueryItem(null)}
      />
    </DashboardLayout>
  );
}

export default MyPaymentGateways;
