// Material Dashboard 2 PRO React layouts
import SignInBasic from "layouts/authentication/sign-in/basic";
import SignInCover from "layouts/authentication/sign-in/cover";
import ResetPassword from "layouts/authentication/reset-password/cover";
import PasswordReset from "layouts/authentication/password-reset";
import SignInIllustration from "layouts/authentication/sign-in/illustration";
import Article from "@mui/icons-material/Article";
import ListRoles from "layouts/roles";
import ListUsers from "layouts/users/ListUsers";
import ListClients from "layouts/associatedClients/ListClients";
import ListPoll from "layouts/poll/ListPoll";
import ListForm from "layouts/poll/form/ListForm";
import ManageRoles from "layouts/users/ManageRoles";
import ManagePermisions from "layouts/roles/ManagePermisions";
// @mui icons
import Icon from "@mui/material/Icon";
// Images
import Settings from "./layouts/pages/account/settings";
// import Tenant from "./layouts/Tenant";
import Company2 from "./layouts/company/Company";
import Certificates from "./layouts/Certificates";
import ServiceSolicitude from "./layouts/order/ServiceSolicitude";
import Services from "./layouts/services";
import Order from "./layouts/order/Order";
import Dashboard from "./layouts/dashboards/Dashboard";
import DashBoardMap from "./layouts/dashboards/DashBoardMap";
import LandingPage from "./layouts/landing";
import PaymentGateway from "./layouts/paymentGateway";
import MyPaymentGateways from "./layouts/paymentCredentials";
import LayoutViewCustomer from "./layouts/viewCustomer/dashboard";
import PaymentsByCustomer from "./layouts/viewCustomer/paymentsByCustomer";
import ProfileCustomer from "./layouts/viewCustomer/profileCustomer";
import ChangePasswordCustomer from "./layouts/viewCustomer/ChangePasswordCustomer";
import CustomerCertificates from "./layouts/viewCustomer/customerCertificates";
import CustomerCreateRequestService from "./layouts/viewCustomer/customerCreateRequestService";
import PageStatic from "./layouts/PageStatic";
import PaymentsGenerated from "./layouts/payments";
import CertificatedGenerates from "./layouts/Certificates/CertificatedGenerates";
import ReportTest from "./layouts/reports/reporttest";
import ServiceOrderReport from "./layouts/reports/ServiceOrderReport";
import ManualPayments from "./layouts/payments/ManualPayments";
import PaymentsReport from "./layouts/reports/PaymentsReport";

