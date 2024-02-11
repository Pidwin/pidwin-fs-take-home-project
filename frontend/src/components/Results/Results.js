import React from "react";
import { Container, Grow } from "@mui/material";
import { useSelector } from "react-redux";
import MostRecentResult from "./MostRecentResult";
import FullHistory from "./FullHistory";
import { styles } from "./styles";

const Results = () => {
  const coinState = useSelector((state) => state.coin);
  const mostRecentResult = coinState.history[coinState.history.length - 1];

  return (
    <Grow in>
      <Container component="main" maxWidth="md" sx={styles.resultsContainer}>
        {coinState.history.length > 0 && (
          <>
            <MostRecentResult mostRecentResult={mostRecentResult} />
            <FullHistory history={coinState.history} />
          </>
        )}
      </Container>
    </Grow>
  );
};

export default Results;
