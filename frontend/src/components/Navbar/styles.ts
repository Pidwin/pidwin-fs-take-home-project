import { theme } from "../../themes/Default";

import { deepPurple } from "@mui/material/colors";

export const styles = {
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  toolbar: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  tokenCountContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
};