const routes = [
  {
    name: "PageStatic",
    key: "PageStatic",
    auth: "default",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "PageStatic",
        key: "pageStatic",
        auth: "default",
        route: "/inicio",
        component: <PageStatic />,
      },
    ],
  },
  {
    name: "Lading",
    key: "lading",
    auth: "default",
    icon: <Icon fontSize="medium">content_paste</Icon>,
    collapse: [
      {
        name: "Landing page",
        key: "landing-page",
        auth: "default",
        route: "/landing-page",
        component: <LandingPage />,
      },
    ],
  },
  {
    type: "nav-item",
    name: "Dashboards",
    key: "dashboard",
    route: "/dashboard",
    auth: "Permissions.Dashboard.View",
    component: <Dashboard />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
  },
  {
    name: "map",
    key: "map",
    route: "/map",
    auth: "default",
    component: <DashBoardMap />,
    icon: <Icon fontSize="medium">dashboard</Icon>,
  },
  {
    name: "path-view-client",
    key: "pathViewClient",
    auth: "default",
    collapse: [
      {
        name: "dashboard-customer",
        key: "dashboardCustomer",
        icon: <Icon fontSize="medium">dashboard</Icon>,
        route: "/app-cliente/dashboard",
        auth: "default",
        component: <LayoutViewCustomer />,
      },
      {
        name: "Payments-customer",
        key: "PaymentsByCustomer",
        icon: <Icon fontSize="medium">dashboard</Icon>,
        route: "/app-cliente/payments",
        auth: "default",
        component: <PaymentsByCustomer />,
      },
      {
        name: "profile-customer",
        key: "profile-settings",
        route: "/app-cliente/account",
        auth: "default",
        icon: <Icon fontSize="medium">manage_accounts_icon </Icon>,
        component: <ProfileCustomer />,
      },
      {
        name: "change-password-customer",
        key: "change-password-customer",
        route: "/app-cliente/change-password",
        auth: "default",
        icon: <Icon fontSize="medium">manage_accounts_icon </Icon>,
        component: <ChangePasswordCustomer />,
      },
      {
        name: "certificate-customer",
        key: "certificate-customer",
        route: "/app-cliente/certificates",
        auth: "default",
        icon: <Icon fontSize="medium">manage_accounts_icon </Icon>,
        component: <CustomerCertificates />,
      },
      {
        name: "create-Request-Service-customer",
        key: "create-Request-Service-customer",
        route: "/app-cliente/request-service",
        auth: "default",
        icon: <Icon fontSize="medium">manage_accounts_icon </Icon>,
        component: <CustomerCreateRequestService />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Administración",
    key: "administracion",
    auth: "default",
    icon: <Icon fontSize="medium">miscellaneous_services_icon</Icon>,
    collapse: [
      {
        name: "Mis pasarelas",
        key: "mis-pasarelas-de-pago",
        auth: "Permissions.PaymentCredentials.View",
        route: "/mis-pasarelas-de-pago",
        component: <MyPaymentGateways />,
      },
      {
        name: "Pasarelas de pago",
        key: "pasarelas-de-pago",
        auth: "Permissions.PaymentGateway.View",
        route: "/pasarelas-de-pago",
        component: <PaymentGateway />,
      },
      {
        name: "Solicitudes",
        key: "solicitudes",
        auth: "Permissions.ServiceSolicitude.View",
        route: "/solicitudes",
        component: <ServiceSolicitude />,
      },
      {
        name: "Órdenes",
        key: "ordenes",
        route: "/ordenes",
        auth: "Permissions.ServiceOrder.Search",
        component: <Order />,
      },
      {
        name: "Servicios",
        key: "servicios",
        route: "/servicios",
        auth: "Permissions.Services.Search",
        component: <Services />,
      },
      {
        name: "Clientes Asociados",
        key: "clientes-asociados",
        route: "/clientes-asociados",
        auth: "Permissions.Customers.View",
        component: <ListClients />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestión de usuarios",
    key: "User-Management",
    auth: "Permissions.Users.View",
    icon: <Icon fontSize="medium">groups</Icon>,
    collapse: [
      {
        name: "Roles",
        key: "roles",
        route: "/roles",
        auth: "Permissions.Roles.View",
        component: <ListRoles />,
      },
      {
        name: "Roles Permisos",
        key: "roles-permisos",
        hidden: true,
        route: "/asignarPermisos/:idRol",
        auth: "Permissions.Permissions.View",
        component: <ManagePermisions />,
      },
      {
        name: "Usuarios Roles",
        key: "usuarios-roles",
        hidden: true,
        route: "/asignar-Roles/:idUser",
        auth: "Permissions.UserRoles.Update",
        component: <ManageRoles />,
      },
      {
        name: "Usuarios",
        key: "usuarios",
        auth: "Permissions.Users.View",
        route: "/usuarios",
        component: <ListUsers />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestión de pagos",
    auth: "Permissions.Survey.View",
    key: "Payment-management",
    icon: <Icon fontSize="medium">payments_icon</Icon>,
    collapse: [
      {
        name: "Historial de Pagos",
        key: "historial-de-pagos",
        auth: "Permissions.PaymentOrder.Search",
        route: "/historial-de-pagos",
        component: <PaymentsGenerated />,
      },
      {
        name: "Pagos Manuales",
        key: "pagos-manuales",
        auth: "default",
        route: "/pagos-manuales",
        component: <ManualPayments />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestión de Encuestas",
    auth: "Permissions.Survey.View",
    key: "Survey-management",
    icon: <Icon fontSize="medium">content_paste_go</Icon>,
    collapse: [
      {
        name: "Formularios",
        key: "formularios",
        hidden: true,
        auth: "Permissions.Forms.View",
        route: "/formularios/:idPoll",
        component: <ListForm />,
      },
      {
        name: "Encuestas",
        key: "encuestas",
        route: "/encuestas",
        auth: "Permissions.Survey.View",
        component: <ListPoll />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Reportes",
    auth: "default",
    key: "Report-management",
    icon: <Icon fontSize="medium">assignment</Icon>,
    collapse: [
      {
        name: "Reporte Métricas",
        key: "Reporte",
        hidden: false,
        auth: "default",
        route: "/Reporte/metrics",
        component: <ReportTest />,
      },
      {
        name: "Reporte Orden de Servicio",
        key: "Reporte",
        hidden: false,
        auth: "default",
        route: "/Reporte/serviceOrder",
        component: <ServiceOrderReport />,
      },
      {
        name: "Reporte de Pagos",
        key: "Reporte",
        hidden: false,
        auth: "default",
        route: "/Reporte/paymentsReport",
        component: <PaymentsReport />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestión de Empresas",
    auth: "Permissions.Tenants.View",
    key: "Business-management",
    icon: <Icon fontSize="medium">store_cog_outline</Icon>,
    collapse: [
      {
        name: "Empresas",
        key: "empresa",
        auth: "Permissions.Tenants.View",
        route: "/empresa",
        component: <Company2 />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Gestión de Certificados",
    auth: "Permissions.Certificate.View",
    key: "certificates",
    icon: <Article fontSize="medium" />,
    collapse: [
      {
        name: "Certificados",
        key: "certificados",
        auth: "Permissions.Certificate.View",
        route: "/certificados",
        component: <Certificates />,
      },
      {
        name: "Certificados generados",
        key: "certificados-generados",
        auth: "Permissions.CertificateGenerated.View",
        route: "/certificados-generados",
        component: <CertificatedGenerates />,
      },
    ],
  },
  {
    type: "nav-item",
    auth: "default",
    name: "Mi perfil",
    key: "cuenta",
    route: "/cuenta",
    icon: <Icon fontSize="medium">manage_accounts_icon </Icon>,
    component: <Settings />,
  },
  {
    name: "Authentication",
    key: "authentication",
    auth: "default",
    icon: <Icon fontSize="medium">assignment_ind</Icon>,
    collapse: [
      {
        name: "Basic",
        key: "basic",
        auth: "default",
        route: "/login",
        component: <SignInBasic />,
      },
      {
        name: "Cover",
        key: "cover",
        auth: "default",
        route: "/authentication/sign-in/cover",
        component: <SignInCover />,
      },
      {
        name: "Illustration",
        key: "illustration",
        route: "/authentication/sign-in/illustration",
        component: <SignInIllustration />,
      },
      {
        name: "ResetPassword",
        key: "ResetPass",
        auth: "default",
        route: "/authentication/password-reset/cover",
        component: <ResetPassword />,
      },
      {
        name: "RecovePassword",
        key: "RecovePass",
        auth: "default",
        route: "/authentication/reset-password",
        component: <PasswordReset />,
      },
    ],
  },
];

export default routes;
