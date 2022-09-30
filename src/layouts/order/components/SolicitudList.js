import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import PropTypes from "prop-types";
import CreateOrder from "components/CreateOrder";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import MDButtonCustomByTenant from "../../../components/MDButton/MDButtonCustomByTenant";
import TableMui from "../../../components/TableMui/TableMui";
import DialogAssociateClient from "./DialogAssociateClient";
import DialogFullScreen from "../../../components/DialogFullScreen";
import CancelSolicitudDialog from "../../../components/DialogSolicitudCancel";
import {
  handleOpenDialogFullScreen,
  setGeometryLocationsInitial,
} from "../../../store/map/actions";
import { associateToCustomer, closeSolicitudes } from "../../../store/solicitudes/actions";

const SolicitudeListTab = ({
  keyTable,
  servicesSolicitudes,
  loading,
  isOrder,
  customers,
  get,
  columns,
  checkboxSelection,
  closed,
  pageSize,
  onPageSizeChange,
  onPageChange,
  page,
  typesIdentity,
  typeEconomicActivities,
  getDataSdvancedFilter,
  filters,
  updateFilters,
}) => {
  const { primaryColor, tertiaryColor } = useSelector(({ company }) => company.tenantConfig);
  const [open, setOpen] = useState(false);
  const [openAssociate, setOpenAssociate] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [loadingAssigned, setLoading] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const rowCount = useSelector(({ solicitud }) => solicitud.totalCount);
  const openMapFullScreen = useSelector(({ map }) => map.openMapFullScreen);

  const handleCloseCancelDialog = () => setOpenCancelDialog(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(handleOpenDialogFullScreen(true));
  };

  const handleCloseFullScreen = () => {
    dispatch(handleOpenDialogFullScreen(false));
    dispatch(setGeometryLocationsInitial(false));
  };

  const hanldeCloseSolicited = async (id) => {
    const response = await dispatch(closeSolicitudes(id));
    return response;
  };

  useEffect(() => {
    if (selectedRow.length > 0) {
      setSelectId(selectedRow[0].id);
    }
  }, [selectedRow]);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const request = { serviceSolicitudeId: selectedRow[0].id, customerId: values.item.id };
      await dispatch(associateToCustomer(request));
      setLoading(false);
      // eslint-disable-next-line no-use-before-define
      handleCloseAssociate();
      alert.success(`Orden creada`);
      await get();
    } catch (e) {
      // eslint-disable-next-line no-use-before-define
      handleCloseAssociate();
      alert.error(`${e.Messages[0]}`, {
        position: "top right",
      });
    }
  };

  const handleClose = () => setOpen(false);

  const handleCloseAssociate = () => setOpenAssociate(false);

  const isNewClient = () => selectedRow.filter((e) => e.isAnonymous === true);

  const handlerGeneratorOrder = () => {
    if (isNewClient().length === 0) {
      setOpen(true);
    } else {
      alert.show(`Hay ${isNewClient().length} cliente no registrado`, {
        type: "warning",
        position: "top right",
      });
    }
  };

  const handleAssociateCustomer = () => {
    if (selectedRow[0].customer === null) {
      setOpenAssociate(true);
    } else {
      alert.show(`Ya esta asociada la solicitud a un cliente`, {
        type: "warning",
        position: "top right",
      });
    }
  };

  const handleCancelSolicitud = () => {
    setOpenCancelDialog(true);
  };

  const handleSelectRows = (newSelectionModel) => {
    if (!selectionModel.length) {
      setSelectionModel(newSelectionModel);
      // eslint-disable-next-line react/prop-types
      const datSelected = servicesSolicitudes.filter((e) => e.id === newSelectionModel[0]);
      setSelectedRow(datSelected);
    }

    if (selectionModel.length) {
      const newSelected = newSelectionModel.filter((e) => e !== selectionModel[0]);
      setSelectionModel(newSelected);
      // eslint-disable-next-line react/prop-types
      const datSelected = servicesSolicitudes.filter((e) => e.id === newSelected[0]);
      setSelectedRow(datSelected);
    }
  };

  return (
    <>
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox display="flex">
            {!isOrder && (
              <>
                <MDBox ml={1}>
                  <MDButton
                    onClick={handlerGeneratorOrder}
                    variant="gradient"
                    color="info"
                    disabled={!selectedRow.length}
                    sx={() => MDButtonCustomByTenant(tertiaryColor)}
                  >
                    Crear orden
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={handleCancelSolicitud}
                    disabled={!selectedRow.length}
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Cancelar Solicitud
                  </MDButton>
                </MDBox>
              </>
            )}
            {closed && (
              <>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={handleClickOpen}
                    disabled={!selectedRow.length}
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Registrar cliente
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={handleAssociateCustomer}
                    disabled={!selectedRow.length}
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Asociar a cliente
                  </MDButton>
                </MDBox>
                <MDBox ml={1}>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={handleCancelSolicitud}
                    disabled={!selectedRow.length}
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Cancelar Solicitud
                  </MDButton>
                </MDBox>
              </>
            )}
          </MDBox>
        </MDBox>
        <Card>
          <TableMui
            key={keyTable}
            paginationMode="server"
            columns={columns}
            rows={servicesSolicitudes}
            rowCount={rowCount}
            pagination
            page={page}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            loading={loading}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            disableSelectionOnClick
            checkboxSelection={checkboxSelection}
            onSelectionModelChange={handleSelectRows}
            selectionModel={selectionModel}
            getDataSdvancedFilter={getDataSdvancedFilter}
            filters={filters}
            updateFilters={updateFilters}
            autoHeight
          />
        </Card>
      </MDBox>
      <CreateOrder
        idSolicitud={selectedRow.length ? selectedRow[0].id : null}
        idService={selectedRow.length ? selectedRow[0].service.id : null}
        closeSolicitudes={(id) => hanldeCloseSolicited(id)}
        open={open}
        onClose={handleClose}
        idUser={selectedRow.length ? selectedRow[0].customer?.id : null}
      />

      <DialogAssociateClient
        title="Asociar a cliente"
        titleAccept="Asociar"
        titleClose="Cancelar"
        open={openAssociate}
        data={customers}
        loading={loadingAssigned}
        handleSubmit={handleSubmit}
        onClose={handleCloseAssociate}
        label="Cliente a asignar"
      />
      <DialogFullScreen
        open={openMapFullScreen}
        onClose={handleCloseFullScreen}
        associatedRequest={handleSubmit}
        listIdentification={typesIdentity}
        listEconomicActivities={typeEconomicActivities}
        typeForm="registro"
        so={selectedRow.length ? selectedRow[0] : null}
        get={get}
      />
      <CancelSolicitudDialog
        open={openCancelDialog}
        idSolicitud={selectId}
        type={0}
        onClose={handleCloseCancelDialog}
      />
    </>
  );
};

SolicitudeListTab.defaultProps = {
  checkboxSelection: false,
  getDataSdvancedFilter: () => {},
  filters: [],
  updateFilters: () => {},
};

SolicitudeListTab.propTypes = {
  keyTable: PropTypes.string.isRequired,
  servicesSolicitudes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  loading: PropTypes.bool.isRequired,
  isOrder: PropTypes.bool.isRequired,
  customers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  get: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  checkboxSelection: PropTypes.bool,
  closed: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  typesIdentity: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  typeEconomicActivities: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
  filters: PropTypes.arrayOf(),
  updateFilters: PropTypes.func,
  getDataSdvancedFilter: PropTypes.func,
};

export default SolicitudeListTab;
