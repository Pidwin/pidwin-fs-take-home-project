import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Paper,
  Box,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { getTokens } from "../../actions/tokens";
import { tossCoin } from "../../actions/coin";

const CoinToss = () => {
  const [wager, setWager] = useState(0);
  const [heads, setHeads] = useState(true);
  const [maxWagerExceeded, setMaxWagerExceeded] = useState(false);
  const playerTokens = useSelector((state) => state.tokens);
  //   const [maxWager, setMaxWager] = useState(playerTokens);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTokens());
  // }, [dispatch]);

  useEffect(() => {
    if (wager > playerTokens) {
      setMaxWagerExceeded(true);
    } else {
      setMaxWagerExceeded(false);
    }
  }, [wager, playerTokens]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (maxWagerExceeded) {
      return;
    }
    const choice = heads ? "heads" : "tails";
    dispatch(tossCoin(wager, choice));
  };

  const handleWagerChange = (e) => {
    const wagerAmount = parseInt(e.target.value, 10);
    setWager(wagerAmount);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper sx={styles.paper} elevation={3}>
          <Box component="form" sx={styles.form} onSubmit={handleSubmit}>
            <TextField
              id="wager-input"
              error={maxWagerExceeded}
              name="wager"
              label="Wager"
              onChange={handleWagerChange}
              autoFocus
              required
              helperText={maxWagerExceeded && `Max Wager: ${playerTokens}`}
            />
            <RadioGroup
              row
              aria-label="heads"
              name="heads"
              value={String(heads)}
              onChange={(e) => setHeads(e.target.value === "true")}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Heads"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Tails"
              />
            </RadioGroup>
            <Button
              type="submit"
              sx={styles.submit}
              fullWidth
              variant="contained"
              color="primary"
            >
              Toss the Coin
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default CoinToss;
