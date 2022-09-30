import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function CardSection({ name, questions, handleChange }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          {name}
          <Grid container spacing={1}>
            {questions.length > 0 &&
              questions.map((question) => (
                <Grid item xs={12} md={12} lg={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={question.checked}
                        onChange={() => handleChange(question)}
                      />
                    }
                    label={question.name}
                  />
                </Grid>
              ))}
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
}

CardSection.defaultProps = {
  name: "",
  questions: [],
};

CardSection.propTypes = {
  name: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

export default CardSection;
