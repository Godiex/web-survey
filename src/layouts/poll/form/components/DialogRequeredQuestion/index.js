import * as React from "react";
import Dialog from "@mui/material/Dialog";
import PropTypes from "prop-types";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import CardQuestionCheck from "../CardQuestionCkeck";

function DialogRequeredQuestion({
  openDialogQuestion,
  handleCloseRequieredQuestion,
  setListCheckQuestionRequered,
  listCheckQuestionRequered,
}) {
  const handleChange = (e, codeItem) => {
    const listSelectdQuestion = [...listCheckQuestionRequered];
    for (let i = 0; i < listSelectdQuestion.length; i += 1) {
      if (listSelectdQuestion[i].code === codeItem) {
        listSelectdQuestion[i].ckeck = e.target.checked;
      }
    }
    setListCheckQuestionRequered(listSelectdQuestion);
  };

  const handleSaveQuestion = () => {
    handleCloseRequieredQuestion();
  };

  return (
    <>
      <Dialog
        open={openDialogQuestion}
        onClose={handleCloseRequieredQuestion}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="true"
        maxWidth="lg"
      >
        <DialogTitle style={{ backgroundColor: "#f0f2f5" }} id="alert-dialog-title">
          Seleccionar preguntas
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#f0f2f5" }}>
          <Grid container spacing={1}>
            {listCheckQuestionRequered.length > 0 &&
              listCheckQuestionRequered.map((question) => (
                <Grid item xs={12} md={12} lg={12}>
                  <CardQuestionCheck question={question} handleChange={handleChange} />
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#f0f2f5" }}>
          <MDButton onClick={handleCloseRequieredQuestion} variant="outlined" color="info">
            Cerrar
          </MDButton>
          <MDButton onClick={handleSaveQuestion} variant="gradient" color="info">
            Guardar Cambios
          </MDButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

DialogRequeredQuestion.defaultProps = {
  openDialogQuestion: false,
  setListCheckQuestionRequered: [],
  listCheckQuestionRequered: [],
};

DialogRequeredQuestion.propTypes = {
  openDialogQuestion: PropTypes.bool,
  handleCloseRequieredQuestion: PropTypes.func.isRequired,
  listCheckQuestionRequered: PropTypes.objectOf(PropTypes.string),
  setListCheckQuestionRequered: PropTypes.elementType,
};

export default DialogRequeredQuestion;
