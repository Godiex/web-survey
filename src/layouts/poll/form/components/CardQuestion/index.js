import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { useAlert } from "react-alert";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MDButton from "components/MDButton";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import DialogRegisterOption from "../DialogRegisterOption";
import MenuOptions from "../MenuOptions";
import httpRequest from "../../../../../services/httpRequest";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function CardQuestion({
  question,
  indexQuestion,
  questions,
  getListFormQuestion,
  handleClickDeleteQuestion,
  handleEditQuestion,
}) {
  const alert = useAlert();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [throwRequiredAux, setThrowRequired] = React.useState(false);
  const [throwDependencyAux, setThrowDependency] = React.useState(false);
  const [idQuestion, setIdQuestion] = React.useState("");
  const [listOption, setListOption] = React.useState([]);
  const [dataEditOption, setDataEditOption] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const handleExpandClick = async (id) => {
    try {
      setIdQuestion(id);
      const response = await httpRequest.getEntries(`questions/${id}/options`);
      setListOption(response);
      setExpanded(!expanded);
    } catch (e) {
      alert.error("Error al cargar las opciones", { position: "top right" });
    }
  };

  const getOptionsByQuestion = async (idQuestionGet) => {
    try {
      const response = await httpRequest.getEntries(`questions/${idQuestionGet}/options`);
      setListOption(response);
    } catch (e) {
      alert.error("Error al cargar las opciones", { position: "top right" });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialogOption = () => {
    setOpen(true);
    setIsEdit(false);
  };

  const handleThrowRequired = () => {
    setThrowRequired(!throwRequiredAux);
  };

  const handleThrowDependency = () => {
    setThrowDependency(!throwDependencyAux);
  };

  const handleSaveOption = async (values) => {
    try {
      const data = {
        id: isEdit ? dataEditOption.id : "",
        value: values.value,
        text: values.text,
        description: values.description,
        throwRequired: throwRequiredAux,
        throwDependency: throwDependencyAux,
        questionId: idQuestion,
      };
      if (isEdit) {
        await httpRequest.update(`options/${dataEditOption.id}/update`, "", data);
        handleClose();
      } else {
        await httpRequest.create(`options/create`, data);
        setThrowRequired(false);
        setThrowDependency(false);
      }
      await getOptionsByQuestion(idQuestion);
      alert.show(`${isEdit ? "Opción actualizada" : "Opción creada"}`, {
        position: "top right",
      });
    } catch (e) {
      alert.error(`${isEdit ? "Error al editar opción" : "Error al crear la opción"}`, {
        position: "top right",
      });
    }
  };

  const handleRiseQuestion = async (indexQuestionParam, e) => {
    e.stopPropagation();
    const orderQuestionRise = [...questions];
    const arriba = indexQuestionParam - 1;
    const abajo = arriba + 1;
    const newOrderOne = orderQuestionRise[abajo].order;
    const newOrderThow = orderQuestionRise[arriba].order;
    const auxDataArriba = {
      allowedAttachments: orderQuestionRise[indexQuestionParam].allowedAttachments,
      code: orderQuestionRise[indexQuestionParam].code,
      dependencyCodes: orderQuestionRise[indexQuestionParam].dependencyCodes,
      dependencyDependingOnOption:
        orderQuestionRise[indexQuestionParam].dependencyDependingOnOption,
      dependencyType: orderQuestionRise[indexQuestionParam].dependencyType,
      description: orderQuestionRise[indexQuestionParam].description,
      hasAttachments: orderQuestionRise[indexQuestionParam].hasAttachments,
      hasDependency: orderQuestionRise[indexQuestionParam].hasDependency,
      hasRequiredQuestions: orderQuestionRise[indexQuestionParam].hasRequiredQuestions,
      hidden: orderQuestionRise[indexQuestionParam].hidden,
      html: orderQuestionRise[indexQuestionParam].html,
      id: orderQuestionRise[indexQuestionParam].id,
      name: orderQuestionRise[indexQuestionParam].name,
      options: orderQuestionRise[indexQuestionParam].options,
      order: newOrderThow,
      qType: orderQuestionRise[indexQuestionParam].qType,
      regex: orderQuestionRise[indexQuestionParam].regex,
      required: orderQuestionRise[indexQuestionParam].required,
      requiredAttachments: orderQuestionRise[indexQuestionParam].requiredAttachments,
      requiredDependingOnOption: orderQuestionRise[indexQuestionParam].requiredDependingOnOption,
      requiredQuestionsCodes: orderQuestionRise[indexQuestionParam].requiredQuestionsCodes,
      useHtml: orderQuestionRise[indexQuestionParam].useHtml,
    };

    const auxDataAbajo = {
      allowedAttachments: orderQuestionRise[arriba].allowedAttachments,
      code: orderQuestionRise[arriba].code,
      dependencyCodes: orderQuestionRise[arriba].dependencyCodes,
      dependencyDependingOnOption: orderQuestionRise[arriba].dependencyDependingOnOption,
      dependencyType: orderQuestionRise[arriba].dependencyType,
      description: orderQuestionRise[arriba].description,
      hasAttachments: orderQuestionRise[arriba].hasAttachments,
      hasDependency: orderQuestionRise[arriba].hasDependency,
      hasRequiredQuestions: orderQuestionRise[arriba].hasRequiredQuestions,
      hidden: orderQuestionRise[arriba].hidden,
      html: orderQuestionRise[arriba].html,
      id: orderQuestionRise[arriba].id,
      name: orderQuestionRise[arriba].name,
      options: orderQuestionRise[arriba].options,
      order: newOrderOne,
      qType: orderQuestionRise[arriba].qType,
      regex: orderQuestionRise[arriba].regex,
      required: orderQuestionRise[arriba].required,
      requiredAttachments: orderQuestionRise[arriba].requiredAttachments,
      requiredDependingOnOption: orderQuestionRise[arriba].requiredDependingOnOption,
      requiredQuestionsCodes: orderQuestionRise[arriba].requiredQuestionsCodes,
      useHtml: orderQuestionRise[arriba].useHtml,
    };
    orderQuestionRise[arriba] = auxDataArriba;
    orderQuestionRise[abajo] = auxDataAbajo;
    const data = {
      newQuestionOrders: [
        { id: orderQuestionRise[arriba].id, newOrder: newOrderThow },
        { id: orderQuestionRise[abajo].id, newOrder: newOrderOne },
      ],
    };
    try {
      await httpRequest.create(`questions/change-orders`, data);
      await getListFormQuestion();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  const handleDownSection = async (indexDownQuestion, e) => {
    e.stopPropagation();
    const orderQuestionDown = [...questions];
    const arribaQuestion = indexDownQuestion;
    const abajoQuestion = indexDownQuestion + 1;
    const newOrderQuestionOne = orderQuestionDown[abajoQuestion].order;
    const newOrderQuestionThow = orderQuestionDown[arribaQuestion].order;

    const dataQuestionArriba = {
      allowedAttachments: orderQuestionDown[abajoQuestion].allowedAttachments,
      code: orderQuestionDown[abajoQuestion].code,
      dependencyCodes: orderQuestionDown[abajoQuestion].dependencyCodes,
      dependencyDependingOnOption: orderQuestionDown[abajoQuestion].dependencyDependingOnOption,
      dependencyType: orderQuestionDown[abajoQuestion].dependencyType,
      description: orderQuestionDown[abajoQuestion].description,
      hasAttachments: orderQuestionDown[abajoQuestion].hasAttachments,
      hasDependency: orderQuestionDown[abajoQuestion].hasDependency,
      hasRequiredQuestions: orderQuestionDown[abajoQuestion].hasRequiredQuestions,
      hidden: orderQuestionDown[abajoQuestion].hidden,
      html: orderQuestionDown[abajoQuestion].html,
      id: orderQuestionDown[abajoQuestion].id,
      name: orderQuestionDown[abajoQuestion].name,
      options: orderQuestionDown[abajoQuestion].options,
      order: newOrderQuestionThow,
      qType: orderQuestionDown[abajoQuestion].qType,
      regex: orderQuestionDown[abajoQuestion].regex,
      required: orderQuestionDown[abajoQuestion].required,
      requiredAttachments: orderQuestionDown[abajoQuestion].requiredAttachments,
      requiredDependingOnOption: orderQuestionDown[abajoQuestion].requiredDependingOnOption,
      requiredQuestionsCodes: orderQuestionDown[abajoQuestion].requiredQuestionsCodes,
      useHtml: orderQuestionDown[abajoQuestion].useHtml,
    };

    const dataQuestionAbajo = {
      allowedAttachments: orderQuestionDown[indexDownQuestion].allowedAttachments,
      code: orderQuestionDown[indexDownQuestion].code,
      dependencyCodes: orderQuestionDown[indexDownQuestion].dependencyCodes,
      dependencyDependingOnOption: orderQuestionDown[indexDownQuestion].dependencyDependingOnOption,
      dependencyType: orderQuestionDown[indexDownQuestion].dependencyType,
      description: orderQuestionDown[indexDownQuestion].description,
      hasAttachments: orderQuestionDown[indexDownQuestion].hasAttachments,
      hasDependency: orderQuestionDown[indexDownQuestion].hasDependency,
      hasRequiredQuestions: orderQuestionDown[indexDownQuestion].hasRequiredQuestions,
      hidden: orderQuestionDown[indexDownQuestion].hidden,
      html: orderQuestionDown[indexDownQuestion].html,
      id: orderQuestionDown[indexDownQuestion].id,
      name: orderQuestionDown[indexDownQuestion].name,
      options: orderQuestionDown[indexDownQuestion].options,
      order: newOrderQuestionOne,
      qType: orderQuestionDown[indexDownQuestion].qType,
      regex: orderQuestionDown[indexDownQuestion].regex,
      required: orderQuestionDown[indexDownQuestion].required,
      requiredAttachments: orderQuestionDown[indexDownQuestion].requiredAttachments,
      requiredDependingOnOption: orderQuestionDown[indexDownQuestion].requiredDependingOnOption,
      requiredQuestionsCodes: orderQuestionDown[indexDownQuestion].requiredQuestionsCodes,
      useHtml: orderQuestionDown[indexDownQuestion].useHtml,
    };

    orderQuestionDown[arribaQuestion] = dataQuestionArriba;
    orderQuestionDown[abajoQuestion] = dataQuestionAbajo;

    const dataQuestionDow = {
      newQuestionOrders: [
        { id: orderQuestionDown[arribaQuestion].id, newOrder: newOrderQuestionThow },
        { id: orderQuestionDown[abajoQuestion].id, newOrder: newOrderQuestionOne },
      ],
    };

    try {
      await httpRequest.create(`questions/change-orders`, dataQuestionDow);
      await getListFormQuestion();
    } catch (error) {
      alert.error("Error al cambiar la posición", { position: "top right" });
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={1} md={1}>
              <Avatar
                style={{ fontSize: "14px" }}
                sx={{ width: 30, height: 30, bgcolor: "#2196f3" }}
              >
                {question.order}
              </Avatar>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography variant="subtitle2" gutterBottom component="div">
                {question.code}
              </Typography>
            </Grid>
            <Grid item xs={3} md={6}>
              <Typography variant="subtitle2" gutterBottom component="div">
                {question.name}
              </Typography>
            </Grid>
            <Grid item xs={5} md={3}>
              <Grid container>
                <Tooltip title="Editar pregunta">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={(e) => handleEditQuestion(question.id, e)}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar pregunta">
                  <IconButton
                    onClick={(e) => handleClickDeleteQuestion(question.id, indexQuestion, e)}
                    aria-label="delete"
                    size="large"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                {indexQuestion !== 0 && questions.length > 0 ? (
                  <Tooltip title="Subir">
                    <IconButton
                      onClick={(e) => handleRiseQuestion(indexQuestion, e)}
                      aria-label="delete"
                      size="large"
                    >
                      <ArrowCircleUpIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                ) : null}
                {questions.length > 0 && questions.length - 1 !== indexQuestion ? (
                  <Tooltip title="Bajar">
                    <IconButton
                      onClick={(e) => handleDownSection(indexQuestion, e)}
                      aria-label="delete"
                      size="large"
                    >
                      <ArrowCircleDownIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                ) : null}
              </Grid>
            </Grid>
            {question.qType === "RADIOBUTTON" ||
            question.qType === "CHECKBOX" ||
            question.qType === "COMBOBOX_OPTIONS" ? (
              <Grid item xs={12} md={12}>
                <CardActions disableSpacing>
                  <Typography variant="h5" gutterBottom component="div">
                    Opciones
                  </Typography>
                  <ExpandMore
                    expand={expanded}
                    onClick={() => handleExpandClick(question.id)}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={12} sx={{ textAlign: "right" }}>
                      <MDButton onClick={handleOpenDialogOption} variant="gradient" color="info">
                        Agregar opciones
                      </MDButton>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Grid container>
                        {listOption.length > 0 &&
                          listOption.map((option) => (
                            <>
                              <Grid item xs={1} md={1} lg={1}>
                                <MenuOptions
                                  id={option.id}
                                  getOptionsByQuestion={getOptionsByQuestion}
                                  idQuestion={idQuestion}
                                  listOption={listOption}
                                  setDataEditOption={setDataEditOption}
                                  setOpen={setOpen}
                                  setIsEdit={setIsEdit}
                                  setThrowRequired={setThrowRequired}
                                  setThrowDependency={setThrowDependency}
                                />
                              </Grid>
                              <Grid item xs={11} md={11} lg={11}>
                                <Typography variant="subtitle2" gutterBottom component="div">
                                  {option.text}
                                </Typography>
                              </Grid>
                            </>
                          ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            ) : null}
          </Grid>
        </CardContent>
      </Card>
      <DialogRegisterOption
        open={open}
        handleClose={handleClose}
        throwRequired={throwRequiredAux}
        handleThrowRequired={handleThrowRequired}
        throwDependency={throwDependencyAux}
        handleThrowDependency={handleThrowDependency}
        handleSaveOption={handleSaveOption}
        isEdit={isEdit}
        dataEditOption={dataEditOption}
      />
    </>
  );
}

CardQuestion.defaultProps = {
  question: {},
  questions: [],
};

CardQuestion.propTypes = {
  question: PropTypes.objectOf(PropTypes.string),
  indexQuestion: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string),
  getListFormQuestion: PropTypes.func.isRequired,
  handleClickDeleteQuestion: PropTypes.func.isRequired,
  handleEditQuestion: PropTypes.func.isRequired,
};

export default CardQuestion;
