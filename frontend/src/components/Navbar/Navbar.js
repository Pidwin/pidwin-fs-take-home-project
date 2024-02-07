import React, { useState, useEffect } from "react";
import { AppBar, Typography, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );

  const [showMenu, setShowMenu] = useState(false);

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
    setUser(
      localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null"
    );
  }, [location]);

  const { tokens } = useSelector((state) => state.game);

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h4"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      {user !== "null" && user !== null && (
        <div style={styles.tokensContainer}>
          <img
            style={styles.goldToken}
            srcSet={require("../../assets/gold-token.png")}
            src={require("../../assets//gold-token.png")}
            alt={"Gold tokens image"}
          />
          <Typography sx={styles.tokensCount} variant="h3">
            {tokens}
          </Typography>
        </div>
      )}

      {user !== "null" && user !== null ? (
        <div style={styles.profile}>
          <div
            style={styles.avatarContainer}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Avatar sx={styles.avatar} alt={user.name} src={user.picture}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography sx={styles.userName} variant="h6" color="primary">
              {user.name}
            </Typography>
            {showMenu && (
              <div style={styles.menu}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    history("/password");
                  }}
                >
                  Set Password
                </Button>
                <Button
                  variant="contained"
                  sx={styles.menuButton}
                  color="secondary"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login
        </Button>
      )}
    </AppBar>
  );
};

export default Navbar;
