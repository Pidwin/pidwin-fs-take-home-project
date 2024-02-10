import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  FormControlLabel,
  Grow,
  Paper,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { styles } from "./styles";
import { fetchGame, flipCoin } from "../../actions/game";

const Home = () => {
  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const { name, email } = user;
  const isLoggedIn = user;

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn && isLoggedIn !== "null") {
      dispatch(fetchGame(email));
    }
  }, []);

  const initFormData = {
    email,
    guess: 0,
    wager: 1,
  };
  const [formData, setFormData] = useState(initFormData);
  const { guess } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(flipCoin(formData));
  };

  const handleChangeWager = (e) => {
    let wager = Number(e.target.value);
    setFormData({ ...formData, wager });
  };

  const handleChangeGuess = (e) => {
    let guess = Number(e.target.value);
    setFormData({ ...formData, guess });
  };

  const getCoinSideString = (side) => {
    if (side) {
      return "TAILS";
    }
    return "HEADS";
  };

  const { tokens, winStreak, recentResults, isFlipping } = useSelector(
    (state) => state.game
  );
  const lastResult = recentResults[recentResults.length - 1];

  return (
    <>
      {isFlipping && (
        <div style={styles.flippingPopover}>
          <img
            style={styles.goldToken}
            srcSet={require("../../assets/coin-toss-ncfom.gif")}
            src={require("../../assets//coin-toss-ncfom.gif")}
            alt={"Gold tokens image"}
          />
        </div>
      )}
      <div className={"page"} style={styles.page}>
        <Grow in>
          <Container component="main" maxWidth="sm">
            <Paper elevation={3}>
              {isLoggedIn !== "null" && isLoggedIn !== null ? (
                <div style={styles.formContainer}>
                  <Typography variant="h4" align="center" color="primary">
                    {`Flip a coin ${name}!`}
                  </Typography>
                  <div style={styles.form}>
                    <FormControl>
                      <FormLabel>Wager</FormLabel>
                      <NumberInput
                        name="wager"
                        label="Wager"
                        placeholder="Enter tokens"
                        min={1}
                        max={tokens}
                        defaultValue={initFormData.wager}
                        onChange={(e) => handleChangeWager(e)}
                        slots={{
                          incrementButton: () => <></>,
                          decrementButton: () => <></>,
                        }}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Guess Result</FormLabel>
                      <RadioGroup
                        name="guess"
                        label="guess"
                        row
                        defaultValue={0}
                        onChange={(e) => handleChangeGuess(e)}
                      >
                        <FormControlLabel
                          key="0"
                          value={0}
                          control={<Radio />}
                          label="Heads"
                        />
                        <FormControlLabel
                          key="1"
                          value={1}
                          control={<Radio />}
                          label="Tails"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                  <Button
                    onClick={handleSubmit}
                    sx={styles.submit}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Flip Coin
                  </Button>
                </div>
              ) : (
                <div sx={styles.loginToPlay}>
                  <Typography variant="h4" align="center" color="primary">
                    Login to Play
                  </Typography>
                </div>
              )}
            </Paper>
          </Container>
        </Grow>
        {isLoggedIn !== "null" && isLoggedIn !== null && (
          <div style={styles.gameContainer}>
            <Grow in>
              <Container component="main" maxWidth="sm">
                <Paper elevation={3}>
                  <div style={styles.resultsContainer}>
                    <div style={styles.resultsRow}>
                      <div style={styles.resultsCoinSide}>
                        <Typography
                          variant="h5"
                          align="center"
                          style={styles.resultsCoinSideLabel}
                          color="primary"
                        >
                          GUESS:
                        </Typography>
                        <Typography
                          variant="h5"
                          align="center"
                          color="secondary"
                        >
                          {getCoinSideString(guess)}
                        </Typography>
                      </div>

                      {lastResult !== undefined && (
                        <div style={styles.resultsCoinSide}>
                          <Typography
                            variant="h5"
                            align="center"
                            style={styles.resultsCoinSideLabel}
                            color="primary"
                          >
                            RESULT:
                          </Typography>
                          <Typography
                            variant="h5"
                            align="center"
                            color="secondary"
                          >
                            {getCoinSideString(lastResult)}
                          </Typography>
                        </div>
                      )}
                    </div>
                    <div style={styles.resultsRow}>
                      <Typography variant="h5" align="center" color="primary">
                        {`Win Streak: ${winStreak}`}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Container>
            </Grow>
            <Grow in>
              <Container component="main" maxWidth="sm">
                <Paper elevation={3}>
                  <div style={styles.recentsContainer}>
                    <div style={styles.recentsRow}>
                      <div style={styles.recentsCoinSide}>
                        <Typography
                          variant="h5"
                          align="center"
                          style={styles.recentsCoinSideLabel}
                          color="primary"
                        >
                          LAST 10 RESULTS:
                        </Typography>
                      </div>
                    </div>
                    <div style={styles.recentsRow}>
                      <Typography variant="h6" color="secondary">
                        {recentResults
                          .toReversed()
                          .map(
                            (r, i) => getCoinSideString(r) + (i < 9 ? ", " : "")
                          )}
                        ...
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Container>
            </Grow>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
