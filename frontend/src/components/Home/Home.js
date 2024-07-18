import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import Game from '../Game/Game';
import { useSelector } from 'react-redux';

const Home = () => {
  const { login } = useSelector((state) => state.login);

  return (
    <Grow in>
      <Container component="main" maxWidth="sm" sx={{  }}>
        <Paper elevation={3} sx={{
          p: 1,
          position: 'relative',
        }}>
          {login.token !== 'null' && login.token !== null ? (
            <Game />
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
