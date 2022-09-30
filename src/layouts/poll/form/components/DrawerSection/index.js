import React from "react";
import PropTypes from "prop-types";
import DrawerConfig from "examples/DrawerConfig";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { Field, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MDButton from "components/MDButton";

const validationSchema = Yup.object().shape({
  code: Yup.string().required("Campo requerido"),
  name: Yup.string().required("Campo requerido"),
  description: Yup.string().required("Campo requerido"),
  html: Yup.string().required("Campo requerido"),
});

function DrawerSection({
  open,
  handleClose,
  typeForm,
  handleHtmlSwith,
  htmlSwitch,
  handleHiddenSection,
  hiddenSection,
  handleSaveSection,
  dataEdit,
}) {
  console.log(dataEdit, "hola");
  console.log(typeForm, "typeForm");
  return (
    <>
      <DrawerConfig variant="permanent" open={open}>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
          pt={4}
          pb={0.5}
          px={3}
        >
          <MDBox>
            <MDTypography variant="h5">
              {typeForm === "registro" ? "Nueva Sección" : "Editar Sección"}
            </MDTypography>
          </MDBox>
          <Icon
            sx={({ typography: { size }, palette: { dark } }) => ({
              fontSize: `${size.lg} !important`,
              color: dark.main,
              stroke: "currentColor",
              strokeWidth: "2px",
              cursor: "pointer",
              transform: "translateY(5px)",
            })}
            onClick={handleClose}
          >
            close
          </Icon>
        </MDBox>
        <Divider />
        <MDBox pt={0.5} pb={3} px={3}>
          <Formik
            initialValues={{
              code: typeForm === "registro" ? "" : dataEdit.code,
              name: typeForm === "registro" ? "" : dataEdit.name,
              description: typeForm === "registro" ? "" : dataEdit.description,
              html: typeForm === "registro" ? "" : dataEdit.html,
              order: typeForm === "registro" ? "" : dataEdit.order,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSaveSection(values);
              resetForm({
                code: "",
                name: "",
                description: "",
                html: "",
                order: "",
              });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <Field
                        name="code"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Código"
                        fullWidth
                        error={errors.code && touched.code}
                        helperText={touched.code && errors.code}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <Field
                        name="name"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Nombre"
                        fullWidth
                        error={errors.name && touched.name}
                        helperText={touched.name && errors.name}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <Field
                        name="description"
                        type="text"
                        as={MDInput}
                        variant="standard"
                        label="Descripción"
                        fullWidth
                        error={errors.description && touched.description}
                        helperText={touched.description && errors.description}
                        inputProps={{ autoComplete: "off" }}
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Usar HTML</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={htmlSwitch}
                            onChange={handleHtmlSwith}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  {htmlSwitch ? (
                    <Grid item xs={12} md={12} lg={12}>
                      <MDBox>
                        <Field
                          name="html"
                          type="text"
                          as={MDInput}
                          variant="standard"
                          multiline
                          rows={5}
                          label="HTML"
                          fullWidth
                          error={errors.html && touched.html}
                          helperText={touched.html && errors.html}
                          inputProps={{ autoComplete: "off" }}
                        />
                      </MDBox>
                    </Grid>
                  ) : null}
                  <Grid item xs={12} md={12} lg={12}>
                    <MDBox>
                      <div style={{ fontSize: "13px" }}>Ver</div>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            inputProps={{ "aria-label": "controlled" }}
                            checked={hiddenSection}
                            onChange={handleHiddenSection}
                          />
                        }
                        label=""
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={12}>
                    <MDButton type="submit" variant="gradient" color="info">
                      Agregar
                    </MDButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </MDBox>
      </DrawerConfig>
    </>
  );
}

DrawerSection.defaultProps = {
  open: false,
  htmlSwitch: false,
  hiddenSection: false,
  dataEdit: PropTypes.shape({
    code: "",
    description: "",
    hidden: false,
    html: "",
    name: "",
    order: 0,
    useHtml: false,
  }),
};

DrawerSection.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  typeForm: PropTypes.string.isRequired,
  handleHtmlSwith: PropTypes.func.isRequired,
  htmlSwitch: false,
  hiddenSection: PropTypes.bool,
  handleHiddenSection: PropTypes.func.isRequired,
  handleSaveSection: PropTypes.func.isRequired,
  dataEdit: PropTypes.shape({
    code: PropTypes.string,
    description: PropTypes.string,
    hidden: PropTypes.bool,
    html: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    useHtml: PropTypes.bool,
  }),
};

export default DrawerSection;
