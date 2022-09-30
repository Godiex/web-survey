import * as React from "react";
import Accordion from "@mui/material/Accordion";
import Grid from "@mui/material/Grid";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MDButton from "components/MDButton";
import httpRequest from "../../../../../services/httpRequest";
import AcordeonSection from "../AcordeonSection";
import DialogSection from "../DialogSection";
import AlertConfirm from "../../../../../components/AlertConfirm";

function AcordeonForm({
  id,
  name,
  handleClickAlert,
  handleEditForm,
  listForm,
  code,
  setExpanded,
  expanded,
  order,
  index,
  getListForm,
  allListQuestion,
}) {
  const alert = useAlert();
  const { idPoll } = useParams();
  const [open, setOpen] = React.useState(false);
  const [htmlSwitch, setHtmlSwitch] = React.useState(false);
  const [hiddenSection, setHiddenSection] = React.useState(false);
  const [dataForm, setDataForm] = React.useState("");
  const [typeForm, setTypeForm] = React.useState("");
  const [dataEdit, setDataEdit] = React.useState("");
  const [idFormFilter, setIdFormFilter] = React.useState("");
  const [listSection, setListSection] = React.useState([]);
  const [codeSection, setCodeSection] = React.useState("");
  const [openAlert, setOpenAlert] = React.useState(false);
  const [idSectionDelete, setIdSectionDelete] = React.useState({ id: "", index: "" });

  const handleChange = (panel) => (event, isExpanded) => {
    setIdFormFilter(panel);
    const filterForm = listForm.find((form) => form.id === panel);
    setDataForm(filterForm);
    setListSection(filterForm.sections);
    setExpanded(isExpanded ? panel : false);
  };

  const toggleDrawer = (idForm) => {
    const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    const codeRandom = `SEC${numberRandom}`;
    setCodeSection(codeRandom);
    setTypeForm("registro");
    const filterForm = listForm.find((form) => form.id === idForm);
    setDataForm(filterForm);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHtmlSwith = () => {
    setHtmlSwitch(!htmlSwitch);
  };

  const handleHiddenSection = () => {
    setHiddenSection(!hiddenSection);
  };

  const getListFormSection = async () => {
    const response = await httpRequest.getEntries(`surveys/${idPoll}/forms`);
    const filterFornSectionNew = response.find((form) => form.id === idFormFilter);
    setListSection(filterFornSectionNew.sections);
  };

  const handleSaveSection = async (value) => {
    const orderNum = typeForm === "registro" ? listSection.length + 1 : dataEdit.order;
    const data = {
      id: typeForm === "registro" ? "" : dataEdit.id,
      code: codeSection,
      name: value.name,
      description: value.description,
      useHtml: htmlSwitch,
      html: value.html,
      hidden: hiddenSection,
      order: orderNum,
      formId: dataForm.id,
    };
    if (typeForm === "registro") {
      try {
        await httpRequest.create(`sections/create`, data);
        alert.show("Sección creada", { position: "top right" });
        const numberRandomSec = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const codeRandomSec = `SEC${numberRandomSec}`;
        setCodeSection(codeRandomSec);
        getListFormSection();
        setHtmlSwitch(false);
        setHiddenSection(false);
      } catch (e) {
        alert.error("Error al crear sección", { position: "top right" });
      }
    } else {
      try {
        await httpRequest.update(`sections/${dataEdit.id}/update`, "", data);
        alert.show("Sección actualizada", { position: "top right" });
        getListFormSection();
        handleClose();
      } catch (e) {
        alert.error("Error al editar la sección", { position: "top right" });
      }
    }
  };

  const handleCloseDialogAlert = () => setOpenAlert(false);

  const handleClickDeleteSection = (idSectionParam, indexSection, e) => {
    e.stopPropagation();
    setIdSectionDelete({ id: idSectionParam, index: indexSection });
    setOpenAlert(true);
  };

  const orderListSection = (indexSectionOrder, idSectionOrder) => {
    const lisSectionReOrder = [...listSection];
    const newListSection = [];
    const listFilterSectionIndex = lisSectionReOrder.filter(
      (section) => section.id !== idSectionOrder
    );
    for (let i = 0; i < listFilterSectionIndex.length; i += 1) {
      if (i >= indexSectionOrder) {
        listFilterSectionIndex[i].order -= 1;
      }
    }

    for (let x = 0; x < listFilterSectionIndex.length; x += 1) {
      newListSection.push({
        id: listFilterSectionIndex[x].id,
        newOrder: listFilterSectionIndex[x].order,
      });
    }
    return newListSection;
  };

  const handleDeleteSection = async () => {
    try {
      await httpRequest.remove(`sections/${idSectionDelete.id}/delete`, "");
      const resultListOrder = orderListSection(idSectionDelete.index, idSectionDelete.id);
      const dataSectionRise = {
        newSectionOrders: resultListOrder,
      };
      try {
        await httpRequest.create(`sections/change-orders`, dataSectionRise);
        await getListFormSection();
        handleCloseDialogAlert();
      } catch (error) {
        alert.error("Error al cambiar la posición", { position: "top right" });
      }
    } catch (error) {
      alert.error("Error al eliminar la sección", { position: "top right" });
    }
  };

  const handleEditSection = async (idSectionEdit, e) => {
    e.stopPropagation();
    setTypeForm("editar");
    const filterDataEditSection = listSection.find((section) => section.id === idSectionEdit);
    setHtmlSwitch(filterDataEditSection.useHtml);
    setHiddenSection(filterDataEditSection.hidden);
    setCodeSection(filterDataEditSection.code);
    setDataEdit(filterDataEditSection);
    setOpen(true);
  };

  const handleRiseForm = async (indexForm, e) => {
    e.stopPropagation();
    const orderFormRise = [...listForm];
    const arriba = indexForm - 1;
    const abajo = arriba + 1;
    const newOrderOne = orderFormRise[abajo].order;
    const newOrderThow = orderFormRise[arriba].order;
    const auxDataArriba = {
      code: orderFormRise[indexForm].code,
      hidden: orderFormRise[indexForm].hidden,
      id: orderFormRise[indexForm].id,
      name: orderFormRise[indexForm].name,
      order: newOrderThow,
      sections: orderFormRise[indexForm].sections,
    };

    const auxDataAbajo = {
      code: orderFormRise[arriba].code,
      hidden: orderFormRise[arriba].hidden,
      id: orderFormRise[arriba].id,
      name: orderFormRise[arriba].name,
      order: newOrderOne,
      sections: orderFormRise[arriba].sections,
    };
    orderFormRise[arriba] = auxDataArriba;
    orderFormRise[abajo] = auxDataAbajo;
    const data = {
      newFormsOrders: [
        { id: orderFormRise[arriba].id, newOrder: newOrderThow },
        { id: orderFormRise[abajo].id, newOrder: newOrderOne },
      ],
    };
    try {
      await httpRequest.create(`forms/change-orders`, data);
      getListForm();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  const handleDownForm = async (indexDownForm, e) => {
    e.stopPropagation();
    const orderFormDown = [...listForm];
    const arribaForm = indexDownForm;
    const abajoForm = indexDownForm + 1;
    const newOrderDownOne = orderFormDown[abajoForm].order;
    const newOrderDownThow = orderFormDown[arribaForm].order;

    const auxDataArriba = {
      code: orderFormDown[abajoForm].code,
      hidden: orderFormDown[abajoForm].hidden,
      id: orderFormDown[abajoForm].id,
      name: orderFormDown[abajoForm].name,
      order: newOrderDownThow,
      sections: orderFormDown[abajoForm].sections,
    };

    const auxDataAbajo = {
      code: orderFormDown[indexDownForm].code,
      hidden: orderFormDown[indexDownForm].hidden,
      id: orderFormDown[indexDownForm].id,
      name: orderFormDown[indexDownForm].name,
      order: newOrderDownOne,
      sections: orderFormDown[indexDownForm].sections,
    };

    orderFormDown[arribaForm] = auxDataArriba;
    orderFormDown[abajoForm] = auxDataAbajo;

    const data = {
      newFormsOrders: [
        { id: orderFormDown[arribaForm].id, newOrder: newOrderDownThow },
        { id: orderFormDown[abajoForm].id, newOrder: newOrderDownOne },
      ],
    };
    try {
      await httpRequest.create(`forms/change-orders`, data);
      getListForm();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  const handleRiseSection = async (indexSection, e) => {
    e.stopPropagation();
    const orderSectionRise = [...listSection];
    const arribaSection = indexSection - 1;
    const abajoSection = arribaSection + 1;
    const newOrderSectionOne = orderSectionRise[abajoSection].order;
    const newOrderSectionThow = orderSectionRise[arribaSection].order;

    const dataSectionArriba = {
      code: orderSectionRise[indexSection].code,
      description: orderSectionRise[indexSection].description,
      hidden: orderSectionRise[indexSection].hidden,
      html: orderSectionRise[indexSection].html,
      id: orderSectionRise[indexSection].id,
      name: orderSectionRise[indexSection].name,
      order: newOrderSectionThow,
      questions: orderSectionRise[indexSection].questions,
      useHtml: orderSectionRise[indexSection].useHtml,
    };

    const dataSectionAbajo = {
      code: orderSectionRise[arribaSection].code,
      description: orderSectionRise[arribaSection].description,
      hidden: orderSectionRise[arribaSection].hidden,
      html: orderSectionRise[arribaSection].html,
      id: orderSectionRise[arribaSection].id,
      name: orderSectionRise[arribaSection].name,
      order: newOrderSectionOne,
      questions: orderSectionRise[arribaSection].questions,
      useHtml: orderSectionRise[arribaSection].useHtml,
    };

    orderSectionRise[arribaSection] = dataSectionArriba;
    orderSectionRise[abajoSection] = dataSectionAbajo;

    const dataSectionRise = {
      newSectionOrders: [
        { id: orderSectionRise[arribaSection].id, newOrder: newOrderSectionThow },
        { id: orderSectionRise[abajoSection].id, newOrder: newOrderSectionOne },
      ],
    };
    try {
      await httpRequest.create(`sections/change-orders`, dataSectionRise);
      getListFormSection();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  const handleDownSection = async (indexDownSection, e) => {
    e.stopPropagation();
    const orderSectionDown = [...listSection];
    const arribaSection = indexDownSection;
    const abajoSection = indexDownSection + 1;
    const newOrderSectionOne = orderSectionDown[abajoSection].order;
    const newOrderSectionThow = orderSectionDown[arribaSection].order;

    const dataSectionArriba = {
      code: orderSectionDown[abajoSection].code,
      description: orderSectionDown[abajoSection].description,
      hidden: orderSectionDown[abajoSection].hidden,
      html: orderSectionDown[abajoSection].html,
      id: orderSectionDown[abajoSection].id,
      name: orderSectionDown[abajoSection].name,
      order: newOrderSectionThow,
      questions: orderSectionDown[abajoSection].questions,
      useHtml: orderSectionDown[abajoSection].useHtml,
    };

    const dataSectionAbajo = {
      code: orderSectionDown[indexDownSection].code,
      description: orderSectionDown[indexDownSection].description,
      hidden: orderSectionDown[indexDownSection].hidden,
      html: orderSectionDown[indexDownSection].html,
      id: orderSectionDown[indexDownSection].id,
      name: orderSectionDown[indexDownSection].name,
      order: newOrderSectionOne,
      questions: orderSectionDown[indexDownSection].questions,
      useHtml: orderSectionDown[indexDownSection].useHtml,
    };

    orderSectionDown[arribaSection] = dataSectionArriba;
    orderSectionDown[abajoSection] = dataSectionAbajo;

    const dataSectionDow = {
      newSectionOrders: [
        { id: orderSectionDown[arribaSection].id, newOrder: newOrderSectionThow },
        { id: orderSectionDown[abajoSection].id, newOrder: newOrderSectionOne },
      ],
    };
    try {
      await httpRequest.create(`sections/change-orders`, dataSectionDow);
      getListFormSection();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  return (
    <>
      <Accordion expanded={expanded === id} onChange={handleChange(id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{
            backgroundColor: "#42424a",
            color: "#fff",
            height: "45px",
            borderRadius: "12px",
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={1} md={1}>
              <Avatar
                style={{ fontSize: "14px" }}
                sx={{ width: 30, height: 30, bgcolor: "#2196f3" }}
              >
                {order}
              </Avatar>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography variant="subtitle2" gutterBottom component="div">
                {code}
              </Typography>
            </Grid>
            <Grid item xs={3} md={6}>
              <Typography variant="subtitle2" gutterBottom component="div">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={5} md={3}>
              <Grid container>
                <Tooltip title="Editar Formulario">
                  <IconButton
                    onClick={(e) => handleEditForm(id, e)}
                    aria-label="delete"
                    size="large"
                  >
                    <EditIcon fontSize="inherit" style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar Formulario">
                  <IconButton
                    onClick={(e) => handleClickAlert(id, index, e)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                {index !== 0 && listForm.length > 0 ? (
                  <Tooltip title="Subir">
                    <IconButton
                      onClick={(e) => handleRiseForm(index, e)}
                      aria-label="delete"
                      size="large"
                    >
                      <ArrowCircleUpIcon fontSize="inherit" style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {listForm.length > 0 && listForm.length - 1 !== index ? (
                  <Tooltip title="Bajar">
                    <IconButton
                      onClick={(e) => handleDownForm(index, e)}
                      aria-label="delete"
                      size="large"
                    >
                      <ArrowCircleDownIcon fontSize="inherit" style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} sx={{ textAlign: "right" }}>
              <MDButton onClick={() => toggleDrawer(id)} variant="gradient" color="info">
                Agregar sección
              </MDButton>
            </Grid>
            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
              <Typography variant="h5" gutterBottom component="div">
                Secciones
              </Typography>
              {listSection.length > 0 &&
                listSection.map((section, indexSection) => (
                  <AcordeonSection
                    id={section.id}
                    name={section.name}
                    code={section.code}
                    order={section.order}
                    handleClickDeleteSection={handleClickDeleteSection}
                    handleEditSection={handleEditSection}
                    listForm={listForm}
                    listSection={listSection}
                    getListForm={getListForm}
                    idFormFilter={idFormFilter}
                    index={indexSection}
                    handleRiseSection={handleRiseSection}
                    handleDownSection={handleDownSection}
                    allListQuestion={allListQuestion}
                  />
                ))}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <DialogSection
        open={open}
        handleClose={handleClose}
        handleHtmlSwith={handleHtmlSwith}
        htmlSwitch={htmlSwitch}
        handleHiddenSection={handleHiddenSection}
        hiddenSection={hiddenSection}
        handleSaveSection={handleSaveSection}
        typeForm={typeForm}
        dataEdit={dataEdit}
        codeSection={codeSection}
      />
      <AlertConfirm
        open={openAlert}
        title="Advertencia"
        context="¿Seguro que desea eliminar la sección?"
        onClose={handleCloseDialogAlert}
        onAccept={handleDeleteSection}
      />
    </>
  );
}

AcordeonForm.defaultProps = {
  id: "",
  name: "",
  listForm: [],
  code: "",
  setExpanded: "",
  expanded: "",
  order: 0,
  allListQuestion: [],
};

AcordeonForm.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  handleClickAlert: PropTypes.func.isRequired,
  handleEditForm: PropTypes.func.isRequired,
  listForm: PropTypes.arrayOf(PropTypes.string),
  code: PropTypes.string,
  setExpanded: PropTypes.element,
  expanded: PropTypes.string,
  order: PropTypes.number,
  index: PropTypes.number.isRequired,
  getListForm: PropTypes.func.isRequired,
  allListQuestion: PropTypes.arrayOf(PropTypes.string),
};

export default AcordeonForm;
