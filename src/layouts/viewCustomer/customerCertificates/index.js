import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import Grid from "@mui/material/Grid";
import Filter from "components/Filter";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import { getCertificatesByCustomer } from "../../../store/certificate/actions";
import CardCertificate from "./components/CardCertificate";

const columns = [
  {
    headerName: "Nombre del certificado",
    type: "string",
    fieldRef: "certificateName",
  },
  {
    headerName: "Fecha del certificado",
    type: "dateTime",
    fieldRef: "createdOn",
  },
];

function CustomerCertificates() {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [listCertificate, setListCertificate] = React.useState([]);
  const [countCertificates, setCountCertificates] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleFilterCertificates = async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: pageNumber + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    const payload = await dispatch(getCertificatesByCustomer(dataSearch));
    setListCertificate(payload.data);
    setCountCertificates(payload.totalCount);
  };

  useEffect(() => {
    handleFilterCertificates();
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
              count={countCertificates}
              page={pageNumber}
              onPageChange={handleChangePage}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[8, 16, 24]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Servicios por pagina:"
            />
          </Grid>
        </Grid>
      </Card>
      <Grid container spacing={3}>
        {listCertificate.length !== 0 &&
          listCertificate.map((certificate) => (
            <Grid item xs={12} sm={6} md={6}>
              <CardCertificate certificate={certificate} />
            </Grid>
          ))}
      </Grid>
    </LayoutViewCustomer>
  );
}

export default CustomerCertificates;
