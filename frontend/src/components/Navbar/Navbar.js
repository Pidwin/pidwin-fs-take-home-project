import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { styles } from "./styles";
import { logoutUser } from "../../actions/auth";

const Navbar = ({user}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const logUserOut = () => {
    dispatch(logoutUser(history));
  };

  // Do not render navbar if there is no user
  if (!user) {
    return null;
  }

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div style={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          TossCoin
        </Typography>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="subtitle1"
          align="center"
        >
          Tokens: {user.tokens}
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user ? (
          <div>
            <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
              {user.name?.charAt(0)}
            </Avatar>
            <Typography sx={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={logUserOut}
            >
              Logout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                history("/password");
              }}
            >
              Set Password
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
