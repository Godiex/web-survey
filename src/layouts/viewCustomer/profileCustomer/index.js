import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Header from "../../../components/Header";
import BasicInfo from "../../../components/BasicInfo";
import LayoutViewCustomer from "../componets/loyoutViewCustomer";
import { getProfile } from "../../../store/profile/actions";

function ProfileCustomer() {
  const dispatch = useDispatch();
  const infoUser = useSelector(({ profile }) => profile.data);

  useEffect(() => {
    (async () => {
      await dispatch(getProfile());
    })();
  }, [dispatch]);

  return (
    <LayoutViewCustomer>
      {" "}
      <MDBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <MDBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header infoUser={infoUser} />
                </Grid>
                <Grid item xs={12}>
                  <BasicInfo infoUser={infoUser} typeUser="Customer" />
                </Grid>
              </Grid>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </LayoutViewCustomer>
  );
}

export default ProfileCustomer;
