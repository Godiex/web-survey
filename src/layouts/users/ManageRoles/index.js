import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "../../../components/MDBox";
import CardRoleUser from "../componets/CardRoleUser";
import httpRequest from "../../../services/httpRequest";

function ManageRoles() {
  const { idUser } = useParams();
  const alert = useAlert();
  const [listRoles, setListRoles] = useState([
    {
      description: "",
      enabled: false,
      roleId: "",
      roleName: "",
    },
  ]);
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const getRoles = useCallback(async () => {
    if (idUser) {
      const responseProfile = await httpRequest.getEntries(`users/${idUser}`);
      setProfile(responseProfile);
      const responseRoles = await httpRequest.getEntries(`users/${idUser}/roles`);
      setListRoles(responseRoles);
    }
  }, []);

  const handleChange = (event, id) => {
    const auxListRoles = [...listRoles];
    for (let i = 0; i < auxListRoles.length; i += 1) {
      if (auxListRoles[i].roleId === id) {
        auxListRoles[i].enabled = event.target.checked;
      }
    }
    setListRoles(auxListRoles);
  };

  const handleSaveRoles = async () => {
    try {
      const roles = { userRoles: listRoles };
      setLoading(true);
      await httpRequest.create(`users/${idUser}/roles`, roles);
      setLoading(false);
      alert.show("Roles asignados", { position: "top right" });
    } catch (error) {
      alert.error("Error al asignar roles", { position: "top right" });
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
          <Grid item xs={12} md={6}>
            <MDBox mb={1}>
              <MDTypography variant="h5">
                {profile.firstName} {profile.lastName}
              </MDTypography>
              <MDTypography variant="body2" color="text">
                Asignación de roles para el usuario
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <MDButton variant="gradient" color="info" onClick={() => handleSaveRoles()}>
              {loading ? "Cargando..." : "Guardar Cambios"}
            </MDButton>
          </Grid>
          {listRoles.length > 0 &&
            listRoles.map((role) => (
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={1.5} mt={1.5}>
                  <CardRoleUser
                    title={role.roleName}
                    description={role.description}
                    id={role.roleId}
                    enabled={role.enabled}
                    handleChange={handleChange}
                  />
                </MDBox>
              </Grid>
            ))}
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default ManageRoles;
