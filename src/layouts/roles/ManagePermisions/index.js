import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDBox from "../../../components/MDBox";
import CardPermisions from "../components/CardPermisions";
import httpRequest from "../../../services/httpRequest";

function ManagePermisions() {
  const alert = useAlert();
  const { idRol } = useParams();
  const [dataPermisions, setDataPermisions] = useState("");

  const getPermisions = useCallback(async () => {
    if (idRol) {
      let contResponse = "";
      let contPermision = "";
      let checkAux = "";
      const listPermissionsByRol = await httpRequest.getEntries(`roles/${idRol}/permissions`);
      const response = await httpRequest.getEntries(`permissions`);
      const listCkeckPermisions = [];
      let permisions = [];
      for (let i = 0; i < response.length; i += 1) {
        for (let x = 0; x < response[i].permissions.length; x += 1) {
          if (listPermissionsByRol.permissions.length > 0) {
            for (let r = 0; r < listPermissionsByRol.permissions.length; r += 1) {
              if (response[i].permissions[x].name === listPermissionsByRol.permissions[r]) {
                contResponse = i;
                contPermision = x;
                checkAux = true;
                break;
              } else {
                contResponse = i;
                contPermision = x;
                checkAux = false;
              }
            }
            permisions.push({
              action: response[contResponse].permissions[contPermision].action,
              description: response[contResponse].permissions[contPermision].description,
              isBasic: response[contResponse].permissions[contPermision].isBasic,
              isRoot: response[contResponse].permissions[contPermision].isRoot,
              name: response[contResponse].permissions[contPermision].name,
              resource: response[contResponse].permissions[contPermision].resource,
              check: checkAux,
            });
          } else if (response[i].permissions[x].resource === response[i].resource) {
            permisions.push({
              action: response[i].permissions[x].action,
              description: response[i].permissions[x].description,
              isBasic: response[i].permissions[x].isBasic,
              isRoot: response[i].permissions[x].isRoot,
              name: response[i].permissions[x].name,
              resource: response[i].permissions[x].resource,
              check: false,
            });
          }
        }
        listCkeckPermisions.push({
          resource: response[i].resource,
          permissions: permisions,
        });
        permisions = [];
      }
      setDataPermisions(listCkeckPermisions);
    }
  }, []);

  useEffect(() => {
    getPermisions();
  }, []);

  const handleChange = (event, namePermision) => {
    const listNewPermisions = [...dataPermisions];
    for (let i = 0; i < listNewPermisions.length; i += 1) {
      for (let x = 0; x < listNewPermisions[i].permissions.length; x += 1) {
        if (listNewPermisions[i].permissions[x].name === namePermision) {
          listNewPermisions[i].permissions[x].check = event.target.checked;
        }
      }
    }
    setDataPermisions(listNewPermisions);
  };

  const handleSavePermisions = async () => {
    const permisionsCheck = [];
    for (let r = 0; r < dataPermisions.length; r += 1) {
      for (let p = 0; p < dataPermisions[r].permissions.length; p += 1) {
        permisionsCheck.push({
          name: dataPermisions[r].permissions[p].name,
          check: dataPermisions[r].permissions[p].check,
        });
      }
    }
    const filterPermissions = permisionsCheck.filter((permission) => permission.check === true);
    const filterNamePermissions = filterPermissions.map((filterPermision) => filterPermision.name);
    const data = {
      roleId: idRol,
      permissions: filterNamePermissions,
    };

    try {
      await httpRequest.update(`roles/${idRol}/permissions`, "", data);
      alert.show("Permisos asignados", { position: "top right" });
    } catch (error) {
      alert.error("Error al asignar el permiso", { position: "top right" });
    }
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox mb={1}>
              <MDTypography variant="h5"> Permisos del rol {dataPermisions.name} </MDTypography>
              <MDTypography variant="body2" color="text">
                Asignación de permisos al rol
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
            <MDButton onClick={handleSavePermisions} variant="gradient" color="info">
              Guardar Cambios
            </MDButton>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            {dataPermisions.length > 0 &&
              dataPermisions.map((permision) => (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDTypography variant="h5">{permision.resource}</MDTypography>
                  </Grid>
                  {permision.permissions.map((permi) => (
                    <Grid item xs={12} md={6} lg={4}>
                      <MDBox mb={1.5}>
                        <CardPermisions
                          color="dark"
                          icon="weekend"
                          title={permi.name}
                          count={281}
                          percentage={{
                            label: permi.description,
                          }}
                          handleChange={handleChange}
                          check={permi.check}
                        />
                      </MDBox>
                    </Grid>
                  ))}
                </Grid>
              ))}
          </Grid>
        </Grid>
      </DashboardLayout>
    </>
  );
}

export default ManagePermisions;
