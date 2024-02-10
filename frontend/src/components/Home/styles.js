import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
  flippingPopover: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)",
    zIndex: 1,
  },
  page: {
    display: "flex",
  },
  formContainer: {
    padding: "15px",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 0",
  },
  gameContainer: {
    display: "flex",
    flexDirection: "column",
  },
  resultsContainer: {
    padding: "15px",
    marginBottom: "15px",
  },
  resultsRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "7.5px 0",
  },
  resultsCoinSide: {
    display: "flex",
  },
  resultsCoinSideLabel: {
    marginRight: "15px",
  },
  recentsContainer: {
    padding: "15px",
  },
  loginToPlay: {
    padding: "15px 0",
    cursor: "pointer",
  },
};
