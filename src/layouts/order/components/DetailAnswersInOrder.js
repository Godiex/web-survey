import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import { CardActionArea } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import ViewAttachment from "./VIewAttachments";

function DetailAnswersInOrder({ form, answers, attachments }) {
  const [collapsesOpen, setCollapsesOpen] = useState(
    form.Sections ? form.Sections.map((section) => section.Code) : []
  );

  const handleCollapse = (Code) => {
    if (collapsesOpen.find((item) => item === Code))
      setCollapsesOpen(collapsesOpen.filter((item) => item !== Code));
    else setCollapsesOpen([...collapsesOpen, Code]);
  };

  const isOpen = (code) => !!collapsesOpen.find((item) => item === code);

  const renderQuestionsAndAnswers = (Questions) => {
    let hasAnswer = false;
    const template = Questions.map((question) => {
      const answersByQuestions =
        !!answers && answers.filter((answer) => answer.questionCode === question.Code);
      if (answersByQuestions.length > 0) hasAnswer = true;
      return (
        <MDBox mb={4}>
          <Typography align="justify" fontSize="15px" variant="body1" gutterBottom color="#212121">
            <strong>&#8226;{` ${question.Name}`}</strong>
          </Typography>
          {answersByQuestions.length > 0 ? (
            answersByQuestions.map((answer) => (
              <Typography
                align="justify"
                fontSize="12px"
                variant="body1"
                gutterBottom
                color="#212121"
              >
                {answer.value}
              </Typography>
            ))
          ) : (
            <Typography
              align="justify"
              fontSize="12px"
              variant="body1"
              gutterBottom
              color="#212121"
            >
              No hay respuesta registrada
            </Typography>
          )}
          <MDBox mt={2}>
            <ViewAttachment
              attachments={attachments.filter(
                (attachment) => attachment.questionCode === question.Code
              )}
            />
          </MDBox>
        </MDBox>
      );
    });
    return hasAnswer ? (
      template
    ) : (
      <Typography align="center">No hay respuestas registradas para esta seccion</Typography>
    );
  };

  useEffect(() => {
    setCollapsesOpen(form.Sections ? form.Sections.map((section) => section.Code) : []);
  }, [form]);

  return (
    <>
      {" "}
      <Typography
        style={{
          backgroundColor: "#424242",
          borderRadius: "5px",
          color: "#fafafa",
          padding: "10px",
        }}
        variant="h6"
        align="justify"
        gutterBottom
        component="div"
      >
        {form.Name}
      </Typography>
      <Grid container spacing={2}>
        {!!form &&
          form.Sections.length > 0 &&
          form.Sections.map((section) => (
            <Grid item xs={6}>
              <CardActionArea onClick={() => handleCollapse(section.Code)}>
                <Typography
                  style={{
                    backgroundColor: "#616161",
                    borderRadius: "5px",
                    color: "#fafafa",
                    padding: "10px",
                    marginTop: "2px",
                  }}
                  variant="h6"
                  align="justify"
                  gutterBottom
                  component="div"
                >
                  {section.Name}
                </Typography>
              </CardActionArea>
              <Collapse in={isOpen(section.Code)}>
                <MDBox sx={{ mr: 2, ml: 2, my: 2 }}>
                  {!!section &&
                    section.Questions.length > 0 &&
                    renderQuestionsAndAnswers(section.Questions)}
                </MDBox>
              </Collapse>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
DetailAnswersInOrder.defaultProps = {
  form: {},
  answers: [],
  attachments: [],
};

DetailAnswersInOrder.propTypes = {
  form: PropTypes.objectOf(PropTypes.string),
  answers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
  attachments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
};

export default DetailAnswersInOrder;
