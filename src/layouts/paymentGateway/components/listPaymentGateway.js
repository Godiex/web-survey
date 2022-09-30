import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { useSelector, useDispatch } from "react-redux";
import TableMui from "../../../components/TableMui/TableMui";
import {
  getPaymentGateway,
  changeStatePaymentGateway,
} from "../../../store/paymentGateway/actions";
import AlertConfirm from "../../../components/AlertConfirm";

function ListPaymentGateway() {
  const listPaymentGateway = useSelector(({ paymentGateway }) => paymentGateway.data);
  const [isOpenAlertChangeStatus, setIsOpenAlertChangeStatus] = useState(false);
  const [currentTarget, setCurrentTarget] = useState({});

  const dispatch = useDispatch();
  const handleAlertStatus = (target) => {
    setCurrentTarget(target);
    setIsOpenAlertChangeStatus(!isOpenAlertChangeStatus);
  };
  const dispatchGetpaymentGateway = async () => {
    await dispatch(getPaymentGateway());
  };
  const handleChangeStatus = async (id) => {
    await dispatch(changeStatePaymentGateway(id));
    await dispatchGetpaymentGateway();
    setIsOpenAlertChangeStatus(!isOpenAlertChangeStatus);
  };
  useEffect(() => {
    dispatchGetpaymentGateway();
  }, []);

  const columns = [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "code",
      headerName: "Código",
      width: 160,
      type: "string",
    },
    {
      field: "name",
      headerName: "Nombre de pasarela",
      width: 550,
      type: "string",
    },
    {
      field: "state",
      headerName: "Estado",
      width: 120,
      type: "boolean",
      filterOptions: [
        { name: "Activo", value: true },
        { name: "Inactivo", value: false },
      ],
      renderCell: ({ row }) => {
        const template = (
          <>
            {" "}
            {row.statusPaymentGateway ? "Activo" : "Inactivo"}
            <Switch
              checked={row.statusPaymentGateway}
              onChange={() => handleAlertStatus(row)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </>
        );
        return template;
      },
    },
  ];

  return (
    <>
      <TableMui
        paginationMode="server"
        columns={columns}
        rows={listPaymentGateway}
        disableSelectionOnClick
        checkboxSelection={false}
        isFilterActive={false}
        autoHeight
      />
      <AlertConfirm
        open={isOpenAlertChangeStatus}
        title="! Atención ¡"
        context={`¿Seguro de que desea ${
          currentTarget.statusPaymentGateway ? "desactivar" : "activar"
        } esta pasarela?`}
        onClose={() => setIsOpenAlertChangeStatus(!isOpenAlertChangeStatus)}
        onAccept={() => handleChangeStatus(currentTarget.id)}
      />
    </>
  );
}

export default ListPaymentGateway;
