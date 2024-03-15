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
    display: "flex",
    justifyContent: "flex-end",
    width: "1000px",
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "600px",
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "300px",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "400px",
  },
  userName: {
    marginLeft: "10px",
  },
  button: {
    margin: "3px",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
};
