import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import { useAlert } from "react-alert";
import DialogRegisterCertificates from "./components/DialogRegisterCertificates";
import { getCertificates } from "../../store/certificate/actions";
import httpRequest from "../../services/httpRequest";
import TableCertificates from "./components/TableCertificates";

function Certificates() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [typeDialog, setTypeDialog] = useState("");
  const [dataEdit, setDataEdit] = useState("");
  const [StateDataText, setDataText] = useState("");
  const [codeCertificate, setCodeCertificate] = useState("");

  const listCertificateData = useSelector(({ certificate }) => certificate.dataCertificates);
  const rowCount = useSelector(({ certificate }) => certificate.totalCount);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const handleClickOpen = () => {
    const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    const codeRandom = `CER${numberRandom}`;
    setCodeCertificate(codeRandom);
    setTypeDialog("registro");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDataText("");
  };

  const getListCertificates = useCallback(async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    setLoading(true);
    await dispatch(getCertificates(dataSearch));
    setLoading(false);
  }, [pageSize, page, advancedFilter]);

  const handleSaveCertificate = async (values, dataText) => {
    try {
      const dataCertificate = {
        id: typeDialog === "registro" ? "" : dataEdit.id,
        code: codeCertificate,
        nDaysExpire: values.nDaysExpire,
        name: values.name,
        templateHtml: `<!DOCTYPE html><html><body>${dataText}</body></html>`,
      };
      if (typeDialog === "registro") {
        await httpRequest.create(`certificate/create`, dataCertificate);
        alert.show("Certificado creado", { position: "top right" });
        getListCertificates();
        handleClose();
      } else {
        await httpRequest.put(`certificate/${dataEdit.id}`, dataCertificate);
        alert.show("Certificado actualizado", { position: "top right" });
        getListCertificates();
        handleClose();
      }
    } catch (e) {
      alert.error(`Error al ${typeDialog === "registro" ? "crear" : "actualizar"} el certificado`, {
        position: "top right",
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    getListCertificates();
  }, [pageSize, page, advancedFilter]);

  const handleEdit = async (idEdit) => {
    try {
      const filterCertificates = await httpRequest.get(`certificate/${idEdit}`);
      setTypeDialog("editar");
      setDataEdit(filterCertificates);
      setDataText(filterCertificates.templateHtml);
      setCodeCertificate(filterCertificates.code);
      setOpen(true);
    } catch (e) {
      if (e.status === 404)
        alert.error(`No se pudo encontrar el certificado seleccionado`, {
          position: "top right",
        });
      setOpen(false);
    }
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
              Crear Certificado
            </MDButton>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <TableCertificates
                listCertificateData={listCertificateData}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                loading={loading}
                changePage={setPage}
                changePageSize={setPageSize}
                getListCertificates={getListCertificates}
                handleEdit={handleEdit}
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
      <DialogRegisterCertificates
        open={open}
        handleClose={handleClose}
        handleSaveCertificate={handleSaveCertificate}
        typeDialog={typeDialog}
        dataEdit={dataEdit}
        setDataText={setDataText}
        StateDataText={StateDataText}
        codeCertificate={codeCertificate}
      />
    </>
  );
}

export default Certificates;
