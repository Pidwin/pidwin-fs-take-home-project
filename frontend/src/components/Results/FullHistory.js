import React from "react";
import { Box, Container, Grid, Grow, Paper, Typography } from "@mui/material";
import { styles } from "./styles";

const FullHistory = ({ history }) => {
  if (!history) {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        padding: "8px",
        width: "100%",
      }}
    >
      <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
        History
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {history.map((result, index) => (
          <Grid item xs={1} key={index}>
            <Box sx={{ textAlign: "center", height: "24px" }}>
              {index === 0 && history.length > 1 && (
                <Typography>Oldest</Typography>
              )}
              {index === history.length - 1 && <Typography>Current</Typography>}
              {index !== 0 && index !== history.length - 1 && (
                <Typography>{index + 1}</Typography>
              )}
            </Box>
            <Grow in>
              <Paper elevation={3}>
                <Box
                  sx={{
                    // width: "70px",
                    // height: "70px",
                    overflow: "hidden",
                    textAlign: "center",
                    display: "flex",
                    flex: 1,
                    flexGrow: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px",
                  }}
                >
                  <Typography
                    sx={[
                      {
                        color:
                          result.bonus || result.megaBonus
                            ? "goldenrod"
                            : result.win
                            ? "green"
                            : "red",
                        fontSize: "1rem",
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {result.bonus
                      ? "BONUS"
                      : result.megaBonus
                      ? "MEGA"
                      : result.win
                      ? "WIN"
                      : "LOSS"}
                  </Typography>
                  <Typography sx={[styles.coinToss, { fontSize: "0.5rem" }]}>
                    {result.guess}/{result.result}
                  </Typography>
                </Box>
              </Paper>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FullHistory;
