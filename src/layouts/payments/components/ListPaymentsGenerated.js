import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentsIcon from "@mui/icons-material/Payments";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TableMui from "../../../components/TableMui/TableMui";
import {
  getPaymentGenerated,
  getHistoryPaymentOrder,
} from "../../../store/paymentsGenerated/actions";
import StatusCell from "../../../components/StatusCell/StatusCell";
import DialogGeneratePay from "./DialogGeneratePay";
import DialogHistory from "./DialogHistory";

function ListPaymentsGenerated() {
  const dispatch = useDispatch();
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [openDialogToCreatePay, setOpenDialogToCreatePay] = useState(false);
  const [currentPaymentSelect, setCurrentPaymentSelect] = useState(null);
  const [openDialogHistory, setOpenDialogHistory] = useState(false);
  const listPayments = useSelector(({ paymentGenerated }) => paymentGenerated.payments);
  const history = useSelector(({ paymentGenerated }) => paymentGenerated.history);

  const handlePageSize = (newPageSize) => {
    setPageSize(newPageSize);
  };

  const handleChangePage = (newPage) => setPage(newPage);

  const handleToCreatePay = (payment) => {
    setCurrentPaymentSelect(payment);
    setOpenDialogToCreatePay(true);
  };

  const handleFilter = async () => {
    const dataSearch = {
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
    const payload = await dispatch(getPaymentGenerated(dataSearch));
    setRowCount(payload.totalCount);
  };

  const getHistoryPaymentOrderAction = async (id) => {
    await dispatch(getHistoryPaymentOrder(id));
    setOpenDialogHistory(true);
  };

  const closeDialogHistory = () => {
    setOpenDialogHistory(false);
  };

  useEffect(() => {
    handleFilter();
  }, [page, pageSize]);

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "serviceName",
      headerName: "Servicios a pagar",
      type: "string",
      minWidth: 300,
    },
    {
      field: "CustomerName",
      headerName: "Nombre del cliente",
      type: "string",
      minWidth: 300,
      renderCell: ({ row }) => row.customer.name,
    },
    {
      field: "isPaid",
      headerName: "Estado del pago",
      type: "boolean",
      width: 200,
      renderCell: ({ value }) => {
        let status;
        if (value) {
          status = <StatusCell icon="done" color="success" status="Pagada" />;
        } else {
          status = <StatusCell icon="notifications" color="warning" status="Pendiente de pago" />;
        }
        return status;
      },
    },
    {
      field: "valueToPay",
      headerName: "Valor a pagar",
      type: "number",
      width: 200,
    },
    {
      field: "acctions",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }) => {
        const template = (
          <>
            <Tooltip title="Registrar pago manual">
              <IconButton
                disabled={row.isPaid}
                onClick={() => handleToCreatePay(row)}
                aria-label="delete"
                size="medium"
              >
                <PaymentsIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Ver detalle de pago">
              <IconButton
                onClick={() => getHistoryPaymentOrderAction(row.id)}
                aria-label="delete"
                size="medium"
              >
                <VisibilityIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        );
        return template;
      },
    },
  ];

  return (
    <>
      <TableMui
        paginationMode="server"
        columns={columns}
        rows={listPayments}
        disableSelectionOnClick
        checkboxSelection={false}
        autoHeight
        rowCount={rowCount}
        pagination
        page={page}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={handleChangePage}
        onPageSizeChange={handlePageSize}
      />
      <DialogGeneratePay
        open={openDialogToCreatePay}
        onClose={() => setOpenDialogToCreatePay(false)}
        payment={currentPaymentSelect}
      />
      <DialogHistory
        openDialogHistory={openDialogHistory}
        closeDialogHistory={closeDialogHistory}
        history={history}
      />
    </>
  );
}
export default ListPaymentsGenerated;
