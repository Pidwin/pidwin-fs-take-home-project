import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
  resultsHeader: {
    textAlign: "center",
    typography: "h4",
    fontWeight: "bold",
  },
  resultsSubHeader: {
    textAlign: "center",
    typography: "h5",
  },
  coinToss: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bonusContainer: {
    textAlign: "center",
    padding: "1rem",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "10px",
  },
  bonusHeader: {
    textAlign: "center",
    typography: "h6",
    color: deepPurple[500],
  },
  amountsContainer: {
    textAlign: "center",
    padding: "1rem",
    borderRadius: "10px",
  },
};
