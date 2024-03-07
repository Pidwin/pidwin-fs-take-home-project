import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../..";
import { LOGOUT } from "../../reducers/login";
import { getUser } from "../../utils/local-storage";
import { styles } from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const dispatch = useAppDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch(LOGOUT());
    history("/auth");
    setUser(null);
  };

  useEffect(() => {
    if (user?.exp !== undefined && user.exp * 1000 < new Date().getTime()) {
      logout();
    }
    setUser(getUser());
  }, [location]);

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
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user !== null ? (
          <div style={styles.profile}>
            <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography sx={styles.userName} variant="h6">
              {user.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
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
