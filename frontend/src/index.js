import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reducer from "./reducers";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/Default";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
