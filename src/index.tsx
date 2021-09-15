import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Store from "./store/root";
import { AuthProvider } from "./contexts/AuthContext";

import App from "./App";

import "./index.scss";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  rootElement
);
