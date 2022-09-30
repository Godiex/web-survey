import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DialogForm from "../components/DialogForm";
import AcordeonForm from "../components/AcordeonForm";
import httpRequest from "../../../../services/httpRequest";
import AlertConfirm from "../../../../components/AlertConfirm";

function ListForm() {
  const alert = useAlert();
  const { idPoll } = useParams();
  const [open, setOpen] = useState(false);
  const [typeForm, setTypeForm] = useState("");
  const [hiddenBool, setHidden] = useState(false);
  const [listForm, setListForm] = useState([]);
  const [dataEdit, setDataEdit] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [codeForm, setCodeForm] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [idFormDelete, setIdFormDelete] = useState({ id: "", index: "" });
  const [allListQuestion, setAllListQuestion] = React.useState([]);

  const handleClickOpen = () => {
    const numberRandom = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    const codeRandom = `FORM${numberRandom}`;
    setCodeForm(codeRandom);
    setTypeForm("registro");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    setHidden(!hiddenBool);
  };

  const getListForm = useCallback(async () => {
    const response = await httpRequest.getEntries(`surveys/${idPoll}/forms`);
    setListForm(response);
  }, []);

  const getAllListQuestion = useCallback(async () => {
    try {
      const responseQtestion = await httpRequest.getEntries(`questions/${idPoll}/questions`);
      setAllListQuestion(responseQtestion);
    } catch (error) {
      alert.error("Error al obtener preguntas", { position: "top right" });
    }
  }, []);

  useEffect(() => {
    if (idPoll) {
      getListForm();
      getAllListQuestion();
    }
  }, [idPoll]);

  const handleSaveForm = async (values) => {
    const data = {
      id: typeForm === "registro" ? "" : dataEdit.id,
      code: codeForm,
      name: values.name,
      hidden: hiddenBool,
      order: typeForm === "registro" ? listForm.length + 1 : dataEdit.order,
      surveyId: idPoll,
    };
    if (typeForm === "registro") {
      try {
        await httpRequest.create(`forms/create`, data);
        setHidden(false);
        const numberRandomCreate = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        const codeRandomCreate = `FORM${numberRandomCreate}`;
        setCodeForm(codeRandomCreate);
        alert.show("Formulario creado", { position: "top right" });
        getListForm();
      } catch (e) {
        alert.error("Error al crear el formulario", { position: "top right" });
      }
    } else {
      try {
        await httpRequest.update(`forms/${dataEdit.id}/update`, "", data);
        alert.show("Formulario actualizado", { position: "top right" });
        getListForm();
        handleClose();
      } catch (e) {
        alert.error("Error al editar el formulario", { position: "top right" });
      }
    }
  };

  const handleCloseDialogAlert = () => setOpenAlert(false);

  const handleClickAlert = (idForm, indexOrder, e) => {
    e.stopPropagation();
    setIdFormDelete({ id: idForm, index: indexOrder });
    setOpenAlert(true);
  };

  const orderListForm = (indexFormOrder, idFormOrder) => {
    const lisFormReOrder = [...listForm];
    const newList = [];
    const listFilterIndex = lisFormReOrder.filter((form) => form.id !== idFormOrder);
    for (let i = 0; i < listFilterIndex.length; i += 1) {
      if (i >= indexFormOrder) {
        listFilterIndex[i].order -= 1;
      }
    }

    for (let x = 0; x < listFilterIndex.length; x += 1) {
      newList.push({ id: listFilterIndex[x].id, newOrder: listFilterIndex[x].order });
    }
    return newList;
  };

  const handleDeleteForm = async () => {
    try {
      await httpRequest.remove(`forms/${idFormDelete.id}/delete`, "");
      const resultListOrder = orderListForm(idFormDelete.index, idFormDelete.id);
      const data = {
        newFormsOrders: resultListOrder,
      };
      try {
        await httpRequest.create(`forms/change-orders`, data);
        await getListForm();
        handleCloseDialogAlert();
      } catch (error) {
        alert.error("Error al cambiar la posición", { position: "top right" });
      }
      alert.show("Formulario eliminado", { position: "top right" });
    } catch (error) {
      alert.error("Error al eliminar el formulario", { position: "top right" });
    }
  };

  const handleEditForm = (idEditForm, e) => {
    e.stopPropagation();
    const filterForm = listForm.find((form) => form.id === idEditForm);
    setDataEdit(filterForm);
    setCodeForm(filterForm.code);
    setHidden(filterForm.hidden);
    setTypeForm("editar");
    setOpen(true);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sx={{ textAlign: "right" }}>
            <MDButton onClick={handleClickOpen} variant="gradient" color="info">
              Agregar formulario
            </MDButton>
          </Grid>
          <Grid item xs={12} md={12}>
            {listForm.length > 0 &&
              listForm.map((form, index) => (
                <AcordeonForm
                  id={form.id}
                  name={form.name}
                  handleClickAlert={handleClickAlert}
                  handleEditForm={handleEditForm}
                  listForm={listForm}
                  code={form.code}
                  setExpanded={setExpanded}
                  expanded={expanded}
                  order={form.order}
                  index={index}
                  getListForm={getListForm}
                  allListQuestion={allListQuestion}
                />
              ))}
          </Grid>
        </Grid>
      </DashboardLayout>
      <DialogForm
        open={open}
        handleClose={handleClose}
        typeForm={typeForm}
        handleChange={handleChange}
        hidden={hiddenBool}
        handleSaveForm={handleSaveForm}
        dataEdit={dataEdit}
        codeForm={codeForm}
      />
      <AlertConfirm
        open={openAlert}
        title="Advertencia"
        context="¿Seguro que desea eliminar el formulario?"
        onClose={handleCloseDialogAlert}
        onAccept={handleDeleteForm}
      />
    </>
  );
}

export default ListForm;
