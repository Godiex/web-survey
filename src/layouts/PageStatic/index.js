import React, { useRef } from "react";
import Grid from "@mui/material/Grid";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import { useAlert } from "react-alert";
import IconButton from "@mui/material/IconButton";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import emailjs from "@emailjs/browser";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Header from "./components/Header";
import SectionOne from "../../image/sectionOne.png";
import SectionTwo from "../../image/SectionTwo.png";
import Notification from "../../image/notification.png";
import payment from "../../image/payment.png";
import GooglePlay from "../../image/GooglePlay.png";
import AppStore from "../../image/AppStore.png";
import { keyPressF } from "../../utils/utils";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campo requerido"),
  phone: Yup.string().required("Campo requerido"),
  email: Yup.string().required("Campo requerido"),
  message: Yup.string().required("Campo requerido"),
});

function PageStatic() {
  const alert = useAlert();
  const elementRef = React.useRef(null);
  const divContactRef = React.useRef(null);
  const form = useRef();

  const toSectionOne = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const toSectionTwo = () => {
    const element = elementRef.current.getBoundingClientRect().top + window.scrollY;
    if (!elementRef) {
      return false;
    }
    return window.scroll({ top: element, behavior: "smooth" });
  };

  const toSectionThree = () => {
    const elementThree = divContactRef.current.getBoundingClientRect().top + window.scrollY;
    if (!divContactRef) {
      return false;
    }
    return window.scroll({ top: elementThree, behavior: "smooth" });
  };

  const handleCreateEmail = (values) => {
    emailjs.send("service_fsnlfok", "template_i6jhl59", values, "YoYslmRlQUFX32F5q").then(
      (result) => {
        alert.show("Mensaje Enviado", { position: "bottom right" });
        // eslint-disable-next-line no-console
        console.log(result);
      },
      (error) => {
        alert.error("Error al enviar el mensaje", { position: "bottom right" });
        // eslint-disable-next-line no-console
        console.log(error.text);
      }
    );
  };

  return (
    <>
      <Header
        toSectionOne={toSectionOne}
        toSectionTwo={toSectionTwo}
        toSectionThree={toSectionThree}
      />
      <PageLayout background="white">
        <Grid
          container
          spacing={1}
          height="750px"
          justifyContent="flex-end"
          style={{
            backgroundImage: `url(${SectionOne})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>hola</div>
        </Grid>
        <Grid
          container
          spacing={1}
          height="1300px"
          style={{
            backgroundImage: `url(${SectionTwo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          ref={elementRef}
        >
          <Grid item xs={12} style={{ marginTop: "10px" }}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              direction="row"
              style={{ backgroundColor: "#FF7006" }}
            >
              <Grid item xs={4}>
                <Typography variant="h3" align="center" color="#fff" gutterBottom component="div">
                  ??Qui??nes
                </Typography>
                <Typography
                  variant="h3"
                  align="center"
                  color="#fff"
                  gutterBottom
                  component="div"
                  style={{ marginTop: "-20px" }}
                >
                  somos?
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Grid container spacing={3} justifyContent="center" style={{ padding: "20px" }}>
                  <Grid item xs={6} style={{ backgroundColor: "#3C3C3B", marginTop: "20px" }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                    >
                      AidCol nace de la necesidad de las empresas p??blicas y privadas, de controlar
                      sus procesos de encuesta, inspecci??n y certificaci??n. La falta de herramientas
                      tecnol??gicas que agilicen la ejecuci??n de estos procesos y que adem??s brinde
                      seguridad y evite cualquier actividad fraudulenta, fue lo que nos impuls?? a
                      crear una soluci??n acorde a estos requerimientos. Nuestro trabajo arduo busca
                      brindar un servicio que cumpla con todos los est??ndares de calidad,
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ backgroundColor: "#3C3C3B", marginTop: "20px" }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                      paddingRight="20px"
                    >
                      dando como resultado un sistema innovador e integral, que ayudar?? a optimizar
                      y mejorar la calidad de vida de los empleados de las empresas. Con esto, se
                      maximizar?? el valor humano de los empleados de cada empresa, transformando
                      todos los esfuerzos en producci??n y eficiencia, lo que a su vez se traducir??
                      en un mejor manejo de los clientes y aumento de los mismos.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: "rgb(60 60 59 / 83%)", paddingBottom: "15px" }}
              spacing={2}
            >
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia component="img" height="400" image={payment} />
                  <CardContent>
                    <Typography
                      fontSize="15px"
                      variant="subtitle2"
                      gutterBottom
                      color="#212121"
                      align="justify"
                    >
                      Solicita y paga tus procesos de inspecci??n desde la comodidad de tu celular.
                      Podr??s descargar directamente tus certificaciones con AidNet.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia component="img" height="400" image={payment} />
                  <CardContent>
                    <Typography
                      fontSize="15px"
                      variant="subtitle2"
                      gutterBottom
                      color="#212121"
                      align="justify"
                    >
                      Organiza tus rutas y protocolos de inspecci??n, documentaci??n y sube el
                      registros necesario para realizar los procesos de forma oportuna, todo
                      conectado a la organizaci??n.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia component="img" height="400" image={Notification} />
                  <CardContent>
                    <Typography
                      fontSize="15px"
                      variant="subtitle2"
                      gutterBottom
                      color="#212121"
                      align="justify"
                    >
                      Administra tu equipo de trabajo, encuestas y solicita los registros visuales
                      necesarios para cada proceso, ayudando a que tu equipo de trabajo sea mucho
                      m??s eficaz en los procesos.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              align="center"
              fontSize="50px"
              color="#1B4E7C"
              gutterBottom
              component="div"
            >
              Desc??rganos
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              style={{ marginTop: "-30px" }}
              container
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.globalEDB.aidcol"
              >
                <MDBox
                  component="img"
                  src={GooglePlay}
                  borderRadius="lg"
                  shadow="md"
                  width="40%"
                  height="70%"
                />
              </IconButton>
            </Grid>
            <Typography
              align="right"
              variant="caption"
              display="block"
              gutterBottom
              style={{ marginRight: "150px" }}
            >
              Descarga para Android
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              style={{ marginTop: "-34px" }}
              container
              justifyContent="flex-start"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                target="_blank"
                href="https://play.google.com/store/apps/details?id=com.globalEDB.aidcol"
              >
                <MDBox
                  component="img"
                  src={AppStore}
                  borderRadius="lg"
                  shadow="md"
                  width="40%"
                  height="60%"
                />
              </IconButton>
            </Grid>
            <Typography
              style={{ marginLeft: "140px" }}
              variant="caption"
              display="block"
              gutterBottom
            >
              Descarga para IOS
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          height="800px"
          justifyContent="flex-end"
          style={{
            backgroundImage: `url(${SectionTwo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Grid item xs={12}>
            <Grid
              container
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: "#96BE1F" }}
            >
              <Grid item xs={6} style={{ padding: "10px" }}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  align="center"
                  color="#fff"
                  display="block"
                  gutterBottom
                  textAlign="justify"
                  style={{ backgroundColor: "#3C3C3B", padding: "15px" }}
                >
                  Somos una soluci??n multifac??tica e innovadora, trabajamos con las ??ltimas
                  tecnolog??as de desarrollo de software y ayudamos a optimizar la prestaci??n de
                  servicios de nuestros clientes, logrando as?? que sus procesos sean m??s productivos
                  y eficientes.
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" align="center" color="#fff" gutterBottom component="div">
                  Nuestra misi??n
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "-10px" }}>
            <Grid
              container
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: "#1B4E7C", padding: "10px" }}
            >
              <Grid item xs={6} style={{ padding: "10px" }}>
                <Typography variant="h3" align="center" color="#fff" gutterBottom component="div">
                  Nuestra visi??n
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  component="div"
                  align="center"
                  color="#fff"
                  display="block"
                  gutterBottom
                  textAlign="justify"
                  style={{ backgroundColor: "#3C3C3B", padding: "15px" }}
                >
                  Ser reconocidos a nivel nacional como una soluci??n innovadora que presta servicios
                  de calidad. Ser percibidos como aliados estrat??gicos de nuestros clientes y
                  generar valor a sus procesos de prestaci??n de servicios, convirti??ndonos as?? en la
                  opci??n n??mero uno de nuestros futuros clientes.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "-10px" }}>
            <Grid
              container
              alignContent="center"
              justifyContent="center"
              alignItems="center"
              style={{ backgroundColor: "#FF7006", padding: "10px" }}
            >
              <Grid item xs={8} style={{ padding: "10px" }}>
                <Grid container spacing={3} justifyContent="center" style={{ padding: "20px" }}>
                  <Grid item xs={6} style={{ backgroundColor: "#3C3C3B", marginTop: "20px" }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                    >
                      <strong>Compromiso:</strong> Caminar de la mano de nuestros clientes para que
                      cumplan a cabalidad con sus objetivos.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                    >
                      <strong>Comunidad:</strong> Brindar un sin n??mero de herramientas que ayudar??n
                      a evitar fraudes en los diferentes procesos y procedimientos, contribuyendo a
                      mejorar la prestaci??n de servicios con calidad y responsabilidad social.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                    >
                      <strong>Comunidad:</strong> Brindar un sin n??mero de herramientas que ayudar??n
                      a evitar fraudes en los diferentes procesos y procedimientos, contribuyendo a
                      mejorar la prestaci??n de servicios con calidad y responsabilidad social.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                    >
                      <strong>Innovaci??n:</strong> Nuestra soluci??n desde las tecnolog??as
                      vanguardistas impulsar?? a nuestros clientes a ser cada d??a m??s competitivos y
                      de esta forma incrementar su productividad.
                    </Typography>
                  </Grid>
                  <Grid item xs={6} style={{ backgroundColor: "#3C3C3B", marginTop: "20px" }}>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                      style={{ paddingRight: "20px" }}
                    >
                      <strong>Seguridad:</strong> Los empleados de la organizaci??n siempre contar??n
                      con todas las herramientas necesarias para desempe??ar sus actividades y as??
                      ofrecer excelentes servicios a nuestros clientes.
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      component="div"
                      align="center"
                      color="#fff"
                      display="block"
                      gutterBottom
                      textAlign="justify"
                      style={{ paddingRight: "20px" }}
                    >
                      <strong>Responsabilidad:</strong> Al proteger la informaci??n tanto de nuestros
                      clientes como de terceros, estaremos atentos a cualquier problem??tica que se
                      presente para darle soluci??n de forma inmediata.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h3" align="center" color="#fff" gutterBottom component="div">
                  Nuestros
                </Typography>
                <Typography
                  variant="h3"
                  align="center"
                  color="#fff"
                  gutterBottom
                  component="div"
                  style={{ marginTop: "-20px" }}
                >
                  valores
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          height="550px"
          justifyContent="center"
          style={{
            backgroundImage: `url(${SectionTwo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          ref={divContactRef}
        >
          <Grid item xs={12}>
            <Typography
              variant="h3"
              align="center"
              fontSize="50px"
              color="#1B4E7C"
              gutterBottom
              component="div"
            >
              Cont??ctanos
            </Typography>
          </Grid>
          <Grid item xs={10} style={{ marginTop: "-130px" }}>
            <Card style={{ backgroundColor: "#96BE1F" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <Formik
                      initialValues={{
                        name: "",
                        phone: "",
                        email: "",
                        message: "",
                      }}
                      onSubmit={(values, { resetForm }) => {
                        handleCreateEmail(values);
                        resetForm({
                          name: "",
                          phone: "",
                          email: "",
                          message: "",
                        });
                      }}
                      validationSchema={validationSchema}
                    >
                      {({ errors, touched }) => (
                        <Form ref={form}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography color="#3C3C3B" variant="body2" gutterBottom>
                                <strong>Cont??ctanos v??a Email.</strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                              <Grid item xs={12} md={12} lg={12}>
                                <MDBox
                                  mb={4}
                                  style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                                >
                                  <Field
                                    name="name"
                                    type="text"
                                    as={MDInput}
                                    variant="outlined"
                                    label="Nombre"
                                    fullWidth
                                    error={errors.name && touched.name}
                                    helperText={touched.name && errors.name}
                                    inputProps={{ autoComplete: "off" }}
                                  />
                                </MDBox>
                              </Grid>
                              <Grid item xs={12} md={12} lg={12}>
                                <MDBox
                                  mb={4}
                                  style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                                >
                                  <Field
                                    name="phone"
                                    type="text"
                                    as={MDInput}
                                    variant="outlined"
                                    label="Tel??fono"
                                    fullWidth
                                    onKeyPress={keyPressF}
                                    error={errors.phone && touched.phone}
                                    helperText={touched.phone && errors.phone}
                                    inputProps={{ autoComplete: "off" }}
                                  />
                                </MDBox>
                              </Grid>
                              <Grid item xs={12} md={12} lg={12}>
                                <MDBox
                                  mb={4}
                                  style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                                >
                                  <Field
                                    name="email"
                                    type="text"
                                    as={MDInput}
                                    variant="outlined"
                                    label="Correo Electr??nico"
                                    fullWidth
                                    error={errors.email && touched.email}
                                    helperText={touched.email && errors.email}
                                    inputProps={{ autoComplete: "off" }}
                                  />
                                </MDBox>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                              <MDBox
                                mb={4}
                                style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                              >
                                <Field
                                  name="message"
                                  type="text"
                                  as={MDInput}
                                  variant="outlined"
                                  multiline
                                  rows={9}
                                  label="Mensaje"
                                  fullWidth
                                  inputProps={{ autoComplete: "off" }}
                                  error={errors.message && touched.message}
                                  helperText={touched.message && errors.message}
                                />
                              </MDBox>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container justifyContent="flex-end">
                                <MDButton
                                  type="submit"
                                  variant="gradient"
                                  style={{ backgroundColor: "#1B4E7C", color: "#fff" }}
                                >
                                  Enviar
                                </MDButton>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}

export default PageStatic;
