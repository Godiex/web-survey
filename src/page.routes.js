// @mui material components
import Icon from "@mui/material/Icon";

const pageRoutes = [
  {
    name: "Roles",
    key: "roles",
    icon: <Icon>login</Icon>,
    collapse: [
      {
        name: "roles",
        key: "roles",
        route: "/roles",
      },
    ],
  },
  {
    name: "Usuarios",
    key: "usuarios",
    icon: <Icon>login</Icon>,
    collapse: [
      {
        name: "Usuarios",
        key: "usuarios",
        route: "/usuarios",
      },
    ],
  },
  {
    name: "Iniciar Sesión",
    key: "sign-in",
    icon: <Icon>login</Icon>,
    routeF: "/login",
  },
  { type: "divider", key: "divider-0" },
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
  },
  // {
  //   name: "Registrarse",
  //   key: "sign-up",
  //   icon: <Icon>assignment</Icon>,
  //   routeF: "/authentication/sign-up/cover",
  //   collapse: [
  //     {
  //       name: "Cover",
  //       key: "cover",
  //       route: "/authentication/sign-up/cover",
  //     },
  //   ],
  // },
  {
    name: "Restablecer contraseña",
    key: "reset-password",
    icon: <Icon>restart_alt</Icon>,
    routeF: "/authentication/reset-password/cover",
  },
  {
    name: "Docs",
    key: "docs",
    collapse: [
      {
        name: "Getting Started",
        key: "getting-started",
        href: "https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/",
        description: "All about overview, quick start, license and contents",
        icon: <Icon>article</Icon>,
      },
      {
        name: "Foundation",
        key: "foundation",
        href: "https://www.creative-tim.com/learning-lab/react/colors/material-dashboard/",
        description: "See our colors, icons and typography",
        icon: <Icon>grading</Icon>,
      },
      {
        name: "Components",
        key: "components",
        href: "https://www.creative-tim.com/learning-lab/react/alerts/material-dashboard/",
        description: "Explore our collection of fully designed components",
        icon: <Icon>apps</Icon>,
      },
      {
        name: "Plugins",
        key: "plugins",
        href: "https://www.creative-tim.com/learning-lab/react/datepicker/material-dashboard/",
        description: "Check how you can integrate our plugins",
        icon: <Icon>extension</Icon>,
      },
    ],
  },
];

export default pageRoutes;
