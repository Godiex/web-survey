// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";
import FileUploadPage from "./FileUploadPage";
import { updateImageProfile } from "../../store/profile/actions";

function Header({ infoUser }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [savedData, setSavedData] = useState({});
  const [loading, setLoading] = useState(false);

  const alert = useAlert();
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      // eslint-disable-next-line no-console
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
    // eslint-disable-next-line no-param-reassign
    delete infoUser.imageUrl;
    // eslint-disable-next-line no-param-reassign
    delete infoUser.userName;
    // eslint-disable-next-line react/prop-types
    const { id } = infoUser;
    const extension = file.type.split("/")[1];
    const newData = {
      id,
      ...infoUser,
      image: {
        name: `${id}.${extension}`,
        extension,
        data: "",
      },
    };
    setSavedData(newData);
  };

  const handleSubmit = async () => {
    try {
      const request = { ...savedData, image: { ...savedData.image, data: selectedFile } };
      await dispatch(updateImageProfile(request));
      alert.success("Actualizado correctamente");
    } catch (e) {
      alert.error("Ocurrió un error al actualizar la información");
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedFile !== null) {
        try {
          setLoading(true);
          await handleSubmit();
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      }
    })();
  }, [selectedFile]);

  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            {infoUser.imageUrl === "" ? (
              <MDAvatar alt="profile-image" size="xl" shadow="sm">
                <CircularProgress size="30px" color="success" />
              </MDAvatar>
            ) : (
              <MDAvatar
                src={loading === false ? infoUser.imageUrl : null}
                alt="profile-image"
                size="xl"
                shadow="sm"
              >
                {loading === true && <CircularProgress size="30px" color="success" />}
              </MDAvatar>
            )}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {infoUser?.firstName} {infoUser?.lastName}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {infoUser.userName}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDBox ml={1}>
                <FileUploadPage changeHandler={changeHandler} />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

Header.propTypes = {
  infoUser: PropTypes.shape({
    identificationType: PropTypes.string,
    firstName: PropTypes.string,
    userName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    imageUrl: PropTypes.string,
    email: PropTypes.string,
    nuip: PropTypes.string,
    address: PropTypes.string,
    area: PropTypes.string,
    position: PropTypes.string,
  }).isRequired,
};

export default Header;
