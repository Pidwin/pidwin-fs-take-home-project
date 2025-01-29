import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../utils/get-logged-in-user";
import ThankYouModal from "../Modal/ThankYouModal";
import { loadUserTokenBalance } from "../../actions/token-balance";

const Navbar = () => {
  const tokenBalance = useSelector((state) => state.tokens.tokenBalance);
  const [user, setUser] = useState(getLoggedInUser());
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
    setUser("null");
  };

  useEffect(() => {
    if (user !== "null" && user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    const userObj = getLoggedInUser();
    setUser(userObj);
    dispatch(loadUserTokenBalance(userObj.email));
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
        {user !== "null" && user !== null ? (
          <div style={styles.navContainer}>
            <div style={styles.profileContainer}>
              <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography sx={styles.userName} variant="h6">
                {user.name} - Tokens: {tokenBalance}
              </Typography>
            </div>
            <div style={styles.buttonsContainer}>
              <Button
                variant="contained"
                sx={styles.button}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                sx={styles.button}
                color="secondary"
                onClick={() => {
                  history("/password");
                }}
              >
                Set Password
              </Button>
              <ThankYouModal />
            </div>
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
