import React from "react";
import { Container, Grid, Grow, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import MostRecentResult from "./MostRecentResult";
import FullHistory from "./FullHistory";
import { styles } from "./styles";

const Results = () => {
  const coinState = useSelector((state) => state.coin);
  const mostRecentResult = coinState.history[coinState.history.length - 1];

  return (
    // <Grow in>
    <Container component="main" maxWidth="md">
      <MostRecentResult mostRecentResult={mostRecentResult} />
      <FullHistory history={coinState.history} />
    </Container>
  );
};

export default Results;
