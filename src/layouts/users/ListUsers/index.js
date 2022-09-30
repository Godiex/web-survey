import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import DialogRegisterUser from "../componets/DialogRegisterUser";
import httpRequest from "../../../services/httpRequest";
import TableUser from "../componets/TableUser";

function ListUsers() {
  const navigate = useNavigate();
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [filters, setFilters] = useState([]);
  const [advancedFilter, setAdvancedFilter] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [listIdentification, setListIdentification] = useState([]);
  const [typeForm, setTypeForm] = useState("");
  const [dataUserEdit, setDataUserEdit] = useState("");
  const [typeIdentification, setTypeIdentification] = useState("");
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);

  const handleClickOpen = () => {
    setOpen(true);
    setTypeForm("registro");
  };

  const handleClose = () => {
    setOpen(false);
    setTypeIdentification("");
  };

  const getUsers = useCallback(async () => {
    const dataSearch = {
      advancedFilter,
      keyword: "",
      pageNumber: page + 1,
      pageSize,
      orderBy: [],
      isActive: true,
    };
    setLoading(true);
    const { data, totalCount } = await httpRequest.create(`users/search`, dataSearch);
    setListUsers(data);
    setRowCount(totalCount);
    setLoading(false);
  }, [pageSize, page, advancedFilter]);

  const getTypeIdentification = useCallback(async () => {
    const responseTypeIdentiofi = await httpRequest.getEntries(`identificationtypes`);
    setListIdentification(responseTypeIdentiofi);
  }, []);

  const handleRegisterUser = async (data, typeIdentificationUser) => {
    const dataRegister = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userName: data.userName,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      identificationType: typeIdentificationUser,
      nuip: data.nuip,
      address: data.address,
      area: data.area,
      position: data.position,
    };

    const dataUpdate = {
      id: dataUserEdit.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      identificationType: typeIdentificationUser,
      nuip: data.nuip,
      address: data.address,
      area: data.area,
      position: data.position,
    };

    setLoading(true);
    if (typeForm === "registro") {
      try {
        await httpRequest.create(`users`, dataRegister);
        setLoading(false);
        alert.show("Usuario creado", { position: "top right" });
        getUsers();
        handleClose();
      } catch (e) {
        alert.error("Error al crear usuario", { position: "top right" });
        setOpen(false);
        setLoading(false);
      }
    } else {
      try {
        await httpRequest.update(`users/${dataUserEdit.id}/profile`, "", dataUpdate);
        alert.show("Usuario actualizado", { position: "top right" });
        setLoading(false);
        getUsers();
        handleClose();
      } catch (e) {
        alert.error("Error al actualizar el usuario", { position: "top right" });
        setOpen(false);
        setLoading(false);
      }
    }
  };

  const handleAsignetRole = (idUser) => {
    navigate(`/asignar-Roles/${idUser}`);
  };

  const handleEditUser = (idUserEdit) => {
    setOpen(true);
    setTypeForm("editar");
    const dataUser = listUsers.find((user) => user.id === idUserEdit);
    setTypeIdentification(dataUser.identificationType);
    setDataUserEdit(dataUser);
  };

  useEffect(() => {
    getTypeIdentification();
  }, []);

  useEffect(() => {
    getUsers();
  }, [pageSize, page, advancedFilter]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={12}
            my={3}
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
              Crear Usuario
            </MDButton>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <TableUser
                listUsers={listUsers}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                loading={loading}
                handleAsignetRole={handleAsignetRole}
                handleEditUser={handleEditUser}
                getUsers={getUsers}
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
      <DialogRegisterUser
        open={open}
        handleClose={handleClose}
        handleRegisterUser={handleRegisterUser}
        loading={loading}
        listIdentification={listIdentification}
        typeForm={typeForm}
        dataUserEdit={dataUserEdit}
        setTypeIdentification={setTypeIdentification}
        typeIdentification={typeIdentification}
      />
    </>
  );
}

export default ListUsers;
