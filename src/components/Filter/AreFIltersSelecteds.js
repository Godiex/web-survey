import React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function AreFIltersSelecteds({ chipData, handleDelete }) {
  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        height: "40px",
        p: 0.3,
      }}
      component="ul"
    >
      {chipData.map((data) => (
        <ListItem key={data.key}>
          <Chip label={data.label} size="small" onDelete={() => handleDelete(data)} />
        </ListItem>
      ))}
    </Paper>
  );
}

AreFIltersSelecteds.propTypes = {
  chipData: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
export default AreFIltersSelecteds;
