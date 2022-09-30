import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";

const Activate = ({ checked }) => <Switch checked={checked} />;

Activate.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default Activate;
