import { theme } from "../../themes/Default";

import { deepPurple } from "@mui/material/colors";

export const styles = {
  appBar: {
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: "15px",
  },
  tokensContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "50px",
  },
  tokensCount: {
    color: deepPurple[500],
  },
  goldToken: {
    height: "70px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "55px",
    right: "-30px",
    width: "150px",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.3) -2px 2px 9px 3px",
    padding: "15px",
  },
  menuButton: { marginTop: "15px" },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
};
