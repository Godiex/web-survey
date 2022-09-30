import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import DialogQuestion from "../DialogQuestion";
import CardQuestion from "../CardQuestion";
import httpRequest from "../../../../../services/httpRequest";
import AlertConfirm from "../../../../../components/AlertConfirm";

function AcordeonSection({
  id,
  name,
  code,
  order,
  handleClickDeleteSection,
  handleEditSection,
  listForm,
  listSection,
  idFormFilter,
  index,
  handleRiseSection,
  handleDownSection,
  allListQuestion,
}) {
  const { idPoll } = useParams();
  const alert = useAlert();
  const [expanded, setExpanded] = React.useState(false);
  const [typeForm, setTypeForm] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [useHtmlQuestion, setUseHtml] = React.useState(false);
  const [viewQuestion, setViewQuestion] = React.useState(false);
  const [requieredQuestion, setRequieredQuestion] = React.useState(false);
  const [dependence, setDependence] = React.useState(false);
  const [viewDependenceOption, setViewDependenceOption] = React.useState(false);
  const [questionsRequered, setQuestionsRequered] = React.useState(false);
  const [optionsRequered, setOptionsRequered] = React.useState(false);
  const [filesAttached, setFilesAttached] = React.useState(false);
  const [filesRequered, setFilesRequered] = React.useState(false);
  const [typeQuestion, setTypeQuestion] = React.useState("");
  const [typeAttachments, setTypeAttachments] = React.useState([
    { check: false, name: "VIDEO", value: "VIDEO" },
    { check: false, name: "IMAGEN", value: "IMAGE" },
    { check: false, name: "AUDIO", value: "AUDIO" },
  ]);
  const [idSectionFilter, setIdSectionFilter] = React.useState("");
  const [sectionSelected, setSectionSelected] = React.useState("");
  const [listCheckQuestionRequered, setListCheckQuestionRequered] = React.useState([]);
  const [codeQuestionState, setQuestionCode] = React.useState("");
  const [dataEditQuestion, setDataEditQuestion] = React.useState("");
  const [dependencyType, setDependencyType] = React.useState(null);
  const [idQuestionDelete, setIdQuestionDelete] = React.useState({ id: "", index: "" });
  const [openAlert, setOpenAlert] = React.useState(false);
  const [listUpdateCheck, setListUpdateCheck] = React.useState([]);
  const [idquestionEdit, setIdquestionEdit] = React.useState("");
  const [listCheck, setListCheck] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    setIdSectionFilter(panel);
    setExpanded(isExpanded ? panel : false);
    const filterListQuestion = listSection.find((section) => section.id === panel);
    setSectionSelected(filterListQuestion);
  };

  const handleOpenDialogQuestion = () => {
    const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    const codeRandom = `SEC${numberRandom}`;
    setQuestionCode(codeRandom);
    setTypeForm("registro");
    setOpen(true);
  };

  const handleUseHtml = () => {
    setUseHtml(!useHtmlQuestion);
  };

  const handleViewQuestion = () => {
    setViewQuestion(!viewQuestion);
  };

  const handleRequeredQuestion = () => {
    setRequieredQuestion(!requieredQuestion);
  };

  const handleDependence = () => {
    setDependence(!dependence);
    setDependencyType(null);
    setListCheck([]);
  };

  const handleViewDependenceOption = () => {
    setViewDependenceOption(!viewDependenceOption);
  };

  const handleQuestionsRequered = () => {
    setQuestionsRequered(!questionsRequered);
  };

  const handleOptionsRequered = () => {
    setOptionsRequered(!optionsRequered);
  };

  const handleFilesAttached = () => {
    setFilesAttached(!filesAttached);
  };

  const handleFilesRequered = () => {
    setFilesRequered(!filesRequered);
  };

  const handleInitialValue = () => {
    setTypeQuestion("");
    setUseHtml(false);
    setViewQuestion(false);
    setRequieredQuestion(false);
    setDependence(false);
    setViewDependenceOption(false);
    setQuestionsRequered(false);
    setOptionsRequered(false);
    setFilesAttached(false);
    setFilesRequered(false);
    setDependencyType(null);
    setFilesAttached(false);
    setTypeAttachments([
      { check: false, name: "VIDEO", value: "VIDEO" },
      { check: false, name: "IMAGEN", value: "IMAGE" },
      { check: false, name: "AUDIO", value: "AUDIO" },
    ]);
    setListCheckQuestionRequered([]);
  };

  const handleClose = () => {
    setOpen(false);
    handleInitialValue();
  };

  const getListFormQuestion = async () => {
    const response = await httpRequest.getEntries(`surveys/${idPoll}/forms`);
    const filterFornSectionNew = response.find((form) => form.id === idFormFilter);
    if (!!filterFornSectionNew && filterFornSectionNew.sections.length > 0) {
      const filterListQuestionNew = filterFornSectionNew.sections.find(
        (sectionNew) => sectionNew.id === idSectionFilter
      );
      setSectionSelected(filterListQuestionNew);
    }
  };

  const saveQuestion = async (values, dependencyTypeQuestion, listCheckDependency) => {
    try {
      const orderQuestion = sectionSelected.questions.length + 1;
      const filterDependencyCodes = listCheckDependency.filter(
        (dependency) => dependency.checked === true
      );

      const filterCode = filterDependencyCodes.map((dependencyCode) => dependencyCode.code);

      const filterTypeAttachments = typeAttachments.filter((attachmen) => attachmen.check === true);

      const filterCodeAttachments = filterTypeAttachments.map(
        (typeAttachment) => typeAttachment.value
      );

      const filterQuestionRequires = listCheckQuestionRequered.filter(
        (question) => question.ckeck === true
      );

      const codesQuestionsRequired = filterQuestionRequires.map(
        (codeQuestion) => codeQuestion.code
      );

      const data = {
        id: typeForm === "registro" ? "" : idquestionEdit,
        code: codeQuestionState,
        qType: typeQuestion,
        name: values.name,
        description: values.description,
        useHtml: useHtmlQuestion,
        html: values.html,
        hidden: viewQuestion,
        order: orderQuestion,
        regex: values.regex,
        required: requieredQuestion,
        hasDependency: dependence,
        dependencyType: dependencyTypeQuestion === false ? null : dependencyTypeQuestion,
        dependencyDependingOnOption: viewDependenceOption,
        dependencyCodes: filterCode,
        hasRequiredQuestions: questionsRequered,
        requiredDependingOnOption: optionsRequered,
        requiredQuestionsCodes: codesQuestionsRequired,
        hasAttachments: filesAttached,
        requiredAttachments: filesRequered,
        allowedAttachments: filterCodeAttachments,
        sectionId: sectionSelected.id,
      };
      if (typeForm === "registro") {
        await httpRequest.create(`questions/create`, data);
        const numberRandomQuestion = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const codeRandomQuestion = `QE${numberRandomQuestion}`;
        setQuestionCode(codeRandomQuestion);
      } else {
        await httpRequest.update(`questions/${idquestionEdit}/update`, "", data);
        handleClose();
      }
      handleInitialValue();
      getListFormQuestion();
    } catch (e) {
      alert.error("Error al crear la encuesta correctamente");
    }
  };

  const handleEditQuestion = async (idQuestionEdit, e) => {
    const newListForm = [];
    const newSection = [];
    const newQuestionsList = [];
    const newQuestionDependence = [];
    let ckeckNew = "";
    let codeNew = "";
    let nameNew = "";
    let indexQuestion = "";
    let checkIndex = "";

    e.stopPropagation();
    setTypeForm("editar");
    setOpen(true);
    const filterQuestion = sectionSelected.questions.find(
      (question) => question.id === idQuestionEdit
    );
    setIdquestionEdit(filterQuestion.id);
    setQuestionCode(filterQuestion.code);
    setTypeQuestion(filterQuestion.qType);
    setDataEditQuestion(filterQuestion);
    setUseHtml(filterQuestion.useHtml);
    setViewQuestion(filterQuestion.hidden);
    setRequieredQuestion(filterQuestion.required);
    setDependence(filterQuestion.hasDependency);
    setDependencyType(filterQuestion.dependencyType);
    setViewDependenceOption(filterQuestion.dependencyDependingOnOption);
    setFilesAttached(filterQuestion.hasAttachments);
    setFilesRequered(filterQuestion.requiredAttachments);
    setQuestionsRequered(filterQuestion.hasRequiredQuestions);
    const attachments = [...typeAttachments];
    for (let i = 0; i < attachments.length; i += 1) {
      for (let x = 0; x < filterQuestion.allowedAttachments.length; x += 1) {
        if (attachments[i].value === filterQuestion.allowedAttachments[x]) {
          attachments[i].check = true;
          break;
        }
      }
    }

    if (
      !!filterQuestion &&
      !!filterQuestion.dependencyCodes &&
      filterQuestion.dependencyCodes.length > 0
    ) {
      if (filterQuestion.dependencyType === "FORMS") {
        for (let i = 0; i < listForm.length; i += 1) {
          for (let x = 0; x < filterQuestion.dependencyCodes.length; x += 1) {
            if (listForm[i].code === filterQuestion.dependencyCodes[x]) {
              ckeckNew = true;
              codeNew = listForm[i].code;
              nameNew = listForm[i].name;
              break;
            } else {
              ckeckNew = false;
              codeNew = listForm[i].code;
              nameNew = listForm[i].name;
            }
          }
          newListForm.push({ code: codeNew, name: nameNew, checked: ckeckNew });
        }
        setListUpdateCheck(newListForm);
      } else if (filterQuestion.dependencyType === "SECCTION") {
        for (let i = 0; i < listSection.length; i += 1) {
          for (let x = 0; x < filterQuestion.dependencyCodes.length; x += 1) {
            if (listSection[i].code === filterQuestion.dependencyCodes[x]) {
              ckeckNew = true;
              codeNew = listSection[i].code;
              nameNew = listSection[i].name;
              break;
            } else {
              ckeckNew = false;
              codeNew = listSection[i].code;
              nameNew = listSection[i].name;
            }
          }
          newSection.push({ code: codeNew, name: nameNew, checked: ckeckNew });
        }
        setListUpdateCheck(newSection);
      } else if (filterQuestion.dependencyType === "QUESTIONS") {
        for (let q = 0; q < allListQuestion.length; q += 1) {
          for (let x = 0; x < filterQuestion.dependencyCodes.length; x += 1) {
            if (allListQuestion[q].code === filterQuestion.dependencyCodes[x]) {
              ckeckNew = true;
              codeNew = allListQuestion[q].code;
              nameNew = allListQuestion[q].name;
              break;
            } else {
              ckeckNew = false;
              codeNew = allListQuestion[q].code;
              nameNew = allListQuestion[q].name;
            }
          }
          newQuestionDependence.push({ code: codeNew, name: nameNew, checked: ckeckNew });
        }
        setListUpdateCheck(newQuestionDependence);
      }
    }

    if (
      !!filterQuestion &&
      !!filterQuestion.requiredQuestionsCodes &&
      filterQuestion.requiredQuestionsCodes.length > 0
    ) {
      for (let r = 0; r < allListQuestion.length; r += 1) {
        for (let l = 0; l < filterQuestion.requiredQuestionsCodes.length; l += 1) {
          if (allListQuestion[r].code === filterQuestion.requiredQuestionsCodes[l]) {
            indexQuestion = r;
            checkIndex = true;
            break;
          } else {
            indexQuestion = r;
            checkIndex = false;
          }
        }
        newQuestionsList.push({
          code: allListQuestion[indexQuestion].code,
          id: allListQuestion[indexQuestion].id,
          nameQuestion: allListQuestion[indexQuestion].name,
          order: allListQuestion[indexQuestion].order,
          ckeck: checkIndex,
        });
      }
      setListCheckQuestionRequered(newQuestionsList);
    }
  };

  const handleCloseDialogAlert = () => setOpenAlert(false);

  const handleClickDeleteQuestion = (idQuestiondelete, indexQuestion, e) => {
    e.stopPropagation();
    setIdQuestionDelete({ id: idQuestiondelete, index: indexQuestion });
    setOpenAlert(true);
  };

  const orderListQuestion = (indexQuestionOrder, idQuestionOrder) => {
    const lisQuestionReOrder = [...sectionSelected.questions];
    const newListQuestion = [];
    const listFilterQuestionIndex = lisQuestionReOrder.filter(
      (question) => question.id !== idQuestionOrder
    );
    for (let i = 0; i < listFilterQuestionIndex.length; i += 1) {
      if (i >= indexQuestionOrder) {
        listFilterQuestionIndex[i].order -= 1;
      }
    }

    for (let x = 0; x < listFilterQuestionIndex.length; x += 1) {
      newListQuestion.push({
        id: listFilterQuestionIndex[x].id,
        newOrder: listFilterQuestionIndex[x].order,
      });
    }
    return newListQuestion;
  };

  const handleDeleteQuestion = async () => {
    try {
      await httpRequest.remove(`questions/${idQuestionDelete.id}/delete`, "");
      const resultListOrder = orderListQuestion(idQuestionDelete.index, idQuestionDelete.id);
      const dataQuestion = {
        newQuestionOrders: resultListOrder,
      };
      try {
        await httpRequest.create(`questions/change-orders`, dataQuestion);
        await getListFormQuestion();
        handleCloseDialogAlert();
      } catch (error) {
        alert.error("Error al cambiar la posición", { position: "top right" });
      }
    } catch (error) {
      alert.error("Error al eliminar la pregunta", { position: "top right" });
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
                <Tooltip title="Editar sección">
                  <IconButton
                    onClick={(e) => handleEditSection(id, e)}
                    aria-label="delete"
                    size="large"
                  >
                    <EditIcon fontSize="inherit" style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar sección">
                  <IconButton
                    onClick={(e) => handleClickDeleteSection(id, index, e)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" style={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
                {index !== 0 && listSection.length > 0 ? (
                  <Tooltip title="Subir">
                    <IconButton
                      onClick={(e) => handleRiseSection(index, e)}
                      aria-label="delete"
                      size="large"
                    >
                      <ArrowCircleUpIcon fontSize="inherit" style={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {listSection.length > 0 && listSection.length - 1 !== index ? (
                  <Tooltip title="Bajar">
                    <IconButton
                      onClick={(e) => handleDownSection(index, e)}
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
              <MDButton
                onClick={() => handleOpenDialogQuestion(id)}
                variant="gradient"
                color="info"
              >
                Agregar pregunta
              </MDButton>
            </Grid>
            <Grid item xs={12} md={12} sx={{ textAlign: "left" }}>
              <Typography variant="h5" gutterBottom component="div">
                Preguntas
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={2}>
                {!!sectionSelected &&
                  sectionSelected.questions.length > 0 &&
                  sectionSelected.questions.map((question, indexQuestion) => (
                    <Grid item xs={12} md={12} lg={12}>
                      <CardQuestion
                        question={question}
                        indexQuestion={indexQuestion}
                        questions={sectionSelected.questions}
                        getListFormQuestion={getListFormQuestion}
                        handleClickDeleteQuestion={handleClickDeleteQuestion}
                        handleEditQuestion={handleEditQuestion}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <DialogQuestion
        open={open}
        handleClose={handleClose}
        typeForm={typeForm}
        listForm={listForm}
        listSection={listSection}
        handleUseHtml={handleUseHtml}
        useHtml={useHtmlQuestion}
        handleViewQuestion={handleViewQuestion}
        viewQuestion={viewQuestion}
        handleRequeredQuestion={handleRequeredQuestion}
        requieredQuestion={requieredQuestion}
        handleDependence={handleDependence}
        dependence={dependence}
        handleViewDependenceOption={handleViewDependenceOption}
        viewDependenceOption={viewDependenceOption}
        handleQuestionsRequered={handleQuestionsRequered}
        questionsRequered={questionsRequered}
        handleOptionsRequered={handleOptionsRequered}
        optionsRequered={optionsRequered}
        handleFilesAttached={handleFilesAttached}
        filesAttached={filesAttached}
        handleFilesRequered={handleFilesRequered}
        filesRequered={filesRequered}
        saveQuestion={saveQuestion}
        typeQuestion={typeQuestion}
        setTypeQuestion={setTypeQuestion}
        typeAttachments={typeAttachments}
        setTypeAttachments={setTypeAttachments}
        setSectionSelected={setSectionSelected}
        sectionSelected={sectionSelected}
        listCheckQuestionRequered={listCheckQuestionRequered}
        setListCheckQuestionRequered={setListCheckQuestionRequered}
        codeQuestionState={codeQuestionState}
        filterQuestion={dataEditQuestion}
        setDependencyType={setDependencyType}
        dependencyType={dependencyType}
        setListUpdateCheck={setListUpdateCheck}
        listUpdateCheck={listUpdateCheck}
        allListQuestion={allListQuestion}
        setListCheck={setListCheck}
        listCheck={listCheck}
      />
      <AlertConfirm
        open={openAlert}
        title="Advertencia"
        context="¿Seguro que desea eliminar la pregunta?"
        onClose={handleCloseDialogAlert}
        onAccept={handleDeleteQuestion}
      />
    </>
  );
}

AcordeonSection.defaultProps = {
  id: "",
  name: "",
  code: "",
  order: 0,
  listForm: [],
  listSection: [],
  idFormFilter: "",
  allListQuestion: [],
};

AcordeonSection.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  code: PropTypes.string,
  order: PropTypes.number,
  handleClickDeleteSection: PropTypes.func.isRequired,
  handleEditSection: PropTypes.func.isRequired,
  listForm: PropTypes.arrayOf(PropTypes.string),
  listSection: PropTypes.arrayOf(PropTypes.string),
  idFormFilter: PropTypes.string,
  index: PropTypes.number.isRequired,
  handleRiseSection: PropTypes.func.isRequired,
  handleDownSection: PropTypes.func.isRequired,
  allListQuestion: PropTypes.arrayOf(PropTypes.string),
};

export default AcordeonSection;
