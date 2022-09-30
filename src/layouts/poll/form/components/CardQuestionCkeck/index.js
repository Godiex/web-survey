import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

function CardQuestionCheck({ question, handleChange }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={1} md={1}>
            <Checkbox checked={question.ckeck} onChange={(e) => handleChange(e, question.code)} />
          </Grid>
          <Grid item xs={3} md={2}>
            <Typography variant="subtitle2" gutterBottom component="div">
              {question.code}
            </Typography>
          </Grid>
          <Grid item xs={7} md={8}>
            <Typography variant="subtitle2" gutterBottom component="div">
              {question.nameQuestion}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

CardQuestionCheck.defaultProps = {
  question: {},
};

CardQuestionCheck.propTypes = {
  question: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

export default CardQuestionCheck;
