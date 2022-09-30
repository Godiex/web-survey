import * as React from "react";
import { useNavigate } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";
import { useAlert } from "react-alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Backup from "@mui/icons-material/Backup";
import EditIcon from "@mui/icons-material/Edit";
import httpRequest from "../../../../../services/httpRequest";
import TableMui from "../../../../../components/TableMui/TableMui";

function TablePoll({
  listPollData,
  rowCount,
  page,
  pageSize,
  loading,
  getListPoll,
  handleEditPoll,
  changePage,
  changePageSize,
  getDataSdvancedFilter,
  filters,
  updateFilters,
}) {
  const navigate = useNavigate();
  const alert = useAlert();
  const handleDeletePoll = async (id) => {
    await httpRequest.remove(`surveys/${id}/delete`, "");
    getListPoll();
  };

  const handleForm = async (idPoll) => {
    navigate(`/formularios/${idPoll}`);
  };

  const handleChangePage = (value) => changePage(value);

  const handlePageSize = (newPageSize) => changePageSize(newPageSize);

  const handlePublishPoll = async (idPollPublish) => {
    const dataId = {
      id: idPollPublish,
    };
    try {
      await httpRequest.create(`surveys/publish`, dataId);
      alert.show("Encuesta publicada", { position: "top right" });
    } catch (error) {
      alert.error("Error al publicar la encuesta", { position: "top right" });
    }
  };

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "code",
      headerName: "Código",
      type: "string",
      fieldRef: "code",
      width: 160,
    },
    {
      field: "name",
      headerName: "Nombre de encuesta",
      type: "string",
      fieldRef: "name",
      width: 600,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 220,
      renderCell: ({ row }) => {
        const template = (
          <>
            <Tooltip title="Agregar formularios">
              <IconButton onClick={() => handleForm(row.id)} aria-label="delete" size="large">
                <WysiwygIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar encuesta">
              <IconButton onClick={() => handleEditPoll(row.id)} aria-label="delete" size="large">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar encuesta">
              <IconButton onClick={() => handleDeletePoll(row.id)} aria-label="delete" size="large">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Publicar encuesta">
              <IconButton
                onClick={() => handlePublishPoll(row.id)}
                aria-label="delete"
                size="large"
              >
                <Backup fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </>
        );
        return template;
      },
    },
  ];

  return (
    <TableMui
      paginationMode="server"
      columns={columns}
      rows={listPollData}
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
  );
}

// Setting default values for the props of ComplexProjectCard
TablePoll.defaultProps = {
  listPollData: [],
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

// Typechecking props for the ProfileInfoCard
TablePoll.propTypes = {
  listPollData: PropTypes.arrayOf(PropTypes.string),
  getListPoll: PropTypes.func.isRequired,
  handleEditPoll: PropTypes.func.isRequired,
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

export default TablePoll;
