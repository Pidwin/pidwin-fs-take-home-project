import React from "react";
import { Container, Grid, Grow, Paper, Typography } from "@mui/material";
import { styles } from "./styles";

const MostRecentResult = ({ mostRecentResult }) => {
  if (!mostRecentResult) {
    return null;
  }

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          <Container>
            <Typography
              sx={[
                styles.resultsHeader,
                {
                  color: mostRecentResult.win ? "green" : "red",
                },
              ]}
            >
              {mostRecentResult.win ? "You win!" : "You lose!"}
            </Typography>
            {mostRecentResult.bonus && (
              <Container sx={styles.bonusContainer}>
                <Typography sx={styles.bonusHeader}>Bonus!</Typography>
                <Typography>This was your 3rd win in a row!</Typography>
              </Container>
            )}
            {mostRecentResult.megaBonus && (
              <Container sx={styles.bonusContainer}>
                <Typography sx={styles.megaBonusHeader}>MEGA BONUS!</Typography>
                <Typography>This was your 5th win in a row!</Typography>
              </Container>
            )}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography sx={styles.resultsSubHeader}>You chose</Typography>
                <Typography sx={styles.coinToss}>
                  {mostRecentResult.guess}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography sx={styles.resultsSubHeader}>
                  Toss Landed
                </Typography>
                <Typography sx={styles.coinToss}>
                  {mostRecentResult.result}
                </Typography>
              </Grid>
            </Grid>
            <Container sx={styles.amountsContainer}>
              <Typography>
                You wagered {mostRecentResult.wager} tokens
              </Typography>

              {mostRecentResult.megaBonus ? (
                <Typography>
                  You won {mostRecentResult.wager * 10} tokens!
                </Typography>
              ) : mostRecentResult.bonus ? (
                <Typography>
                  You won {mostRecentResult.wager * 3} tokens!
                </Typography>
              ) : mostRecentResult.win ? (
                <Typography>
                  You won {mostRecentResult.wager * 2} tokens
                </Typography>
              ) : (
                <Typography>
                  You lost {mostRecentResult.wager} tokens
                </Typography>
              )}
            </Container>
          </Container>
        </Paper>
      </Container>
    </Grow>
  );
};

export default MostRecentResult;
