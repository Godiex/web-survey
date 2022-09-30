import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import DialogPoll from "./components/DialogPoll";
import TablePoll from "./components/TablePoll";
import httpRequest from "../../../services/httpRequest";

function ListPoll() {
  const [open, setOpen] = useState(false);
  const [listPollData, setListPoll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [typeForm, setTypeForm] = useState("");
  const [dataEditPoll, setDataEditPoll] = useState("");
  const [codeSurveys, setCodeSurveys] = useState("");
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const handleClickOpen = () => {
    const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    const codeRandom = `SV${numberRandom}`;
    setCodeSurveys(codeRandom);
    setTypeForm("registro");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getListPoll = useCallback(async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    setLoading(true);
    const { data, totalCount } = await httpRequest.create(`surveys/search`, dataSearch);
    setListPoll(data);
    setRowCount(totalCount);
    setLoading(false);
  }, [pageSize, page, advancedFilter]);

  const handlePoll = async (values) => {
    const data = {
      id: typeForm === "registro" ? "" : dataEditPoll.id,
      code: codeSurveys,
      name: values.name,
    };

    try {
      if (typeForm === "registro") {
        await httpRequest.create(`surveys/create`, data);
      } else {
        await httpRequest.update(`surveys/${dataEditPoll.id}/update`, "", data);
      }
      getListPoll();
      handleClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    getListPoll();
  }, [pageSize, page, advancedFilter]);

  const handleEditPoll = (idPoll) => {
    setOpen(true);
    setTypeForm("editar");
    const dataPoll = listPollData.find((poll) => poll.id === idPoll);
    setDataEditPoll(dataPoll);
    setCodeSurveys(dataPoll.code);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ textAlign: "right" }}
          >
            <MDButton
              onClick={handleClickOpen}
              variant="gradient"
              color="info"
              sx={() => MDButtonCustomByTenant(primaryColor)}
            >
              Crear encuesta
            </MDButton>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <TablePoll
                listPollData={listPollData}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                loading={loading}
                getListPoll={getListPoll}
                handleEditPoll={handleEditPoll}
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
      <DialogPoll
        open={open}
        handleClose={handleClose}
        handlePoll={handlePoll}
        getListPoll={getListPoll}
        dataEditPoll={dataEditPoll}
        typeForm={typeForm}
        codeSurveys={codeSurveys}
      />
    </>
  );
}

export default ListPoll;
