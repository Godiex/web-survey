// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
// @mui material components
import Checkbox from "@mui/material/Checkbox";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useDispatch } from "react-redux";
import { selectOrderService } from "../../../store/solicitudes/actions";

function IdCell({ id, checked }) {
  const dispatch = useDispatch();
  const handleClick = (serviceOrder, action) => {
    dispatch(selectOrderService({ id: serviceOrder }, action));
  };
  return (
    <MDBox display="flex" alignItems="center">
      {/* eslint-disable-next-line no-console */}
      <Checkbox defaultChecked={checked} onChange={(e) => handleClick(id, e.target.checked)} />
      <MDBox ml={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {id}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Setting default value for the props of IdCell
IdCell.defaultProps = {
  checked: false,
};

// Typechecking props for the IdCell
IdCell.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default IdCell;
