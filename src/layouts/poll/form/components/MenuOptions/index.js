import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import { useAlert } from "react-alert";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import AlertConfirm from "../../../../../components/AlertConfirm";
import httpRequest from "../../../../../services/httpRequest";

function MenuOptions({
  id,
  getOptionsByQuestion,
  idQuestion,
  listOption,
  setDataEditOption,
  setOpen,
  setIsEdit,
  setThrowRequired,
  setThrowDependency,
}) {
  const alert = useAlert();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openVerify, setOpenVerify] = useState(false);
  const [idOptionSelect, setIdOptionSelect] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);

  const handleClickEditOption = (idEdit) => {
    const data = listOption.find((option) => option.id === idEdit);
    setDataEditOption(data);
    setThrowRequired(data.throwRequired);
    setThrowDependency(data.throwDependency);
    setIsEdit(true);
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleAletDeleteOption = async (idDelete) => {
    try {
      setLoadingVerify(true);
      await httpRequest.remove(`options/${idDelete}/delete`, "");
      await getOptionsByQuestion(idQuestion);
      alert.show("Opción eliminada", { position: "top right" });
      setLoadingVerify(false);
      setAnchorEl(null);
    } catch (e) {
      alert.error("Error al eliminar la opción", { position: "top right" });
      setLoadingVerify(false);
    }
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const handleAlertVerify = (idVerify) => {
    setIdOptionSelect(idVerify);
    setOpenVerify(!openVerify);
  };

  return (
    <>
      <IconButton
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
        aria-label="settings"
        sx={{
          ml: "auto",
          mt: -2,
          alignSelf: "flex-start",
          py: 1.25,
        }}
      >
        <MoreVertIcon fontSize="default" sx={{ cursor: "pointer", fontWeight: "bold" }} />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => handleClickEditOption(id)}>Editar opción</MenuItem>
        <MenuItem onClick={() => handleAlertVerify(id)}>Eliminar opción</MenuItem>
      </Menu>
      <AlertConfirm
        open={openVerify}
        title="Advertencia"
        context="¿Seguro que desea eliminar la opción?"
        onClose={() => setOpenVerify(false)}
        onAccept={() => handleAletDeleteOption(idOptionSelect)}
        loading={loadingVerify}
      />
    </>
  );
}

MenuOptions.defaultProps = {
  id: "",
  idQuestion: "",
  listOption: [],
  setDataEditOption: "",
  setOpen: "",
  setIsEdit: "",
  setThrowRequired: "",
  setThrowDependency: "",
};

MenuOptions.propTypes = {
  id: PropTypes.string,
  getOptionsByQuestion: PropTypes.func.isRequired,
  idQuestion: PropTypes.string,
  listOption: PropTypes.arrayOf(PropTypes.string),
  setDataEditOption: PropTypes.element,
  setOpen: PropTypes.element,
  setIsEdit: PropTypes.element,
  setThrowRequired: PropTypes.element,
  setThrowDependency: PropTypes.element,
};

export default MenuOptions;
