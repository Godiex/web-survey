import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import DialogActions from "@mui/material/DialogActions";
import MDButton from "components/MDButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import DialogTypeDependency from "../DialogTypeDependency";
import DialogRequeredQuestion from "../DialogRequeredQuestion";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
});

const typeQuestions = [
  { name: "TEXTBOX" },
  { name: "COMBOBOX_BOOLEAN" },
  { name: "COMBOBOX_OPTIONS" },
  { name: "SWITCH_BOOLEAN" },
  { name: "TEXTAREA" },
  { name: "CHECKBOX" },
  { name: "RADIOBUTTON" },
  { name: "SLIDER" },
  { name: "DATE" },
  { name: "DATETIME" },
  { name: "TIME" },
  { name: "NUMBER" },
  { name: "COLOR" },
];

const typeDependency = [{ name: "FORMS" }, { name: "SECCTION" }, { name: "QUESTIONS" }];

function DialogQuestion({
  open,
  handleClose,
  typeForm,
  listForm,
  listSection,
  handleUseHtml,
  useHtml,
  handleViewQuestion,
  viewQuestion,
  handleRequeredQuestion,
  requieredQuestion,
  handleDependence,
  dependence,
  handleViewDependenceOption,
  viewDependenceOption,
  handleQuestionsRequered,
  questionsRequered,
  handleOptionsRequered,
  optionsRequered,
  handleFilesAttached,
  filesAttached,
  handleFilesRequered,
  filesRequered,
  saveQuestion,
  typeQuestion,
  setTypeQuestion,
  typeAttachments,
  setTypeAttachments,
  setSectionSelected,
  sectionSelected,
  listCheckQuestionRequered,
  setListCheckQuestionRequered,
  codeQuestionState,
  filterQuestion,
  setDependencyType,
  dependencyType,
  setListUpdateCheck,
  listUpdateCheck,
  allListQuestion,
  setListCheck,
  listCheck,
}) {
  const [openTypeDependency, setOpenTypeDependency] = React.useState(false);
  const [typeOpenDependency, setTypeOpenDependency] = React.useState("");

  const [openDialogQuestion, setOpenDialogQuestion] = React.useState(false);

  const handleTypeDependency = (event) => {
    setDependencyType(event.target.value);
    setListCheck([]);
    setListUpdateCheck([]);
  };

  const handleTypeQuestion = (ev) => {
    setTypeQuestion(ev.target.value);
  };

  const handleOpenTypeDependency = () => {
    setOpenTypeDependency(true);
    if (dependencyType === "FORMS") {
      if (listUpdateCheck.length > 0) {
        setListCheck(listUpdateCheck);
        setTypeOpenDependency("actualizar");
      } else {
        setListCheck(listForm);
        setTypeOpenDependency("registrar");
      }
    } else if (dependencyType === "SECCTION") {
      if (listUpdateCheck.length > 0) {
        setListCheck(listUpdateCheck);
        setTypeOpenDependency("actualizar");
      } else {
        setListCheck(listSection);
        setTypeOpenDependency("registrar");
      }
    } else if (dependencyType === "QUESTIONS") {
      if (listUpdateCheck.length > 0) {
        setListCheck(listUpdateCheck);
        setTypeOpenDependency("actualizar");
      } else {
        setListCheck(allListQuestion);
        setTypeOpenDependency("registrar");
      }
    }
  };

  const handleCloseTypeDependency = () => {
    setOpenTypeDependency(false);
  };

  const handleOpenDialogQuestion = async () => {
    const questionsList = [];
    if (listCheckQuestionRequered.length === 0) {
      for (let x = 0; x < allListQuestion.length; x += 1) {
        questionsList.push({
          code: allListQuestion[x].code,
          id: allListQuestion[x].id,
          nameQuestion: allListQuestion[x].name,
          order: allListQuestion[x].order,
          ckeck: false,
        });
      }
      setListCheckQuestionRequered(questionsList);
    }
    setOpenDialogQuestion(true);
  };

  const handleCloseRequieredQuestion = () => {
    setOpenDialogQuestion(false);
  };

  const handleTypeAttachments = (event, value) => {
    const auxTypeAttachments = [...typeAttachments];
    for (let i = 0; i < auxTypeAttachments.length; i += 1) {
      if (auxTypeAttachments[i].value === value) {
        auxTypeAttachments[i].check = event.target.checked;
      }
    }
    setTypeAttachments(auxTypeAttachments);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth="true" maxWidth="md">
        <Formik
          initialValues={{
            code: typeForm === "registro" ? codeQuestionState : "",
            name: typeForm === "registro" ? "" : filterQuestion.name,
            description: typeForm === "registro" ? "" : filterQuestion.description,
            regex: typeForm === "registro" ? "" : filterQuestion.regex,
            html: typeForm === "registro" ? "" : filterQuestion.html,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            saveQuestion(values, dependencyType, listUpdateCheck);
            resetForm({
              code: "",
              name: "",
              description: "",
              regex: "",
              html: "",
            });
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <DialogTitle>
                {typeForm === "registro" ? "Nueva pregunta" : "Editar sección"}
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <Field
                        name="code"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Código"
                        fullWidth
                        disabled
                        value={codeQuestionState}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox mt={1}>
                      <TextField
                        select
                        label="Tipo de pregunta"
                        name="identificationType"
                        fullWidth
                        variant="standard"
                        id="outlined-size-normal"
                        value={typeQuestion}
                        onChange={handleTypeQuestion}
                      >
                        {typeQuestions.map((type) => (
                          <MenuItem key={type.name} value={type.name}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox>
                      <Field
                        name="name"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Nombre"
                        fullWidth
                        error={errors.name && touched.name}
                        helperText={touched.name && errors.name}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <Field
                        name="description"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Descripción"
                        fullWidth
                        error={errors.description && touched.description}
                        helperText={touched.description && errors.description}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Usar HTML</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={useHtml}
                            onChange={handleUseHtml}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  {useHtml ? (
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox>
                        <Field
                          name="html"
                          type="text"
                          as={MDInput}
                          variant="standard"
                          multiline
                          rows={5}
                          label="HTML"
                          fullWidth
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Visualizar pregunta</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            onChange={handleViewQuestion}
                            checked={viewQuestion}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <MDBox>
                      <Field
                        name="regex"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Expresión regular"
                        fullWidth
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Pregunta requerida</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            onChange={handleRequeredQuestion}
                            checked={requieredQuestion}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>¿Tiene dependencia de visualización?</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={dependence}
                            onChange={handleDependence}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    {dependence ? (
                      <MDBox mt={1}>
                        <TextField
                          select
                          label="Tipo de dependencia"
                          fullWidth
                          variant="standard"
                          id="outlined-size-normal"
                          value={dependencyType}
                          onChange={handleTypeDependency}
                        >
                          {typeDependency.map((typeDep) => (
                            <MenuItem key={typeDep.name} value={typeDep.name}>
                              {typeDep.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </MDBox>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox mt={1}>
                      {dependencyType !== null ? (
                        <MDButton
                          onClick={handleOpenTypeDependency}
                          variant="gradient"
                          color="info"
                        >
                          {/* eslint-disable-next-line no-nested-ternary */}
                          {dependencyType === "FORMS"
                            ? "Seleccionar formularios"
                            : /* eslint-disable-next-line no-nested-ternary */
                            dependencyType === "SECCTION"
                            ? "Seleccionar Secciones"
                            : /* eslint-disable-next-line no-nested-ternary */
                            dependencyType === "QUESTIONS"
                            ? "Seleccionar Preguntas"
                            : null}
                        </MDButton>
                      ) : null}
                    </MDBox>
                  </Grid>
                  {dependencyType !== "" ? (
                    <Grid item xs={12} md={3} lg={3}>
                      <MDBox>
                        <div style={{ fontSize: "13px" }}>
                          ¿La visualización depende de la opción?
                        </div>
                        <FormControlLabel
                          control={
                            <Switch
                              color="secondary"
                              inputProps={{ "aria-label": "controlled" }}
                              checked={viewDependenceOption}
                              onChange={handleViewDependenceOption}
                            />
                          }
                          label=""
                        />
                      </MDBox>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>¿Marcar preguntas como requeridas?</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={questionsRequered}
                            onChange={handleQuestionsRequered}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  {questionsRequered ? (
                    <>
                      <Grid item xs={12} md={3} lg={3}>
                        <MDBox mt={1}>
                          <MDButton
                            onClick={handleOpenDialogQuestion}
                            variant="gradient"
                            color="info"
                          >
                            Seleccionar pregungas
                          </MDButton>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <MDBox>
                          <div style={{ fontSize: "13px" }}>
                            ¿Marcar las preguntas como requeridas dependerá de la opción?
                          </div>
                          <FormControlLabel
                            control={
                              <Switch
                                color="secondary"
                                inputProps={{ "aria-label": "controlled" }}
                                checked={optionsRequered}
                                onChange={handleOptionsRequered}
                              />
                            }
                            label=""
                          />
                        </MDBox>
                      </Grid>
                    </>
                  ) : null}
                  <Grid item xs={12} md={3} lg={3}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>¿Tiene archivos adjuntos?</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            onChange={handleFilesAttached}
                            checked={filesAttached}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  {filesAttached ? (
                    <>
                      <Grid item xs={12} md={4} lg={4}>
                        <MDBox>
                          <div style={{ fontSize: "13px" }}>Seleccionar los tipos de archivos</div>
                          <Grid container spacing={1}>
                            {typeAttachments.length > 0 &&
                              typeAttachments.map((type) => (
                                <Grid item xs={6} md={3} lg={3}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={type.check}
                                        onChange={(e) => handleTypeAttachments(e, type.value)}
                                      />
                                    }
                                    label={type.name}
                                  />
                                </Grid>
                              ))}
                          </Grid>
                        </MDBox>
                      </Grid>
                      <Grid item xs={12} md={3} lg={3}>
                        <MDBox>
                          <div style={{ fontSize: "13px" }}>
                            ¿Los archivos adjuntos son requeridos?
                          </div>
                          <FormControlLabel
                            control={
                              <Switch
                                color="secondary"
                                inputProps={{ "aria-label": "controlled" }}
                                checked={filesRequered}
                                onChange={handleFilesRequered}
                              />
                            }
                            label=""
                          />
                        </MDBox>
                      </Grid>
                    </>
                  ) : null}
                </Grid>
              </DialogContent>
              <DialogActions>
                <MDButton onClick={handleClose} variant="outlined" color="info">
                  Cerrar
                </MDButton>
                <MDButton type="submit" variant="gradient" color="info">
                  {typeForm === "registro" ? "Agregar" : "Guardar cambios"}
                </MDButton>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <DialogTypeDependency
        openTypeDependency={openTypeDependency}
        handleCloseTypeDependency={handleCloseTypeDependency}
        listCheck={listCheck}
        dependencyType={dependencyType}
        setListCheck={setListCheck}
        listForm={listForm}
        setListUpdateCheck={setListUpdateCheck}
        typeOpenDependency={typeOpenDependency}
        listSection={listSection}
        allListQuestion={allListQuestion}
      />
      <DialogRequeredQuestion
        openDialogQuestion={openDialogQuestion}
        handleCloseRequieredQuestion={handleCloseRequieredQuestion}
        setSectionSelected={setSectionSelected}
        sectionSelected={sectionSelected}
        setListCheckQuestionRequered={setListCheckQuestionRequered}
        listCheckQuestionRequered={listCheckQuestionRequered}
      />
    </>
  );
}

DialogQuestion.defaultProps = {
  open: false,
  listForm: [],
  listSection: [],
  useHtml: false,
  viewQuestion: false,
  requieredQuestion: false,
  dependence: false,
  viewDependenceOption: false,
  questionsRequered: false,
  optionsRequered: false,
  filesAttached: false,
  filesRequered: false,
  setTypeQuestion: "",
  typeAttachments: [],
  setTypeAttachments: [],
  setSectionSelected: "",
  sectionSelected: {},
  listCheckQuestionRequered: [],
  setListCheckQuestionRequered: "",
  filterQuestion: {},
  setDependencyType: "",
  setListUpdateCheck: "",
  listUpdateCheck: [],
  allListQuestion: [],
  setListCheck: "",
  listCheck: [],
};

DialogQuestion.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  listForm: PropTypes.arrayOf(PropTypes.string),
  listSection: PropTypes.arrayOf(PropTypes.string),
  handleUseHtml: PropTypes.func.isRequired,
  useHtml: PropTypes.bool,
  handleViewQuestion: PropTypes.func.isRequired,
  viewQuestion: PropTypes.bool,
  handleRequeredQuestion: PropTypes.func.isRequired,
  requieredQuestion: PropTypes.bool,
  handleDependence: PropTypes.func.isRequired,
  dependence: PropTypes.bool,
  handleViewDependenceOption: PropTypes.func.isRequired,
  viewDependenceOption: PropTypes.bool,
  handleQuestionsRequered: PropTypes.func.isRequired,
  questionsRequered: PropTypes.bool,
  handleOptionsRequered: PropTypes.func.isRequired,
  optionsRequered: PropTypes.bool,
  handleFilesAttached: PropTypes.func.isRequired,
  filesAttached: PropTypes.bool,
  handleFilesRequered: PropTypes.func.isRequired,
  filesRequered: PropTypes.bool,
  saveQuestion: PropTypes.func.isRequired,
  typeQuestion: PropTypes.string.isRequired,
  setTypeQuestion: PropTypes.elementType,
  typeAttachments: PropTypes.arrayOf(PropTypes.string),
  setTypeAttachments: PropTypes.elementType,
  setSectionSelected: PropTypes.elementType,
  sectionSelected: PropTypes.objectOf(PropTypes.string),
  listCheckQuestionRequered: PropTypes.arrayOf(PropTypes.string),
  setListCheckQuestionRequered: PropTypes.elementType,
  codeQuestionState: PropTypes.string.isRequired,
  filterQuestion: PropTypes.objectOf(PropTypes.string),
  setDependencyType: PropTypes.elementType,
  dependencyType: PropTypes.string.isRequired,
  setListUpdateCheck: PropTypes.element,
  listUpdateCheck: PropTypes.arrayOf(PropTypes.string),
  allListQuestion: PropTypes.arrayOf(PropTypes.string),
  setListCheck: PropTypes.element,
  listCheck: PropTypes.arrayOf(PropTypes.string),
};

export default DialogQuestion;
