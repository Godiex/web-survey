import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import { useAlert } from "react-alert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";
import AssignmentLate from "@mui/icons-material/AssignmentLate";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import TableMui from "../../../../components/TableMui/TableMui";
import httpRequest from "../../../../services/httpRequest";
import AlertConfirm from "../../../../components/AlertConfirm";
import CreateOrder from "../../../../components/CreateOrder";

function TableAssociatedClients({
  listClients,
  rowCount,
  page,
  pageSize,
  getAssociatedClients,
  handleEditClient,
  changePage,
  changePageSize,
  loading,
  getDataSdvancedFilter,
  filters,
  updateFilters,
}) {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [infoState, setInfoState] = useState({});
  const [openVerify, setOpenVerify] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [openCreateOrder, setOpenCreateOrder] = useState(false);
  const [userId, setUserId] = useState(null);
  const handlePageSize = (newPageSize) => {
    changePageSize(newPageSize);
  };

  const handleChangePage = (newPage) => changePage(newPage);
  const handleCloseCreateOrder = () => setOpenCreateOrder(false);
  const handleOpenCreateOrder = (id) => {
    setUserId(id);
    setOpenCreateOrder(true);
  };

  const handleActionClient = async (active, id) => {
    if (active) {
      await httpRequest.create(`customers/${id}/deactivate`, id);
    } else {
      await httpRequest.create(`customers/${id}/activate`, id);
    }
    getAssociatedClients();
    setIsOpen(!isOpen);
  };

  const handleVerifyCustomer = async (idCustomerVerify) => {
    try {
      setLoadingVerify(true);
      await httpRequest.create(`customers/${idCustomerVerify}/verify`, idCustomerVerify);
      alert.show("Cliente verificado", { position: "top right" });
      setLoadingVerify(false);
      setOpenVerify(false);
      getAssociatedClients();
    } catch (error) {
      setLoadingVerify(false);
      alert.error("Error al verificar ", { position: "top right" });
    }
  };

  const handleAlertStatus = (active, id) => {
    setInfoState({
      activateUser: active,
      userId: id,
    });
    setIsOpen(!isOpen);
  };

  const handleAlertVerify = (idVerify) => {
    setInfoState({
      verify: idVerify,
    });
    setOpenVerify(!openVerify);
  };

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "name",
      headerName: "Nombre",
      type: "string",
      fieldRef: "name",
      width: 180,
    },
    {
      field: "nIdentification",
      headerName: "N° Identificacion",
      type: "string",
      fieldRef: "nIdentification",
      width: 180,
    },
    {
      field: "riskLevel",
      headerName: "Nivel de riesgo",
      type: "custom",
      fieldRef: "customerDetail.riskLevel",
      filterOptions: [
        { value: "0", name: "NIVEL1" },
        { value: "1", name: "NIVEL2" },
        { value: "2", name: "NIVEL3" },
        { value: "3", name: "NIVEL4" },
        { value: "4", name: "NIVEL5" },
        { value: "5", name: "NIVEL6" },
      ],
      width: 150,
      renderCell: ({ row }) => (row.customerDetail ? row.customerDetail.riskLevel : ""),
    },
    {
      field: "totalSquareMeters",
      headerName: "Total m²",
      type: "number",
      fieldRef: "customerDetail.totalSquareMeters",
      width: 100,
      renderCell: ({ row }) => (row.customerDetail ? row.customerDetail.totalSquareMeters : ""),
    },
    {
      field: "legalRepresentativeName",
      headerName: "Representante legal",
      type: "string",
      fieldRef: "customerDetail.legalRepresentative.name",
      width: 180,
      renderCell: ({ row }) =>
        row.customerDetail ? row.customerDetail.legalRepresentative.name : "",
    },
    {
      field: "state",
      headerName: "Estado",
      type: "boolean",
      fieldRef: "isActive",
      filterOptions: [
        { name: "Activo", value: true },
        { name: "Inactivo", value: false },
      ],
      width: 120,
      renderCell: ({ row }) => {
        const template = (
          <>
            {" "}
            {row.isActive ? "Activo" : "Inactivo"}
            <Switch
              checked={row.isActive}
              onChange={() => handleAlertStatus(row.isActive, row.id)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </>
        );
        return template;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 180,
      renderCell: ({ row }) => {
        const template = (
          <>
            <Tooltip title="Editar cliente">
              <IconButton onClick={() => handleEditClient(row.id)} aria-label="delete" size="large">
                <AccountCircle fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Crear orden">
              <IconButton
                onClick={() => handleOpenCreateOrder(row.id)}
                aria-label="delete"
                size="large"
              >
                <AddCircleOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Verificar cliente">
              <IconButton
                onClick={() => handleAlertVerify(row.id)}
                aria-label="delete"
                size="large"
                disabled={row.isVerified}
              >
                {row.isVerified ? (
                  <AssignmentTurnedIn fontSize="inherit" />
                ) : (
                  <AssignmentLate fontSize="inherit" />
                )}
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
        rows={listClients}
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
        getDataSdvancedFilter={getDataSdvancedFilter}
        filters={filters}
        updateFilters={updateFilters}
        autoHeight
      />
      <AlertConfirm
        open={isOpen}
        title="! Atención ¡"
        context={`¿Seguro de que desea ${
          infoState.activateUser ? "desactivar" : "activar"
        } este cliente?`}
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() => handleActionClient(infoState.activateUser, infoState.userId)}
      />
      <AlertConfirm
        open={openVerify}
        title="! Atención ¡"
        context="¿Seguro que desea verificar el cliente?"
        onClose={() => setOpenVerify(false)}
        onAccept={() => handleVerifyCustomer(infoState.verify)}
        loading={loadingVerify}
      />
      <CreateOrder open={openCreateOrder} onClose={handleCloseCreateOrder} idUser={userId} />
    </>
  );
}

// Setting default values for the props of ComplexProjectCard
TableAssociatedClients.defaultProps = {
  listClients: [],
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

// Typechecking props for the ProfileInfoCard
TableAssociatedClients.propTypes = {
  listClients: PropTypes.arrayOf(PropTypes.string),
  getAssociatedClients: PropTypes.func.isRequired,
  handleEditClient: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  filters: PropTypes.arrayOf(),
  updateFilters: PropTypes.func,
  getDataSdvancedFilter: PropTypes.func,
};

export default TableAssociatedClients;
