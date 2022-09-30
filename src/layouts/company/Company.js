import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Icon } from "@mui/material";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import MDBox from "../../components/MDBox";
import MDButton from "../../components/MDButton";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import CardCompany from "./components/CardCompany";
import MDTypography from "../../components/MDTypography";
import MDInput from "../../components/MDInput";
import { activateTenant, deactivateTenant, getCompany } from "../../store/tenant/actions";
import DialogFormCreateCompany from "./components/DialogFormCreateCompany";
import AlertConfirm from "../../components/AlertConfirm";
import { getCompanyService2 } from "../../services/Tenant/CompanyService";
import { getIdentificationTypes } from "../../store/identificationTypes/actions";
import { getEconomicActivities } from "../../store/economicActivities/actions";
import { setGeometryLocations, setGeometryLocationsInitial } from "../../store/map/actions";

const Company2 = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [companySelected, setCompanySelected] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [search, setSearch] = useState("");
  const [tenant, setTenant] = useState("");
  const [stateTenant, setStateTenant] = useState(null);

  const companies = useSelector(({ company }) => company.data);
  const typesIdentity = useSelector(({ identificationTypes }) => identificationTypes.data);
  const typeEconomicActivities = useSelector(({ economicActivities }) => economicActivities.data);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(setGeometryLocationsInitial(false));
  };

  const handleCloseDialogAlert = () => setOpenAlert(false);

  const handleClick = () => {
    setCompanySelected(null);
    setIsUpdate(false);
    setOpen(true);
  };

  const handleClickAlert = (tenantId, state) => {
    setTenant(tenantId);
    setStateTenant(state);
    setOpenAlert(true);
  };

  const handleAcceptDialogAlert = () => {
    if (stateTenant) dispatch(deactivateTenant(tenant));
    else dispatch(activateTenant(tenant));
    setOpenAlert(false);
  };

  const handleUpdateCompany = (company) => {
    if (company.geographicalCoordinates) {
      const coordinates = company.geographicalCoordinates;
      const location = {
        lat: parseFloat(coordinates.latitude),
        lng: parseFloat(coordinates.longitude),
      };
      dispatch(setGeometryLocations(location, company.address, 19));
    }
    setIsUpdate(true);
    setCompanySelected(company);
    setOpen(true);
  };
  const getDataCompany = async () => {
    try {
      await dispatch(getCompany());
    } catch (e) {
      alert.show("No se pudo obtener los datos de las empresas", {
        type: "warning",
        position: "top right",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getDataCompany();
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (search.length > 3) await getCompanyService2({ name: search });
    })();
  }, [search]);

  useEffect(() => {
    (async () => {
      await dispatch(getIdentificationTypes());
      await dispatch(getEconomicActivities());
    })();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute={false} />
      <MDBox my={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDButton
            onClick={handleClick}
            variant="gradient"
            color="info"
            sx={() => MDButtonCustomByTenant(primaryColor)}
          >
            <Icon>add</Icon>&nbsp; Nueva empresa
          </MDButton>
        </MDBox>
        <Card id="delete-account">
          <MDBox pt={3} px={2}>
            <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <MDBox pr={1}>
                <MDTypography variant="h6" fontWeight="medium">
                  Empresas
                </MDTypography>
              </MDBox>
              <MDBox pr={1}>
                <MDInput
                  placeholder="Buscar..."
                  size="small"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </MDBox>
            </MDBox>
          </MDBox>
          <MDBox pt={1} pb={2} px={2}>
            {!companies.length ? (
              <Grid container justify="center" align="center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <CircularProgress color="secondary" />
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={3}>
                {companies.map((row, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Grid key={index} item xs={12} sm={6} md={6}>
                    <CardCompany
                      company={row}
                      onUpdate={handleUpdateCompany}
                      checked={row.isActive}
                      onChangeCheck={handleClickAlert}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </MDBox>
        </Card>
      </MDBox>
      <DialogFormCreateCompany
        open={open}
        onClose={handleCloseDialog}
        title={!isUpdate ? "Crear empresa" : "Actualizar empresa"}
        titleAccept={!isUpdate ? "Crear empresa" : "Actualizar empresa"}
        obj={companySelected}
        act={isUpdate}
        typesIdentity={typesIdentity}
        economicType={typeEconomicActivities}
      />
      <AlertConfirm
        open={openAlert}
        title="! Atención ¡"
        context={`¿Seguro de que desea ${stateTenant ? "desactivar" : "activar"} esta empresa?`}
        onClose={handleCloseDialogAlert}
        onAccept={handleAcceptDialogAlert}
      />
    </DashboardLayout>
  );
};

export default Company2;
