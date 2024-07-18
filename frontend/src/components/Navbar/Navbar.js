import React, { useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";

const Navbar = () => {
  const { login } = useSelector((state) => state.login);
  const { cointoss } = useSelector((state) => state.cointoss);

  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
  };

  useEffect(() => {
    if (login.token !== 'null' && login.token !== null) {
      if (login.exp * 1000 < new Date().getTime()) logout();
    }
  }, [location]);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
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
        {login.token !== 'null' && login.token !== null ? (
          <div sx={styles.profile}>
            <Avatar sx={styles.purple} alt={login.name} src={login.picture}>
              {login.name.charAt(0)}
            </Avatar>
            <Typography sx={styles.loginName} variant="h6">
              Hey {login.name}!
            </Typography>
            <Typography sx={styles.coins} variant="h6">
              <>Coins {cointoss.tokens.toString()}</>
            </Typography>
            <Button
              variant="contained"
              sx={styles.logout}
              color="secondary"
              onClick={logout}
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
