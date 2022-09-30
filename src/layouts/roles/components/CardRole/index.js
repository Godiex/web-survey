/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import httpRequest from "../../../../services/httpRequest";

// Custom styles for ComplexProjectCard
function CardRole({
  color,
  image,
  title,
  description,
  members,
  id,
  listRoles,
  setOpen,
  setTypeAction,
  setDataEditRole,
  getRoles,
  defaultRole,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const alert = useAlert();
  const navigate = useNavigate();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleEditRole = async (idRol) => {
    setTypeAction("editar");
    setOpen(true);
    const filterRole = listRoles.find((role) => role.id === idRol);
    setDataEditRole(filterRole);
    handleClose();
  };

  const handleDeleteRole = async (idRol) => {
    try {
      await httpRequest.remove(`roles`, idRol);
      alert.show("Rol eliminado", { position: "top right" });
      handleClose();
      getRoles();
    } catch (e) {
      alert.error("Para eliminar el Rol debe remover todos los usuarios asociados a este Rol", {
        position: "top right",
      });
    }
  };

  const handleRedirecPermisions = (idRol) => {
    navigate(`/asignarPermisos/${idRol}`);
  };

  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <MDAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={3}>
            <MDAvatar
              src={image}
              alt={title}
              size="xl"
              variant="rounded"
              bgColor={color}
              sx={{
                p: 1,
                mt: -6,
                borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <MDBox ml={2} mt={-2} lineHeight={0}>
              <Tooltip title={title}>
                <MDTypography
                  noWrap="true"
                  variant="h6"
                  textTransform="capitalize"
                  fontWeight="medium"
                >
                  {title}
                </MDTypography>
              </Tooltip>
              {members.length > -1 ? <MDBox display="flex">{renderMembers}</MDBox> : null}
            </MDBox>
          </Grid>
          <IconButton
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            aria-label="settings"
            sx={{
              ml: "auto",
              mt: -4,
              alignSelf: "flex-start",
              py: 1.25,
            }}
            disabled={defaultRole}
          >
            <MoreVertIcon fontSize="default" sx={{ cursor: "pointer", fontWeight: "bold" }} />
          </IconButton>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => handleEditRole(id)}>Editar Rol</MenuItem>
            <MenuItem onClick={() => handleDeleteRole(id)}>Eliminar Rol</MenuItem>
            <MenuItem onClick={() => handleRedirecPermisions(id)}>Permisos</MenuItem>
          </Menu>
        </Grid>
        <MDBox my={2} lineHeight={1}>
          <Grid container>
            <Tooltip title={description}>
              <MDTypography noWrap="true" variant="button" fontWeight="light" color="text">
                {description}
              </MDTypography>
            </Tooltip>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
CardRole.defaultProps = {
  color: "dark",
  members: [],
  listRoles: [],
  id: "",
  setOpen: false,
  setTypeAction: "",
  setDataEditRole: "",
  defaultRole: false,
};

// Typechecking props for the ProfileInfoCard
CardRole.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string,
  listRoles: PropTypes.arrayOf(PropTypes.string),
  setOpen: PropTypes.element,
  setTypeAction: PropTypes.element,
  setDataEditRole: PropTypes.element,
  getRoles: PropTypes.func.isRequired,
  defaultRole: PropTypes.bool,
};

export default CardRole;
