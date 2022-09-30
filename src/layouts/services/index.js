import Card from "@mui/material/Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
import MDButtonCustomByTenant from "../../components/MDButton/MDButtonCustomByTenant";
import headerServices from "./headerServices";
import {
  activateServiceAction,
  desActivateServiceAction,
  getServices,
} from "../../store/generateService/actions";
import DialogCreateService from "./components/DialogCreateService";
import { getCostServiceStrategy } from "../../store/costServiceStrategy/actions";
import AlertConfirm from "../../components/AlertConfirm";
import TableMui from "../../components/TableMui/TableMui";
import { getSurveys } from "../../store/survey/actions";
import { getCertificates } from "../../store/certificate/actions";

const Services = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [openAlert, setOpenAlert] = useState(false);
  const [objSelected, setObjectSelected] = useState(null);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();
  const rowCount = useSelector(({ service }) => service.totalCount);
  const services = useSelector(({ service }) => service.data);
  const strategy = useSelector(({ serviceStrategy }) => serviceStrategy.data);
  const surveys = useSelector(({ survey }) => survey.data);
  const listCertificate = useSelector(({ certificate }) => certificate.dataCertificates);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const handleChangePage = (newPage) => setPage(newPage);

  const handleClickCell = (params) => {
    if (params.field === "isActive") {
      const obj = services.find((e) => e.id === params.id);
      setObjectSelected(obj);
      setOpenAlert(true);
    }
    if (params.field === "action") {
      const obj = services.find((e) => e.id === params.id);
      setIsUpdate(true);
      setObjectSelected(obj);
      setOpen(true);
    }
  };

  const handlePageSize = (newPageSize) => setPageSize(newPageSize);

  const handleClose = () => {
    setOpen(false);
    setObjectSelected(null);
    setIsUpdate(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setObjectSelected(null);
  };

  const handleAcceptAlert = async () => {
    if (objSelected.isActive === true) {
      await dispatch(desActivateServiceAction({ serviceId: objSelected.id }));
    } else {
      await dispatch(activateServiceAction({ serviceId: objSelected.id }));
    }
    handleCloseAlert();
    // eslint-disable-next-line no-use-before-define
    await getData();
  };

  const getData = async () => {
    const request = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
    };
    setLoading(true);
    await dispatch(getServices(request));
    setLoading(false);
  };
  const getDataCertificados = async () => {
    const request = {
      advancedSearch: {
        fields: [],
        keyword: "",
      },
      keyword: "",
      pageNumber: 0,
      pageSize: 0,
      orderBy: [],
    };
    setLoading(true);
    await dispatch(getCertificates(request));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await getData();
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [dispatch, pageSize, page, advancedFilter]);

  useEffect(() => {
    (async () => {
      await dispatch(getCostServiceStrategy());
      await dispatch(getSurveys());
      getDataCertificados();
    })();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute={false} />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDButton
            onClick={() => setOpen(true)}
            variant="gradient"
            color="info"
            sx={() => MDButtonCustomByTenant(primaryColor)}
          >
            Crear servicio
          </MDButton>
        </MDBox>
        <Card>
          <TableMui
            columns={headerServices.columns}
            rows={services}
            pageSize={pageSize}
            onPageSizeChange={handlePageSize}
            rowsPerPageOptions={[5, 10, 20]}
            rowCount={rowCount}
            paginationMode="server"
            pagination
            onCellClick={handleClickCell}
            page={page}
            loading={loading}
            onPageChange={handleChangePage}
            disableSelectionOnClick
            filters={filters}
            updateFilters={(newArrayFilters) => setFilters(newArrayFilters)}
            getDataSdvancedFilter={(filter) => {
              setAdvancedFilter(filter);
            }}
            autoHeight
          />
        </Card>
      </MDBox>
      <DialogCreateService
        title={isUpdate === true ? "Actualizar servicio" : "Crear Servicio"}
        open={open}
        onClose={handleClose}
        titleAccept={isUpdate === true ? "Actualizar servicio" : "Crear Servicio"}
        titleClose="Cancelar"
        servStrategy={strategy}
        obj={objSelected}
        isUpdate={isUpdate}
        surveys={surveys}
        certificate={listCertificate}
        get={getData}
      />
      <AlertConfirm
        open={openAlert}
        title="! Atención ¡"
        context="¿Seguro de realizar esta acción?"
        onClose={handleCloseAlert}
        onAccept={handleAcceptAlert}
      />
    </DashboardLayout>
  );
};

export default Services;
