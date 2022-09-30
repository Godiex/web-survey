import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { Field } from "formik";
import Grid from "@mui/material/Grid";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import { HexColorPicker } from "react-colorful";
import InputAdornment from "@mui/material/InputAdornment";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Card from "@mui/material/Card";

function InputColorPicker({ initialColor, labelInpunt, nameField, errors, touched, onChange }) {
  const [color, setColor] = useState(initialColor);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);

  //   const handleOpenMenuProfile = () => {};
  const handleSetColor = (e) => {
    const newColor = `${e.replace("#", "")}`;
    setColor(newColor);
    onChange(e, newColor);
  };

  const handleOpenMenu = (event) => {
    setOpenMenuProfile(event.currentTarget);
  };
  const handleOpenMenuProfile = () => setOpenMenuProfile(false);

  return (
    <ClickAwayListener onClickAway={handleOpenMenuProfile}>
      <Grid container spacing={0.5}>
        <Grid item xs={2} p={1} display="flex" alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: "40px",
              height: "40px",
              backgroundColor: `#${color}`,
              borderRadius: "5px",
            }}
          />
        </Grid>
        <Grid item xs={10}>
          {" "}
          <Field
            as={TextField}
            name={nameField}
            fullWidth
            variant="standard"
            onClick={(event) => handleOpenMenu(event)}
            onChange={(_) => handleSetColor(_.target.value)}
            label={labelInpunt}
            InputProps={{
              startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
            error={errors && touched}
            helperText={touched && errors}
            InputLabelProps={{ shrink: true }}
          />
          <Zoom
            sx={{ mt: 0.5, position: "absolute", zIndex: 100, transformOrigin: "0 0 0" }}
            in={Boolean(openMenuProfile)}
          >
            <Card sx={{ p: 3 }}>
              {" "}
              <HexColorPicker color={`#${color}`} onChange={(e) => handleSetColor(e)} />
            </Card>
          </Zoom>
        </Grid>
      </Grid>
    </ClickAwayListener>
  );
}

InputColorPicker.propTypes = {
  labelInpunt: PropTypes.string.isRequired,
  nameField: PropTypes.string.isRequired,
  initialColor: PropTypes.string.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputColorPicker;
