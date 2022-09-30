import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TableMui from "components/TableMui/TableMui";
import StatusCell from "components/StatusCell/StatusCell";
import AlertConfirm from "components/AlertConfirm";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useAlert } from "react-alert";
import {
  getManualPayments,
  changeStatusManualPayment,
} from "../../store/paymentsGenerated/actions";

function ManualPayments() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [listManualPaymnet, setListManualPaymnet] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [selectionModel, setSelectionModel] = useState([]);
  // const [selectedRow, setSelectedRow] = useState([]);

  const { tertiaryColor } = useSelector(({ company }) => company.tenantConfig);

  const openUrl = (url) => window.open(url, "Pasarela");

  const getListManualPayment = useCallback(async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };

    setLoading(true);
    const { data, totalCount } = await dispatch(getManualPayments(dataSearch));
    setListManualPaymnet(data);
    setRowCount(totalCount);
    setLoading(false);
  }, [pageSize, page, advancedFilter]);

  const handleOpenAlertConfirm = () => setIsOpen(!isOpen);

  const handleChangeStatusManualPayment = async (manualsPaymentsId) => {
    try {
      const { data } = await dispatch(changeStatusManualPayment({ manualsPaymentsId }));
      if (data?.initPoint) openUrl(data.initPoint);
    } catch (e) {
      if (e.Messages) alert.error(e.Messages[0], { position: "top right" });
      else alert.error("Erro al actualizar pago manual", { position: "top right" });
    } finally {
      setIsOpen(false);
    }
  };

  const handleSelectRows = (newSelectionModel) => {
    const newArray = newSelectionModel.filter(
      (item) => listManualPaymnet.find((payment) => payment.id === item).isReceived === false
    );
    setSelectionModel(newArray);
  };

  useEffect(() => {
    getListManualPayment();
  }, [pageSize, page, advancedFilter]);

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "customer",
      headerName: "Cliente",
      type: "string",
      fieldRef: "paymentOrder.customer.name",
      renderCell: ({ row }) => row.paymentOrder.customer.name,
      width: 250,
    },
    {
      field: "totalPay",
      headerName: "Total Pagado",
      type: "number",
      fieldRef: "paymentOrder.valueToPay",
      renderCell: ({ row }) => row.paymentOrder.valueToPay,
      width: 200,
    },
    {
      field: "payTo",
      headerName: "Pagado a",
      type: "string",
      fieldRef: "deliveryUser.firstName",
      renderCell: ({ row }) => row.deliveryUser.firstName,
      width: 200,
    },
    {
      field: "isReceived",
      headerName: "Estado",
      type: "boolean",
      fieldRef: "isReceived",
      // eslint-disable-next-line react/prop-types
      renderCell: ({ row }) =>
        // eslint-disable-next-line react/prop-types
        row.isReceived ? (
          <StatusCell icon="done" color="success" status="Entregado" />
        ) : (
          <StatusCell icon="close" color="error" status="Sin entregar" />
        ),
      filterOptions: [
        {
          name: "Entregado",
          value: true,
        },
        {
          name: "Sin entregar",
          value: false,
        },
      ],
      width: 200,
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" my={2}>
        <MDBox display="flex">
          <MDBox>
            <Tooltip key="CreatePayment" title="Marcada como pagado" placement="bottom">
              <MDButton
                onClick={handleOpenAlertConfirm}
                variant="gradient"
                color="info"
                disabled={!selectionModel.length}
                sx={() => MDButtonCustomByTenant(tertiaryColor)}
              >
                <CreditScoreIcon />
                Marcada como pagado
              </MDButton>
            </Tooltip>
          </MDBox>
        </MDBox>
      </MDBox>
      <Card>
        <TableMui
          paginationMode="server"
          columns={columns}
          rows={listManualPaymnet}
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          loading={loading}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          checkboxSelection
          onSelectionModelChange={handleSelectRows}
          selectionModel={selectionModel}
          changePage={(value) => setPage(value)}
          changePageSize={(value) => setPageSize(value)}
          filters={filters}
          updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
          getDataSdvancedFilter={(filter) => {
            setAdvancedFilter(filter);
          }}
          autoHeight
        />
      </Card>
      <AlertConfirm
        open={isOpen}
        title="! Atención ¡"
        context="¿Seguro de que desea cambiar a recibido estos pagos?"
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() => handleChangeStatusManualPayment(selectionModel)}
      />
    </DashboardLayout>
  );
}

export default ManualPayments;
