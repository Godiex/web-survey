import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Card from "@mui/material/Card";
import TablePagination from "@mui/material/TablePagination";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import { getServiceWithoutToken } from "../../../store/generateService/actions";
import CardsServices from "./components/CardServices";
import { createSolicitudesCustomer } from "../../../store/solicitudes/actions";

function CustomerCreateRequestService() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [listServices, setlistServices] = useState([]);
  const [currentSelect, setcurrentSelect] = useState(null);
  const [countServices, setCountServices] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(6);

  const handleFilterCertificates = async () => {
    // const dataSearch = {
    //   keyword: "",
    //   pageNumber: pageNumber + 1,
    //   pageSize,
    //   orderBy: [],
    // };
    const tenant = localStorage.getItem("idTenant");
    const { data, totalCount } = await dispatch(getServiceWithoutToken(tenant));
    setlistServices(data);
    setCountServices(totalCount);
  };

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };
  const handleSelect = (service) => {
    setcurrentSelect(service);
  };
  const handleAccept = async () => {
    try {
      if (currentSelect) {
        const data = {
          serviceId: currentSelect.id,
        };
        await dispatch(createSolicitudesCustomer(data));
        alert.success("Solicitud creada correctamente");
        setcurrentSelect(null);
      }
    } catch (e) {
      alert.error("Ocurrio un error inesperado");
    }
  };

  useEffect(() => {
    handleFilterCertificates();
  }, [pageNumber, pageSize]);

  return (
    <LayoutViewCustomer>
      <Grid container spacing={0.5}>
        <Grid xs={12}>
          <Card sx={{ mt: 2, backgroundColor: "#fafafa" }}>
            <TablePagination
              component="div"
              count={countServices}
              page={pageNumber}
              onPageChange={handleChangePage}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[6, 12, 18]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Servicios por pagina:"
            />
          </Card>
        </Grid>
        <Grid xs={12}>
          {" "}
          <Grid container spacing={3}>
            {listServices.length !== 0 &&
              listServices.map((service) => (
                <Grid item xs={12} sm={6} md={6}>
                  <CardsServices
                    servicio={service}
                    isCheck={currentSelect === service}
                    callback={handleSelect}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid xs={12} pt={2}>
          <Card sx={{ mt: 2, backgroundColor: "#fafafa" }}>
            <MDBox width="100%">
              <Grid container spacing={0.5}>
                <Grid xs={12}>
                  <MDBox
                    display="flex"
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <MDButton
                      disabled={!currentSelect}
                      width="100%"
                      onClick={() => handleAccept()}
                      variant="text"
                      color="secondary"
                    >
                      &nbsp;Generar Solicitud de servicio
                    </MDButton>
                  </MDBox>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </LayoutViewCustomer>
  );
}

export default CustomerCreateRequestService;
