import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import MDBox from "../../components/MDBox";
import CardRole from "./components/CardRole";
import DialogRegister from "./components/DialogRegister";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import { getRolesAction } from "../../store/role/actions";
import httpRequest from "../../services/httpRequest";

function ListRoles() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [listRoles, setListRoles] = useState([]);
  const [dataEditRole, setDataEditRole] = useState("");
  const [typeAction, setTypeAction] = useState("");

  const listRoles = useSelector(({ role }) => role.data);
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);
  const handleClickOpen = () => {
    setOpen(true);
    setTypeAction("registrar");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getRoles = useCallback(async () => {
    await dispatch(getRolesAction());
  }, []);

  const handleCreateRole = async (dataRole) => {
    const dataCreate = {
      name: dataRole.name,
      description: dataRole.description,
    };

    const dataUpdate = {
      id: dataEditRole.id,
      name: dataRole.name,
      description: dataRole.description,
    };

    const data = typeAction === "registrar" ? dataCreate : dataUpdate;
    try {
      setLoading(true);
      await httpRequest.create(`roles`, data);
      alert.show(`${typeAction === "registrar" ? "Rol creado" : "Rol actualizado"}`, {
        position: "top right",
      });
      await getRoles();
      setLoading(false);
      handleClose();
    } catch (error) {
      alert.error(
        `${typeAction === "registrar" ? "Error al crear Rol" : "Error al actualizar rol"}`,
        {
          position: "top right",
        }
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

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
              Crear Rol
            </MDButton>
          </Grid>
          {listRoles.length > 0 &&
            listRoles.map((role) => (
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={1.5} mt={1.5}>
                  <CardRole
                    title={role.name}
                    description={role.description}
                    id={role.id}
                    listRoles={listRoles}
                    setOpen={setOpen}
                    setTypeAction={setTypeAction}
                    setDataEditRole={setDataEditRole}
                    getRoles={getRoles}
                    image=""
                    defaultRole={role.default}
                  />
                </MDBox>
              </Grid>
            ))}
        </Grid>
      </DashboardLayout>
      <DialogRegister
        open={open}
        handleClose={handleClose}
        handleCreateRole={handleCreateRole}
        loading={loading}
        dataEditRole={dataEditRole}
        typeAction={typeAction}
      />
    </>
  );
}

export default ListRoles;
