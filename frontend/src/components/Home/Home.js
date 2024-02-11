import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import CoinToss from "../CoinToss/CoinToss";
import Results from "../Results/Results";

const Home = () => {
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSignedIn = user;

  const isLoggedIn = isSignedIn !== "null" || isSignedIn !== null;
  return (
    <>
      <Grow in>
        <Container component="main" maxWidth="sm">
          <Paper elevation={3}>
            {isLoggedIn ? (
              <Container>
                <Typography variant="h4" align="center" color="primary">
                  {`Welcome ${user.name}`}
                </Typography>
                <CoinToss />
              </Container>
            ) : (
              <Typography variant="h4" align="center" color="primary">
                Login to Play
              </Typography>
            )}
          </Paper>
        </Container>
      </Grow>
      {isSignedIn && <Results />}
    </>
  );
};

export default Home;
