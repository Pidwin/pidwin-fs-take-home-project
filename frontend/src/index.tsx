import { ThemeProvider } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import App from "./App";
import "./index.css";
import { rootReducer } from "./reducers";
import { theme } from "./themes/Default";

const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  );
}
