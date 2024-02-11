import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const MostRecentToss = () => {
  const coinState = useSelector((state) => state.coin);
  console.log(coinState);
  const mostRecentResult = coinState.history[coinState.history.length - 1];
  console.log(mostRecentResult);

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          <Typography variant="h4" align="center" color="primary">
            Most Recent Toss
          </Typography>
          <Container>
            <Typography>
              Win: {mostRecentResult.win ? "True" : "False"}
            </Typography>
            <Typography>Bonus: {mostRecentResult.bonus}</Typography>
            <Typography>MegaBonus: {mostRecentResult.megaBonus}</Typography>
            <Typography>Wager: {mostRecentResult.wager}</Typography>
            <Typography>You guessed: {mostRecentResult.guess}</Typography>
            <Typography>
              The coin landed on: {mostRecentResult.result}
            </Typography>
          </Container>
        </Paper>
      </Container>
    </Grow>
  );
};

export default MostRecentToss;
