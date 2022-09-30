import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import httpRequest from "../../../services/httpRequest";
import TableAssociatedClients from "../components/TableAssociatedClients.js";
import DialogFullScreen from "../../../components/DialogFullScreen";
// eslint-disable-next-line import/named
import {
  handleOpenDialogFullScreen,
  setGeometryLocations,
  setGeometryLocationsInitial,
} from "../../../store/map/actions";

function ListClients() {
  const [listIdentification, setListIdentification] = useState([]);
  const [listClients, setListClients] = useState([]);
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listEconomicActivities, setListEconomicActivities] = useState([]);
  const [typeForm, setTypeForm] = useState("");
  const [dataClient, setDataClient] = useState("");

  const openMapFullScreen = useSelector(({ map }) => map.openMapFullScreen);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    dispatch(handleOpenDialogFullScreen(true));
    setTypeForm("registro");
  };

  const handleCloseFullScreen = () => {
    dispatch(handleOpenDialogFullScreen(false));
    dispatch(setGeometryLocationsInitial(false));
  };

  const getTypeIdentification = useCallback(async () => {
    const responseTypeIdentiofi = await httpRequest.getEntries(`identificationtypes`);
    setListIdentification(responseTypeIdentiofi);
  }, []);

  const getEconomicActivities = useCallback(async () => {
    const responseEconomicActiv = await httpRequest.getEntries(`economicactivities`);
    setListEconomicActivities(responseEconomicActiv);
  }, []);

  const getAssociatedClients = useCallback(async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    setLoading(true);
    const { data, totalCount } = await httpRequest.create(`customers/search`, dataSearch);
    setListClients(data);
    setRowCount(totalCount);
    setLoading(false);
  }, [pageSize, page, advancedFilter]);

  const handleEditClient = (idClientEdit) => {
    setTypeForm("editar");
    const dataClientFind = listClients.find((client) => client.id === idClientEdit);
    if (dataClientFind.geographicalCoordinates) {
      const coordinates = dataClientFind.geographicalCoordinates;
      const location = {
        lat: parseFloat(coordinates.latitude),
        lng: parseFloat(coordinates.longitude),
      };
      dispatch(setGeometryLocations(location, dataClientFind.address, 19));
    }
    setDataClient(dataClientFind);
    dispatch(handleOpenDialogFullScreen(true));
  };

  useEffect(() => {
    const isRefresh = JSON.parse(localStorage.getItem("isRefresh"));
    if (isRefresh) {
      window.location.reload();
      localStorage.setItem("isRefresh", false);
    } else {
      localStorage.setItem("isRefresh", false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getTypeIdentification();
      await getEconomicActivities();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getAssociatedClients();
    })();
  }, [dispatch, pageSize, page, advancedFilter]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            item
            xs={12}
            md={12}
          >
            <MDButton
              onClick={handleClickOpen}
              variant="gradient"
              color="info"
              sx={() => MDButtonCustomByTenant(primaryColor)}
            >
              Crear Clientes
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <TableAssociatedClients
                listClients={listClients}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                loading={loading}
                getAssociatedClients={getAssociatedClients}
                handleEditClient={handleEditClient}
                changePage={setPage}
                changePageSize={setPageSize}
                filters={filters}
                updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
                getDataSdvancedFilter={(filter) => {
                  setAdvancedFilter(filter);
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </DashboardLayout>
      <DialogFullScreen
        open={openMapFullScreen}
        onClose={handleCloseFullScreen}
        listIdentification={listIdentification}
        listEconomicActivities={listEconomicActivities}
        typeForm={typeForm}
        dataClient={dataClient}
        get={getAssociatedClients}
      />
    </>
  );
}

export default ListClients;
