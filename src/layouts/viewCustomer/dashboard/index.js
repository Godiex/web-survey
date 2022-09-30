import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TablePagination from "@mui/material/TablePagination";
import { useSelector, useDispatch } from "react-redux";
import Filter from "components/Filter";
import CancelSolicitudDialog from "components/DialogSolicitudCancel";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import { filterByCustomer } from "../../../store/viewCustomer/actions";
import CardCustomerServices from "./components/cardCustomerServices";

const columns = [
  {
    headerName: "Nombre de servicio",
    type: "string",
    fieldRef: "service.nameService",
  },
  {
    headerName: "Descripcion de servicio",
    type: "string",
    fieldRef: "service.description",
  },
  {
    headerName: "Fecha del servicio",
    type: "dateTime",
    fieldRef: "createdOn",
  },
  {
    headerName: "Estado",
    type: "custom",
    fieldRef: "state",
    filterOptions: [
      { name: "Finalizada", value: "Closed" },
      { name: "Cancelada", value: "Canceled" },
    ],
  },
];

function dashboardCustomer() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const [selectId, setSelectId] = useState(null);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const servicesByCustomer = useSelector(({ viewCustomer }) => viewCustomer.servicesRequest);
  const totalServices = useSelector(({ viewCustomer }) => viewCustomer.totalCount);

  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(9);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleCloseCancelDialog = () => setSelectId(null);
  const handleSelectId = (id) => setSelectId(id);

  const handleFilterServices = async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: pageNumber + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    await dispatch(filterByCustomer(dataSearch));
  };

  useEffect(() => {
    handleFilterServices();
  }, [pageNumber, pageSize, advancedFilter]);

  return (
    <LayoutViewCustomer>
      <Card sx={{ mt: 2, backgroundColor: "#fafafa" }}>
        <Grid container mb={1}>
          <Grid item xs={7} display="flex">
            <Filter
              sxButton={{
                color: "#868686",
                "&:hover, &:focus": {
                  color: "#868686",
                },
              }}
              columns={columns}
              arrayFilters={filters}
              updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
              getObjectFilter={(filter) => {
                setAdvancedFilter(filter);
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TablePagination
              component="div"
              count={totalServices}
              page={pageNumber}
              onPageChange={handleChangePage}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[9, 18, 27]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Servicios por pagina:"
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={2}>
        {servicesByCustomer &&
          servicesByCustomer.map((service, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={`service-${index}`} item xs={12} sm={4} md={4}>
              <CardCustomerServices
                serviceRequest={service}
                onCancel={(id) => handleSelectId(id)}
              />
            </Grid>
          ))}
      </Grid>
      <CancelSolicitudDialog
        open={Boolean(selectId)}
        idSolicitud={selectId}
        type={0}
        onClose={handleCloseCancelDialog}
      />
    </LayoutViewCustomer>
  );
}

export default dashboardCustomer;
