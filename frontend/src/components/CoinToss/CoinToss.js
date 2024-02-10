import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  TextField,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/LockOutlined";
import { styles } from "./styles";
import { getTokens } from "../../actions/tokens";

const CoinToss = () => {
  const [wager, setWager] = useState(0);
  const [heads, setHeads] = useState(true);
  const [maxWagerExceeded, setMaxWagerExceeded] = useState(false);
  const playerTokens = useSelector((state) => state.tokens);
  //   const [maxWager, setMaxWager] = useState(playerTokens);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTokens());
  }, [dispatch]);

  useEffect(() => {
    if (wager > playerTokens) {
      setMaxWagerExceeded(true);
    } else {
      setMaxWagerExceeded(false);
    }
  }, [wager, playerTokens]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(tossCoin(wager));
    const headsOrTails = heads ? "heads" : "tails";
    console.log("Tossing Coin");
    console.log("Wager: ", wager);
    console.log("Guess: ", headsOrTails);
  };

  const handleWagerChange = (e) => {
    console.log(typeof e.target.value);
    const wagerAmount = parseInt(e.target.value, 10);
    console.log(typeof wagerAmount);
    console.log("Wager: ", e.target.value);
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
              value={heads}
              onChange={(e) => setHeads(e.target.value)}
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
