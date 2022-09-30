import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Card from "@mui/material/Card";
import { CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDButtonCustomByTenant from "components/MDButton/MDButtonCustomByTenant";
import MDAvatar from "components/MDAvatar";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FileUploadPage from "../../../../../../components/Header/FileUploadPage";
import AlertConfirm from "../../../../../../components/AlertConfirm";
import InputColorPicker from "./InputColorPicker";
import { changeAppSetting } from "../../../../../../store/tenant/actions";

function AppCustomization() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { primaryColor } = useSelector(({ company }) => company.tenantConfig);
  const appConfic = JSON.parse(sessionStorage.getItem("appConfic"));
  const currentTenant = localStorage.getItem("idTenant");
  const [loading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(appConfic ? appConfic.logoUrl : "");
  const initialData = {
    primaryColor: appConfic ? appConfic.primaryColor.replace("#", "") : "b32aa9",
    secondaryColor: appConfic ? appConfic.secondaryColor.replace("#", "") : "b32aa9",
    tertiaryColor: appConfic ? appConfic.tertiaryColor.replace("#", "") : "b32aa9",
    image: {
      name: "",
      extension: "",
      data: "",
    },
  };
  const [data, setData] = useState(initialData);

  const validationSchema = Yup.object().shape({
    primaryColor: Yup.string().required("Campo requerido"),
    secondaryColor: Yup.string().required("Campo requerido"),
    tertiaryColor: Yup.string().required("Campo requerido"),
  });

  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
    reader.readAsDataURL(file);
    // // eslint-disable-next-line react/prop-types
    // const { id } = infoUser;
    const extension = file.type.split("/")[1];
    const newData = {
      ...data,
      image: {
        name: `${currentTenant}_icon_app.${extension}`,
        extension,
        data: "",
      },
    };
    setData(newData);
  };

  const handleOpenAlertConfirm = (values) => {
    const newData = {
      ...data,
      primaryColor: `#${values.primaryColor}`,
      secondaryColor: `#${values.secondaryColor}`,
      tertiaryColor: `#${values.tertiaryColor}`,
    };
    setData(newData);
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    const dataImage = {
      ...data.image,
      data: selectedFile,
    };
    const newData = {
      ...data,
      tenantId: currentTenant,
      deleteCurrentImage: true,
      image: appConfic.logoUrl === selectedFile ? null : dataImage,
    };
    const response = await dispatch(changeAppSetting(currentTenant, newData));
    if (response)
      alert.success("Se guardaron los cambios correctamente", { position: "top right" });
    else alert.error("Ocurrio un error a guardar los cambios", { position: "top right" });
    setIsOpen(false);
  };

  return (
    <Card id="change-password">
      <MDBox p={3}>
        <MDTypography variant="h5">Configuración de Colores y Logo</MDTypography>
      </MDBox>
      <Formik
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={handleOpenAlertConfirm}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <MDBox pb={3} px={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={2} display="flex" alignItems="center" justifyContent="center">
                      <MDAvatar src={selectedFile} alt="profile-image" size="lg" shadow="sm">
                        {loading === true && <CircularProgress size="30px" color="success" />}
                      </MDAvatar>
                    </Grid>
                    <Grid item xs={10}>
                      <FileUploadPage changeHandler={handleChangeImage} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <InputColorPicker
                    labelInpunt="Color primario"
                    nameField="primaryColor"
                    initialColor={initialData.primaryColor}
                    errors={errors.primaryColor}
                    touched={touched.primaryColor}
                    onChange={(e, value) => {
                      setFieldValue(
                        "primaryColor",
                        value !== null ? value : initialData.primaryColor
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputColorPicker
                    labelInpunt="Color secundario"
                    nameField="secondaryColor"
                    initialColor={initialData.secondaryColor}
                    errors={errors.secondaryColor}
                    touched={touched.secondaryColor}
                    onChange={(e, value) => {
                      setFieldValue(
                        "secondaryColor",
                        value !== null ? value : initialData.secondaryColor
                      );
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputColorPicker
                    labelInpunt="Color Terciario"
                    nameField="tertiaryColor"
                    initialColor={initialData.tertiaryColor}
                    errors={errors.tertiaryColor}
                    touched={touched.tertiaryColor}
                    onChange={(e, value) => {
                      setFieldValue(
                        "tertiaryColor",
                        value !== null ? value : initialData.tertiaryColor
                      );
                    }}
                  />
                </Grid>
              </Grid>
              <MDBox
                mt={6}
                display="flex"
                justifyContent="space-between"
                alignItems="flex-end"
                flexWrap="wrap"
              >
                <MDBox ml="auto">
                  <MDButton
                    disabled={loading}
                    type="submit"
                    variant="gradient"
                    color="dark"
                    size="small"
                    sx={() => MDButtonCustomByTenant(primaryColor)}
                  >
                    Actualizar Configuracion
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Form>
        )}
      </Formik>
      <AlertConfirm
        open={isOpen}
        title="! Atención ¡"
        context="¿Desea guardar cambios?"
        onClose={() => setIsOpen(!isOpen)}
        onAccept={() => handleSubmit()}
      />
    </Card>
  );
}

export default AppCustomization;
