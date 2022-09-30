import React from "react";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";

function TitleCardCustomer({ children }) {
  return (
    <MDBox bgColor="#fafafa" mb={1} p={2} sx={{ height: "10%", borderRadius: "5px 5px 0px 0px" }}>
      {children}
    </MDBox>
  );
}
TitleCardCustomer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleCardCustomer;
