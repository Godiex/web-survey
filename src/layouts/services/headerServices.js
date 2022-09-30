import { Icon, Tooltip } from "@mui/material";
import MDBadge from "../../components/MDBadge";
import Activate from "./components/Activate";
import MDTypography from "../../components/MDTypography";

export default {
  columns: [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "nameService",
      headerName: "Servicio",
      width: 170,
      type: "string",
      fieldRef: "nameService",
    },
    {
      field: "targetAudiences",
      headerName: "Objetivo Público",
      width: 170,
      type: "string",
      fieldRef: "targetAudiences",
    },
    {
      field: "generateCertification",
      headerName: "Generar certificación",
      type: "boolean",
      fieldRef: "generateCertification",
      filterOptions: [
        { name: "Si", value: true },
        { name: "No", value: false },
      ],
      width: 170,
      // eslint-disable-next-line react/prop-types
      renderCell: ({ value }) => (
        <MDBadge
          variant="gradient"
          color={value ? "success" : "error"}
          size="xs"
          badgeContent={value ? "Si" : "No"}
          container
        />
      ),
    },
    {
      field: "generateMonetaryValue",
      headerName: "Generar valor monetario",
      width: 170,
      type: "boolean",
      fieldRef: "generateMonetaryValue",
      filterOptions: [
        { name: "Si", value: true },
        { name: "No", value: false },
      ],
      // eslint-disable-next-line react/prop-types
      renderCell: ({ value }) => (
        <MDBadge
          variant="gradient"
          color={value ? "success" : "error"}
          size="xs"
          badgeContent={value ? "Si" : "No"}
          container
        />
      ),
    },
    {
      field: "isActive",
      headerName: "Estado",
      width: 170,
      type: "boolean",
      fieldRef: "generateMonetaryValue",
      filterOptions: [
        { name: "Activo", value: true },
        { name: "Inactivo", value: false },
      ],
      // eslint-disable-next-line react/prop-types
      renderCell: ({ value }) => <Activate checked={value} />,
    },
    {
      field: "action",
      headerName: "Acción",
      width: 110,
      // eslint-disable-next-line no-unused-vars,react/prop-types
      renderCell: ({ value }) => (
        <Tooltip title="Editar" placement="bottom">
          <MDTypography
            variant="body1"
            color="warning"
            lineHeight={1}
            sx={{ cursor: "pointer", mx: 3 }}
          >
            <Icon color="inherit">edit</Icon>
          </MDTypography>
        </Tooltip>
      ),
    },
  ],
};
