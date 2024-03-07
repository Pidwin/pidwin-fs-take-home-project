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
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  userName: {
    display: "flex",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  wagerFormPaper: {
    padding: "30px",
  },
  wagerListPaper: {
    padding: "30px",
    marginTop: "20px",
  },
  wagerForm: {
    padding: "30px 20px 10px 20px",
    display: "flex",
    flexDirection: "column",
  },
  wagerSideRadioGroup: {
    margin: "30px 0px 30px 0px",
  },
  wagerSubmitButton: {
    alignSelf: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "50px",
    width: "100%",
  },
};
