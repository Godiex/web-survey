import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import CancelIcon from "@mui/icons-material/Cancel";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ContentPasteSearch from "@mui/icons-material/ContentPasteSearch";
import EventIcon from "@mui/icons-material/Event";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import CancelSolicitudDialog from "../../components/DialogSolicitudCancel";
import MDBox from "../../components/MDBox";
import TableMui from "../../components/TableMui/TableMui";
import dataTableData from "./dataTableData";
import { getOrders, assignVisitdate } from "../../store/order/actions";
import { getPollsterUsers } from "../../store/user/actions";
import DialogAssociateEmployee from "./components/DialogAssociateEmployee";
import DialogDetailOrder from "./components/DialogDetailOrder";
import DialogSelectDateToVisit from "./components/DialogSelectDateToVisit";
import httpRequest from "../../services/httpRequest";

const Order = () => {
  const alert = useAlert();
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const [dataSelect, setDataSelect] = useState(null);
  const [idOrder, setIdOrder] = useState(null);
  const [openDetailOrder, setOpenDetailOrder] = useState(false);
  const [openSelectDate, setOpenSelectDate] = useState(false);
  const [dataDetailOrder, setDataDetailOrder] = useState("");
  const [suvery, setSuvery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const handleCloseCancelDialog = () => setOpenCancelDialog(false);
  const handleCancelSolicitud = (id) => {
    setIdOrder(id);
    setOpenCancelDialog(true);
  };

  const rowCount = useSelector(({ order }) => order.totalCount);
  const orders = useSelector(({ order }) => order.data);
  const users = useSelector(({ user }) => user.data);

  const dispatch = useDispatch();

  const handlePageSize = (newPageSize) => setPageSize(newPageSize);

  const handleCloseDialog = () => {
    setopenDialog(!openDialog);
    setDataSelect(null);
  };
  const handleOpenDialog = (order) => {
    setDataSelect(order);
    setopenDialog(!openDialog);
  };

  const handleOpenDialogSelectDate = (order) => {
    setDataSelect(order);
    setOpenSelectDate(!openDialog);
  };
  const handleCLoseDialogSelectDate = () => {
    setOpenSelectDate(false);
  };
  const handleAcceptChageDateToVisit = async (date) => {
    const data = {
      id: dataSelect.id,
      visitDate: date,
    };
    const response = await dispatch(assignVisitdate(dataSelect.id, data));
    if (response) alert.show("Fecha de visita asignada", { position: "top right" });
    else
      alert.show("Ocurrio un error al asignar la fecha de visita", {
        position: "top right",
      });
    return response;
  };

  const handleChangePage = (newPage) => setPage(newPage);

  const getDataOrder = async () => {
    const request = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
    };
    setLoading(true);
    await dispatch(getOrders(request));
    setLoading(false);
  };

  const handleDetailDialog = async (idServiceOrder) => {
    try {
      setLoadingDetail(true);
      const response = await httpRequest.getEntries(`serviceorder/${idServiceOrder}`);
      setOpenDetailOrder(true);
      setDataDetailOrder(response);
      setSuvery(
        JSON.parse(
          !!response &&
            !!response.completionDetail &&
            !!response.completionDetail.surveyPublished &&
            response.completionDetail.surveyPublished.jsonData
        )
      );
      setQuestions(!!response && !!response.completionDetail && response.completionDetail.answers);
      setAttachments(
        !!response && !!response.completionDetail && response.completionDetail.attachments
      );
      setLoadingDetail(false);
    } catch (e) {
      setLoadingDetail(false);
      alert.show("Error al consultar detalle", { position: "top right" });
      setOpenDetailOrder(false);
    }
  };

  const handleCloseDetailOrder = () => {
    setOpenDetailOrder(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await getDataOrder();
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [dispatch, pageSize, page, advancedFilter]);

  useEffect(() => {
    (async () => {
      await dispatch(getPollsterUsers());
    })();
  }, []);
  function renderOptionsOrder(order) {
    return (
      <Grid container>
        {order.orderStatus !== "InProgress" &&
          order.orderStatus !== "Finished" &&
          order.orderStatus !== "Cancelled" &&
          order.orderStatus !== "PendingPayment" &&
          order.orderStatus !== "Certified" && (
            <Grid item sm={3}>
              <Tooltip title="Cancelar">
                <IconButton
                  color="error"
                  disabled={
                    order.orderStatus === "InProgress" ||
                    order.orderStatus === "Finished" ||
                    order.orderStatus === "Cancelled" ||
                    order.orderStatus === "PendingPayment" ||
                    order.orderStatus === "Certified"
                  }
                  onClick={() => {
                    handleCancelSolicitud(order.id);
                  }}
                  aria-label="cancel"
                  size="medium"
                >
                  <CancelIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          )}
        {(order.orderStatus === "PendingAssignment" || order.orderStatus === "Assigned") && (
          <Grid item sm={3}>
            <Tooltip title="Asignar Empleado">
              <IconButton
                disabled={
                  order.orderStatus !== "PendingAssignment" && order.orderStatus !== "Assigned"
                }
                onClick={() => handleOpenDialog(order)}
                aria-label="delete"
                size="medium"
              >
                <ManageAccountsIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
        <Grid item sm={3}>
          <Tooltip disabled={loadingDetail} title="Detalle">
            <IconButton
              onClick={() => handleDetailDialog(order.id)}
              aria-label="delete"
              size="medium"
            >
              <ContentPasteSearch fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Grid>
        {order.orderStatus === "Assigned" && (
          <Grid item sm={3}>
            <Tooltip title="Asignar fecha de visita">
              <IconButton
                disabled={order.orderStatus !== "Assigned"}
                onClick={() => handleOpenDialogSelectDate(order)}
                aria-label="delete"
                size="medium"
              >
                <EventIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    );
  }

  const columns = [
    ...dataTableData.ordersColumns,
    {
      field: "actions",
      headerName: "Acciones",
      width: 250, // eslint-disable-next-line react/prop-types,no-shadow
      renderCell: ({ row }) => renderOptionsOrder(row),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Card>
          <TableMui
            paginationMode="server"
            columns={columns}
            rows={orders}
            rowCount={rowCount}
            pagination
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            loading={loading}
            onPageChange={handleChangePage}
            onPageSizeChange={handlePageSize}
            disableSelectionOnClick
            checkboxSelection={false}
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
            autoHeight
          />
        </Card>
      </MDBox>
      <CancelSolicitudDialog
        open={openCancelDialog}
        idSolicitud={idOrder}
        type={1}
        onClose={handleCloseCancelDialog}
      />
      <DialogAssociateEmployee
        open={openDialog}
        onClose={handleCloseDialog}
        callback={getDataOrder}
        order={dataSelect}
        employees={users}
      />
      <DialogDetailOrder
        openDetailOrder={openDetailOrder}
        handleCloseDetailOrder={handleCloseDetailOrder}
        dataDetailOrder={dataDetailOrder}
        suvery={suvery}
        questions={questions}
        attachments={attachments}
      />
      <DialogSelectDateToVisit
        open={openSelectDate}
        onClose={() => handleCLoseDialogSelectDate()}
        onAccept={(date) => handleAcceptChageDateToVisit(date)}
        dateToVisit={dataSelect?.visitDate}
      />
    </DashboardLayout>
  );
};

export default Order;
