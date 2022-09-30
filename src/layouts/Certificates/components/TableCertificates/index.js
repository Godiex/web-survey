import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import TableMui from "../../../../components/TableMui/TableMui";
import AlertConfirm from "../../../../components/AlertConfirm";
import httpRequest from "../../../../services/httpRequest";

function TableCertificates({
  listCertificateData,
  rowCount,
  page,
  pageSize,
  loading,
  changePage,
  changePageSize,
  getListCertificates,
  handleEdit,
  getDataSdvancedFilter,
  filters,
  updateFilters,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [infoState, setInfoState] = useState({});
  const handleChangePage = (value) => changePage(value);

  const handlePageSize = (newPageSize) => changePageSize(newPageSize);

  const handleActionCertificate = async (active, id) => {
    if (active) {
      await httpRequest.create(`certificate/${id}/disablecertificate`, id);
    } else {
      await httpRequest.create(`certificate/${id}/activecertificate`, id);
    }
    getListCertificates();
    setIsOpen(!isOpen);
  };

  const handleAlertStatus = (active, id) => {
    setInfoState({
      activateCertificate: active,
      idCertificate: id,
    });
    setIsOpen(!isOpen);
  };

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    { field: "code", headerName: "Código", width: 160, type: "string", fieldRef: "code" },
    {
      field: "name",
      headerName: "Nombre de plantilla",
      width: 600,
      type: "string",
      fieldRef: "name",
    },
    {
      field: "nDaysExpire",
      headerName: "# de Dias para expirar",
      width: 200,
      type: "number",
      fieldRef: "nDaysExpire",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      renderCell: ({ row }) => {
        const template = (
          <>
            <Tooltip title="Editar plantilla">
              <IconButton onClick={() => handleEdit(row.id)} aria-label="delete" size="large">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
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
  ];

  return (
    <>
      <TableMui
        paginationMode="server"
        columns={columns}
        rows={listCertificateData}
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
          infoState.activateCertificate ? "desactivar" : "activar"
        } esta plantilla?`}
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() =>
          handleActionCertificate(infoState.activateCertificate, infoState.idCertificate)
        }
      />
    </>
  );
}

TableCertificates.defaultProps = {
  listCertificateData: [],
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

TableCertificates.propTypes = {
  listCertificateData: PropTypes.arrayOf(PropTypes.string),
  rowCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  changePageSize: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getListCertificates: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(),
  updateFilters: PropTypes.func,
  getDataSdvancedFilter: PropTypes.func,
};

export default TableCertificates;
