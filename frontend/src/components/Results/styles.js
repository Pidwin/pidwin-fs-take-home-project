import { theme } from "../../themes/Default";
import { deepPurple } from "@mui/material/colors";

export const styles = {
  resultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  mostRecentResultsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
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
    fontWeight: "bold",
    fontSize: "1.8rem",
    color: "gold",
  },
  megaBonusHeader: {
    textAlign: "center",
    typography: "h6",
    fontWeight: "bold",
    fontSize: "2.4rem",
    color: "gold",
  },
  amountsContainer: {
    textAlign: "center",
    padding: "1rem",
    borderRadius: "10px",
  },
};
