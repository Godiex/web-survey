import StatusCell from "../../components/StatusCell/StatusCell";
import CustomerCell from "./components/CustomerCell";
import MDBadge from "../../components/MDBadge";
import { formatDate } from "../../utils/utils";

function renderColumnProfile(customer, valueColumn) {
  const [name, data] = valueColumn;
  return (
    <CustomerCell
      image={data.image}
      color={data.color || "dark"}
      name={customer ? customer.name : name}
    />
  );
}
function renderIdentification(customer, valueColumn) {
  return customer ? customer.nIdentification : valueColumn;
}

const dataCulumns = [
  { field: "id", headerName: "id", width: 220, hide: true },
  {
    field: "state",
    headerName: "Estado Solicitud",
    width: 170, // eslint-disable-next-line react/prop-types
    renderCell: ({ value }) => {
      let status;
      if (value === "Closed") {
        status = <StatusCell icon="done" color="success" status="Cerrada" />;
      } else if (value === "Pending") {
        status = <StatusCell icon="notifications" color="warning" status="Pendiente" />;
      } else {
        status = <StatusCell icon="replay" color="dark" status="En Proceso" />;
      }
      return status;
    },
  },
  {
    field: "nameService",
    type: "string",
    fieldRef: "service.nameService",
    headerName: "Servicio Solicitado",
    width: 220,
  },
  {
    field: "name",
    headerName: "Cliente",
    type: "string",
    fieldRef: ["name", "customer.name"],
    width: 170,
    // eslint-disable-next-line react/prop-types,no-shadow
    renderCell: ({ row: { customer }, value }) => renderColumnProfile(customer, value),
  },
  {
    field: "nIdentification",
    headerName: "Identificación",
    type: "string",
    fieldRef: "nIdentification",
    width: 150,
    renderCell: ({ row: { customer }, value }) => renderIdentification(customer, value),
  },
  {
    field: "customer",
    headerName: "Tipo Cliente",
    width: 160,
    // eslint-disable-next-line react/prop-types
    renderCell: ({ value }) => (
      <MDBadge
        variant="gradient"
        color={value ? "success" : "info"}
        size="xs"
        badgeContent={value ? "Registrado" : "Nuevo"}
        container
      />
    ),
  },
];

export default {
  columns: dataCulumns,
  columns2: [...dataCulumns],
  ordersColumns: [
    { field: "id", headerName: "id", width: 220, hide: true },
    {
      field: "orderNumber",
      headerName: "#",
      width: 50,
    },
    {
      field: "orderStatus",
      type: "custom",
      headerName: "Estado",
      fieldRef: "orderStatus",
      filterOptions: [
        {
          name: "Cancelada",
          value: "Cancelled",
        },
        {
          name: "Asignado",
          value: "Assigned",
        },
        {
          name: "Pendiente de pago",
          value: "PendingPayment",
        },
        {
          name: "Finalizada",
          value: "Finished",
        },
        {
          name: "Certificada",
          value: "done_all",
        },
        {
          name: "En Proceso",
          value: "InProgress",
        },
      ],
      width: 170, // eslint-disable-next-line react/prop-types
      renderCell: ({ value }) => {
        let status;
        if (value === "Cancelled") {
          status = <StatusCell icon="close" color="error" status="Cancelada" />;
        } else if (value === "Assigned") {
          status = <StatusCell icon="assignment_turned_in" color="info" status="Asignado" />;
        } else if (value === "PendingPayment") {
          status = <StatusCell icon="pending_actions" color="warning" status="Pendiente de pago" />;
        } else if (value === "Finished") {
          status = <StatusCell icon="done" color="success" status="Finalizada" />;
        } else if (value === "Certified") {
          status = <StatusCell icon="done_all" color="success" status="Certificada" />;
        } else if (value === "InProgress") {
          status = <StatusCell icon="rotate_left" color="dark" status="En Proceso" />;
        } else if (value === "PendingAssignment") {
          status = (
            <StatusCell icon="pending_actions" color="warning" status="Pendiente por asignar" />
          );
        } else {
          status = <StatusCell icon="rotate_left" color="dark" status="En Proceso" />;
        }
        return status;
      },
    },
    {
      field: "customerName",
      headerName: "Cliente",
      type: "string",
      fieldRef: "customer.name",
      width: 200, // eslint-disable-next-line react/prop-types,no-shadow
      renderCell: ({ value: [name, data] }) => (
        <CustomerCell image={data.image} color={data.color || "dark"} name={name} />
      ),
    },
    {
      field: "serviceName",
      headerName: "Servicio",
      type: "string",
      fieldRef: "service.nameService",
      width: 170, // eslint-disable-next-line react/prop-types,no-shadow
      renderCell: ({ value: [name, data] }) => (
        <CustomerCell image={data.image} color={data.color || "dark"} name={name} />
      ),
    },
    {
      field: "userName",
      headerName: "Empleado asignado",
      type: "string",
      fieldRef: "userName",
      width: 190,
    },
    {
      field: "visitDate",
      headerName: "Fecha de visita",
      type: "dateTime",
      fieldRef: "visitDate",
      width: 190,
      renderCell: ({ value }) => (!value ? "Sin fecha asignada" : formatDate(value)),
    },
  ],
  rows: [],
};
