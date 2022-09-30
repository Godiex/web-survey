/**
=========================================================
* Material Dashboard 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";

// Custom styles for ComplexProjectCard
function CardRoleUser({ color, image, title, description, id, members, enabled, handleChange }) {
  const renderMembers = members.map((member, key) => {
    const memberKey = `member-${key}`;

    return (
      <MDAvatar
        key={memberKey}
        src={member}
        alt="member profile"
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    );
  });

  return (
    <Card>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={3}>
            <MDAvatar
              src={image}
              alt={title}
              size="xl"
              variant="rounded"
              bgColor={color}
              sx={{
                p: 1,
                mt: -6,
                borderRadius: ({ borders: { borderRadius } }) => borderRadius.xl,
              }}
            />
          </Grid>
          <Grid item xs={7}>
            <MDBox ml={2} mt={-2} lineHeight={0}>
              <Tooltip title={title}>
                <MDTypography
                  noWrap="true"
                  variant="h6"
                  textTransform="capitalize"
                  fontWeight="medium"
                >
                  {title}
                </MDTypography>
              </Tooltip>
              {members.length > -1 ? <MDBox display="flex">{renderMembers}</MDBox> : null}
            </MDBox>
          </Grid>
          <Checkbox
            disabled={title === "Basico"}
            checked={enabled}
            onChange={(event) => handleChange(event, id)}
            name={id}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Grid>
        <MDBox my={2} lineHeight={1}>
          <Grid container>
            <Tooltip title={description}>
              <MDTypography noWrap="true" variant="button" fontWeight="light" color="text">
                {description}
              </MDTypography>
            </Tooltip>
          </Grid>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexProjectCard
CardRoleUser.defaultProps = {
  color: "dark",
  members: [],
  enabled: false,
};

// Typechecking props for the ProfileInfoCard
CardRoleUser.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  members: PropTypes.arrayOf(PropTypes.string),
  enabled: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default CardRoleUser;
