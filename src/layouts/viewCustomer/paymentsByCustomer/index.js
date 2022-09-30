import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import Filter from "components/Filter";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import CardsPayments from "./components/CardsPayments";
import ModalToPay from "./components/ModalToPay/ModalToPay";
import { filterPaymentsOrderByCustomer } from "../../../store/viewCustomer/actions";
import { searchCredentials } from "../../../store/paymentCredentials/actions";
import { getPaymentGateway } from "../../../store/paymentGateway/actions";

const columns = [
  {
    headerName: "Valor del pago",
    type: "number",
    fieldRef: "valueToPay",
  },
  {
    headerName: "Nombre del servicio",
    type: "string",
    fieldRef: "serviceName",
  },
  {
    headerName: "estado del pago",
    type: "boolean",
    fieldRef: "isPaid",
    filterOptions: [
      { name: "Pagada", value: true },
      { name: "Pendiente", value: false },
    ],
  },
];

function PaymentsByCustomer() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const PaymenstOrdersByCustomer = useSelector(({ viewCustomer }) => viewCustomer.paymentsOrdes);
  const paymentsGateway = useSelector(({ paymentGateway }) => paymentGateway.data);
  const credentials = useSelector(({ paymentCredentials }) => paymentCredentials.data);
  const totalPaymenstOrders = useSelector(
    ({ viewCustomer }) => viewCustomer.totalCountPaymentsOrdes
  );

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [openDialogPay, setOpenDialogPay] = useState(false);
  const [paymentSelecet, setPaymentSelecet] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };
  const handleDialogPay = () => {
    setOpenDialogPay(!openDialogPay);
  };
  const handleSelectPayment = (payment) => {
    setPaymentSelecet(payment);
    handleDialogPay();
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleFilterServices = async () => {
    const dataSearch = {
      advancedFilter,
      pageNumber: pageNumber + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    await dispatch(filterPaymentsOrderByCustomer(dataSearch));
  };

  const dispatchGetpaymentGateway = async () => {
    await dispatch(getPaymentGateway());
  };

  const searchMyCredentials = async () => {
    const dataSearch = {
      keyword: "",
      pageNumber: pageNumber + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    await dispatch(searchCredentials(dataSearch));
  };

  useEffect(() => {
    handleFilterServices();
  }, [pageNumber, pageSize, advancedFilter]);

  useEffect(() => {
    searchMyCredentials();
    dispatchGetpaymentGateway();
  }, []);

  return (
    <LayoutViewCustomer>
      <Card sx={{ mt: 2, backgroundColor: "#fafafa" }}>
        <Grid container mb={1}>
          <Grid item xs={7} display="flex">
            <Filter
              sxButton={{
                color: "#868686",
                "&:hover, &:focus": {
                  color: "#868686",
                },
              }}
              columns={columns}
              arrayFilters={filters}
              updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
              getObjectFilter={(filter) => {
                setAdvancedFilter(filter);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TablePagination
              component="div"
              count={totalPaymenstOrders}
              page={pageNumber}
              onPageChange={handleChangePage}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[9, 18, 27]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Pagos por pagina:"
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={3}>
        {PaymenstOrdersByCustomer &&
          PaymenstOrdersByCustomer.map((service, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`service-${index}`} item xs={12} sm={4} md={4}>
              <CardsPayments payment={service} callback={(item) => handleSelectPayment(item)} />
            </Grid>
          ))}
      </Grid>
      <ModalToPay
        credential={credentials}
        paymentsGateway={paymentsGateway}
        isOpen={openDialogPay}
        serviceOrderId={paymentSelecet?.id}
        onClose={() => handleDialogPay()}
      />
    </LayoutViewCustomer>
  );
}

export default PaymentsByCustomer;
