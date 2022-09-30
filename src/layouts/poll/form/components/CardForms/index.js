import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import CardSection from "../CardSection";

function CardForm({ name, sections, handleChange }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent style={{ backgroundColor: "#f0f2f5" }}>
        <Typography variant="h5" gutterBottom component="div">
          {name}
        </Typography>
        <Grid container spacing={1}>
          {sections.length > 0 &&
            sections.map((section) => (
              <Grid item xs={12} md={12} lg={12}>
                <CardSection
                  name={section.name}
                  questions={section.questions}
                  handleChange={handleChange}
                />
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

CardForm.defaultProps = {
  sections: [],
  name: "",
};

CardForm.propTypes = {
  name: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func.isRequired,
};

export default CardForm;
