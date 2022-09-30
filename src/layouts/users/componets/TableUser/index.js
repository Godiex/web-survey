import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import PeopleAlt from "@mui/icons-material/PeopleAlt";
import { useAlert } from "react-alert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import httpRequest from "../../../../services/httpRequest";
import TableMui from "../../../../components/TableMui/TableMui";
import AlertConfirm from "../../../../components/AlertConfirm";

function TableUser({
  listUsers,
  rowCount,
  page,
  pageSize,
  loading,
  handleAsignetRole,
  handleEditUser,
  getUsers,
  changePage,
  changePageSize,
  getDataSdvancedFilter,
  filters,
  updateFilters,
}) {
  const alert = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [infoState, setInfoState] = useState({});

  const handleActionUser = async (active, id) => {
    try {
      const dataActive = {
        activateUser: active,
        userId: id,
      };
      await httpRequest.create(`users/${id}/toggle-status`, dataActive);
      alert.show(`Usuario ${active ? "Activado" : "Desactivado"}`, {
        position: "top right",
      });
      getUsers();
      setIsOpen(!isOpen);
    } catch (error) {
      alert.show(`Error al ${active ? "Activar" : "Desactivar"} usuario`, {
        position: "top right",
      });
    }
  };

  const handleChangePage = (value) => changePage(value);

  const handleAlertStatus = (active, id) => {
    setInfoState({
      activateUser: active,
      userId: id,
    });
    setIsOpen(!isOpen);
  };

  const handlePageSize = (newPageSize) => changePageSize(newPageSize);

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "firstName",
      headerName: "Nombre",
      type: "string",
      fieldRef: "firstName",
      width: 160,
    },
    {
      field: "lastName",
      headerName: "Apellido",
      type: "string",
      fieldRef: "lastName",
      width: 160,
    },
    {
      field: "phoneNumber",
      headerName: "Teléfono",
      type: "string",
      fieldRef: "phoneNumber",
      width: 130,
    },
    {
      field: "address",
      headerName: "Dirección",
      type: "string",
      fieldRef: "address",
      width: 150,
    },
    {
      field: "userName",
      headerName: "Usuario",
      type: "string",
      fieldRef: "userName",
      width: 120,
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
      width: 150,
      renderCell: ({ row }) => {
        const template = (
          <>
            <Tooltip title="Ver perfil">
              <IconButton onClick={() => handleEditUser(row.id)} aria-label="delete" size="large">
                <AccountCircle fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Roles">
              <IconButton
                onClick={() => handleAsignetRole(row.id)}
                aria-label="delete"
                size="large"
              >
                <PeopleAlt fontSize="inherit" />
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
        rows={listUsers}
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
        } este usuario?`}
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() => handleActionUser(!infoState.activateUser, infoState.userId)}
      />
    </>
  );
}

// Setting default values for the props of ComplexProjectCard
TableUser.defaultProps = {
  listUsers: [],
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

// Typechecking props for the ProfileInfoCard
TableUser.propTypes = {
  listUsers: PropTypes.arrayOf(PropTypes.string),
  handleAsignetRole: PropTypes.func.isRequired,
  handleEditUser: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
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

export default TableUser;
