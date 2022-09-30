import React from "react";
import MDBox from "components/MDBox";
import PropTypes from "prop-types";

function FooterCardCustomer({ children }) {
  return (
    <MDBox bgColor="#fafafa" p={2} sx={{ borderRadius: "0px 0px 5px 5px" }}>
      {children}
    </MDBox>
  );
}
FooterCardCustomer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FooterCardCustomer;
