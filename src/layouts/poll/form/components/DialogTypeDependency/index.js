import * as React from "react";
import MDButton from "components/MDButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

function DialogTypeDependency({
  openTypeDependency,
  handleCloseTypeDependency,
  listCheck,
  dependencyType,
  listForm,
  setListUpdateCheck,
  typeOpenDependency,
  listSection,
  allListQuestion,
}) {
  const listSelectd = [];
  const auListCheck = [...listCheck];

  const handleChange = (item) => {
    if (typeOpenDependency === "registrar") {
      let contador = "";
      if (listSelectd.length > 0) {
        for (let i = 0; i < listSelectd.length; i += 1) {
          if (listSelectd[i].code === item.code) {
            contador = i;
          }
        }

        if (contador !== "") {
          listSelectd[contador].checked = false;
        } else {
          listSelectd.push({ code: item.code, checked: true, name: item.name });
        }
      } else {
        listSelectd.push({ code: item.code, checked: true, name: item.name });
      }
    } else {
      for (let i = 0; i < auListCheck.length; i += 1) {
        if (auListCheck[i].code === item.code) {
          auListCheck[i].checked = !item.checked;
        }
      }
      setListUpdateCheck(auListCheck);
    }
  };

  const saveListCode = () => {
    const newListForm = [];
    const newSection = [];
    const newQuestion = [];
    let ckeckNew = "";
    let codeNew = "";
    let nameNew = "";
    if (dependencyType === "FORMS") {
      if (typeOpenDependency === "registrar") {
        for (let i = 0; i < listForm.length; i += 1) {
          for (let x = 0; x < listSelectd.length; x += 1) {
            if (listForm[i].code === listSelectd[x].code) {
              ckeckNew = listSelectd[x].checked;
              codeNew = listSelectd[x].code;
              nameNew = listSelectd[x].name;
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
      } else {
        setListUpdateCheck(auListCheck);
      }
      handleCloseTypeDependency();
    } else if (dependencyType === "SECCTION") {
      if (typeOpenDependency === "registrar") {
        for (let i = 0; i < listSection.length; i += 1) {
          for (let x = 0; x < listSelectd.length; x += 1) {
            if (listSection[i].code === listSelectd[x].code) {
              ckeckNew = listSelectd[x].checked;
              codeNew = listSelectd[x].code;
              nameNew = listSelectd[x].name;
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
      } else {
        setListUpdateCheck(auListCheck);
      }
      handleCloseTypeDependency();
    } else {
      if (typeOpenDependency === "registrar") {
        for (let q = 0; q < allListQuestion.length; q += 1) {
          for (let x = 0; x < listSelectd.length; x += 1) {
            if (allListQuestion[q].code === listSelectd[x].code) {
              ckeckNew = listSelectd[x].checked;
              codeNew = listSelectd[x].code;
              nameNew = listSelectd[x].name;
              break;
            } else {
              ckeckNew = false;
              codeNew = allListQuestion[q].code;
              nameNew = allListQuestion[q].name;
            }
          }
          newQuestion.push({ code: codeNew, name: nameNew, checked: ckeckNew });
        }
        setListUpdateCheck(newQuestion);
      } else {
        setListUpdateCheck(auListCheck);
      }
      handleCloseTypeDependency();
    }
  };

  return (
    <div>
      <Dialog
        open={openTypeDependency}
        onClose={handleCloseTypeDependency}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle>
          {/* eslint-disable-next-line no-nested-ternary */}
          {dependencyType === "FORMS"
            ? "Listado de formularios"
            : dependencyType === "SECCTION"
            ? "Listado de Secciones"
            : "Listado de Preguntas"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={1}>
              {listCheck.length > 0 &&
                listCheck.map((ckeck) => (
                  <Grid item xs={12} md={12} lg={12}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={ckeck.checked} onChange={() => handleChange(ckeck)} />
                      }
                      label={ckeck.name}
                    />
                  </Grid>
                ))}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleCloseTypeDependency} variant="outlined" color="info">
            Cerrar
          </MDButton>
          <MDButton onClick={saveListCode} variant="gradient" color="info">
            Guardar Cambios
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DialogTypeDependency.defaultProps = {
  openTypeDependency: false,
  listCheck: [],
  listForm: [],
  setListUpdateCheck: "",
  listSection: [],
  allListQuestion: [],
};

DialogTypeDependency.propTypes = {
  openTypeDependency: PropTypes.bool,
  handleCloseTypeDependency: PropTypes.func.isRequired,
  listCheck: PropTypes.arrayOf(PropTypes.string),
  dependencyType: PropTypes.string.isRequired,
  listForm: PropTypes.arrayOf(PropTypes.string),
  setListUpdateCheck: PropTypes.element,
  typeOpenDependency: PropTypes.string.isRequired,
  listSection: PropTypes.arrayOf(PropTypes.string),
  allListQuestion: PropTypes.arrayOf(PropTypes.string),
};

export default DialogTypeDependency;
