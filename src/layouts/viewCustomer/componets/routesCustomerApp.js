export const menuOptions = [
  {
    name: "Solicitud",
    key: "request",
    route: "/app-cliente/request-service",
    icon: "",
  },
  {
    name: "Pagos",
    key: "payment",
    route: "/app-cliente/payments",
    icon: "",
  },
  {
    name: "Certificados",
    key: "certificate",
    route: "/app-cliente/certificates",
    icon: "",
  },
];

export const profileOptions = [
  {
    name: "Editar Perfil",
    key: "profile",
    route: "../app-cliente/account",
    icon: "",
    type: "menu-item",
  },
  {
    name: "Cambiar contraseña",
    key: "forgotPassword",
    route: "../app-cliente/change-password",
    icon: "",
    type: "menu-item",
  },
  {
    name: "Divider 1",
    key: "divider",
    type: "Divider",
  },
  {
    name: "Cerrar Sesión",
    key: "logout",
    icon: "",
    route: "/",
    type: "menu-item",
  },
];
