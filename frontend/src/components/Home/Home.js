import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import CoinTossGame from "../CoinTossGame/CoinTossGame";
import { getLoggedInUser } from "../../utils/get-logged-in-user";

const Home = () => {
  const user = getLoggedInUser();
  const isSingedIn = user;

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {isSingedIn !== "null" && isSingedIn !== null ? (
            <CoinTossGame />
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
