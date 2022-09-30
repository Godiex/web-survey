// @mui material components
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
// Settings page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import BasicInfo from "../../../../components/BasicInfo";
import Header from "../../../../components/Header";
import ChangePassword from "../../../../components/ChangePassword";
import AppCustomization from "./components/AppCustomization";
import { getProfile } from "../../../../store/profile/actions";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...other}
    >
      {value === index && <MDBox sx={{ p: 3 }}>{children}</MDBox>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

function Settings() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const infoUser = useSelector(({ profile }) => profile.data);
  const handleChange = (newValue) => setValue(newValue);
  useEffect(() => {
    (async () => {
      await dispatch(getProfile());
    })();
  }, [dispatch]);
  return (
    <BaseLayout handleValue={handleChange} stickyNavbar>
      <TabPanel value={value} index={0}>
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MDBox mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Header infoUser={infoUser} />
                  </Grid>
                  <Grid item xs={12}>
                    <BasicInfo infoUser={infoUser} />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MDBox mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Header infoUser={infoUser} />
                  </Grid>
                  <Grid item xs={12}>
                    <ChangePassword />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={12}>
              <MDBox mb={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <AppCustomization />
                  </Grid>
                </Grid>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </TabPanel>
    </BaseLayout>
  );
}

export default Settings;
