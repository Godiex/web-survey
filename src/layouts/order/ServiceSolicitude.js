import { useEffect, useState } from "react";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// Material Dashboard 2 PRO React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import breakpoints from "../../assets/theme/base/breakpoints";
import SolicitudeListTab from "./components/SolicitudList";
import { getServicesSolicitudes } from "../../store/solicitudes/actions";
import { getPollsterUsers } from "../../store/user/actions";
import { getCustomers } from "../../store/customer/actions";
import dataTableData from "./dataTableData";
import { getIdentificationTypes } from "../../store/identificationTypes/actions";
import { getEconomicActivities } from "../../store/economicActivities/actions";
import OrderDetails from "./components/OrderDetails";

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    >
      {value === index && <MDBox sx={{ p: 3 }}>{children}</MDBox>}
    </div>
  );
}

function ServiceSolicitude() {
  const [tabValue, setTabValue] = useState(0);
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);
  const servicesSolicitudes = useSelector(({ solicitud }) => solicitud.data);
  const users = useSelector(({ user }) => user.data);
  const customers = useSelector(({ customer }) => customer.data);
  const typesIdentity = useSelector(({ identificationTypes }) => identificationTypes.data);
  const typeEconomicActivities = useSelector(({ economicActivities }) => economicActivities.data);
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();

  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    setFilters([]);
  };

  const handleOpenOrderDetail = (row) => {
    setSelectedRow(row);
    setOpenOrderDetails(true);
  };
  const handleCloseOrderDetails = () => setOpenOrderDetails(false);

  const handlePageSize = (newPageSize) => setPageSize(newPageSize);

  const handleChangePage = (newPage) => setPage(newPage);

  const getDataServiceSolicitudes = async () => {
    const state = ["Pending", "InProgress", "Closed", "Canceled"];
    const request = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: ["createdOn desc"],
      state: state[tabValue],
    };
    setLoading(true);
    await dispatch(getServicesSolicitudes(request));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await dispatch(getPollsterUsers());
      await dispatch(getCustomers());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getIdentificationTypes());
      await dispatch(getEconomicActivities());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getDataServiceSolicitudes();
    })();
  }, [dispatch, tabValue, pageSize, page, advancedFilter]);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    /**
     The event listener that's calling the handleTabsOrientation function when resizing the window.
     */
    window.addEventListener("resize", handleTabsOrientation);
    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const columsWDetails = [
    ...dataTableData.columns2,
    {
      field: "details",
      headerName: "Detalle",
      width: 100,
      // eslint-disable-next-line react/prop-types
      renderCell: ({ row }) => (
        <IconButton onClick={() => handleOpenOrderDetail(row)}>
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={10}>
        <Grid container>
          <Grid item xs={12} sm={8} lg={6}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab label="Pendiente" />
                <Tab label="En proceso" />
                <Tab label="Cerrada" />
                <Tab label="Cancelada" />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </MDBox>
      <div>
        <TabPanel value={tabValue} index={0}>
          <SolicitudeListTab
            keyTable="with-state-pending"
            columns={columsWDetails}
            servicesSolicitudes={servicesSolicitudes.filter((e) => e.state === "Pending")}
            loading={loading}
            checkboxSelection
            customers={customers}
            isOrder
            closed
            users={users}
            get={getDataServiceSolicitudes}
            pageSize={pageSize}
            onPageSizeChange={handlePageSize}
            onPageChange={handleChangePage}
            typesIdentity={typesIdentity}
            typeEconomicActivities={typeEconomicActivities}
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SolicitudeListTab
            key="with-state-InProgress"
            columns={columsWDetails}
            servicesSolicitudes={servicesSolicitudes.filter((e) => e.state === "InProgress")}
            loading={loading}
            checkboxSelection
            customers={customers}
            isOrder={false}
            closed={false}
            users={users}
            get={getDataServiceSolicitudes}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={handlePageSize}
            onPageChange={handleChangePage}
            typesIdentity={typesIdentity}
            typeEconomicActivities={typeEconomicActivities}
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <SolicitudeListTab
            key="with-state-Closed"
            columns={columsWDetails}
            servicesSolicitudes={servicesSolicitudes.filter((e) => e.state === "Closed")}
            loading={loading}
            customers={customers}
            isOrder
            closed={false}
            checkboxSelection={false}
            users={users}
            get={getDataServiceSolicitudes}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={handlePageSize}
            onPageChange={handleChangePage}
            typesIdentity={typesIdentity}
            typeEconomicActivities={typeEconomicActivities}
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
          />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <SolicitudeListTab
            key="with-state-Canceled"
            columns={columsWDetails}
            servicesSolicitudes={servicesSolicitudes.filter((e) => e.state === "Canceled")}
            loading={loading}
            customers={customers}
            isOrder
            closed={false}
            checkboxSelection={false}
            users={users}
            get={getDataServiceSolicitudes}
            pageSize={pageSize}
            page={page}
            onPageSizeChange={handlePageSize}
            onPageChange={handleChangePage}
            typesIdentity={typesIdentity}
            typeEconomicActivities={typeEconomicActivities}
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
          />
        </TabPanel>
      </div>
      <OrderDetails
        title="Solicitud Detalle"
        open={openOrderDetails}
        data={selectedRow}
        loading={loading}
        onClose={handleCloseOrderDetails}
      />
    </DashboardLayout>
  );
}

export default ServiceSolicitude;
