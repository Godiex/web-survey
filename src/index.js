import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
// Soft UI Context Provider
import { MaterialUIControllerProvider } from "context";
import { Provider } from "react-redux";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { LocationProvider } from "@reach/router";
import store from "./store";
// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import AlertTemplate from "./components/AlertTemplate";
import AxiosProvider from "./AxiosProvider";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <MaterialUIControllerProvider>
        <Provider store={store}>
          <LocationProvider>
            <AxiosProvider>
              <App />
            </AxiosProvider>
          </LocationProvider>
        </Provider>
      </MaterialUIControllerProvider>
    </AlertProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
