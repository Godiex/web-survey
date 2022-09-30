import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Material Dashboard 2 PRO React components
// Material Dashboard 2 PRO React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
// Material Dashboard 2 PRO React routes
import routes from "routes";
// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav } from "context";
// Images
import logoAppWhite from "assets/images/logos/app-logo/firefighter_white.svg";
// import { getPermissionsUserAction } from "../../../../store/auth/actions";

const filterRoutes = (listPermissions) => {
  const allRoutesfilter = routes
    .map((route) => {
      if (listPermissions.indexOf(route.auth) !== -1 || route.auth === "default") {
        if (route.collapse) {
          const filterCollapse = route.collapse.filter(
            (collapse) =>
              listPermissions.indexOf(collapse.auth) !== -1 || collapse.auth === "default"
          );
          return { ...route, collapse: filterCollapse };
        }
        return route;
      }
      return null;
    })
    .filter((route) => route);
  return allRoutesfilter;
};

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, sidenavColor, darkMode } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const listPermissionsInGlobalState = useSelector(({ auth }) => auth.permissions);
  const { logoUrl } = useSelector(({ company }) => company.tenantConfig);
  const listPermissionsSessionStorage = sessionStorage.getItem("permissions");
  const listPermissions = listPermissionsSessionStorage
    ? listPermissionsSessionStorage.split(",")
    : [];
  const [listRoutes, setListRoutes] = useState(filterRoutes(listPermissions));

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    const newListPermissions = listPermissionsSessionStorage
      ? listPermissionsSessionStorage.split(",")
      : [];
    setListRoutes(filterRoutes(newListPermissions));
  }, [listPermissionsInGlobalState]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
      return null;
    });

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={!logoUrl ? logoAppWhite : logoUrl}
              routes={listRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(listRoutes)}
          <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={!logoUrl ? logoAppWhite : logoUrl}
            routes={listRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(listRoutes)}
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </ThemeProvider>
  );
}
