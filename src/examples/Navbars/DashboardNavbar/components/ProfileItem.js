import { forwardRef } from "react";
// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// custom styles for the NotificationItem
import menuItem from "examples/Items/NotificationItem/styles";
import PropTypes from "prop-types";
import MDTypography from "../../../../components/MDTypography";

const ProfileItem = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </MDTypography>
    </MDBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
ProfileItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ProfileItem;
