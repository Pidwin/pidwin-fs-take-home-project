import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Stack,
} from "@mui/material";
import CoinFlipResult from "../CoinFlipResult/CoinFlipResult";
import WagerHistory from "../WagerHistory/WagerHistory";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CoinTossGame = () => {
  const tokenBalance = useSelector((state) => state.tokens.tokenBalance);
  const [wagerAmount, setWagerAmount] = useState("");
  const [isHeads, setIsHeads] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleWagerChange = (event) => {
    setWagerAmount(event.target.value);
  };

  const handleCoinSideChange = () => {
    setIsHeads(!isHeads);
  };

  const handleSubmitWager = () => {
    setIsSubmitted(true);

    dispatch({
      type: "SET_TOKEN_BALANCE",
      data: tokenBalance - wagerAmount,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, margin: "auto", maxWidth: 500, textAlign: "center" }}
    >
      {isSubmitted ? (
        <CoinFlipResult
          wagerAmount={wagerAmount}
          handlePlayAgain={() => setIsSubmitted(false)}
          predictionIsHeads={isHeads}
        />
      ) : (
        <>
          <Typography variant="h4" gutterBottom color="primary">
            Good Luck!
          </Typography>
          <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
            <FormLabel component="legend">Choose Heads or Tails</FormLabel>
            <RadioGroup row value={isHeads} onChange={handleCoinSideChange}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Heads"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Tails"
              />
            </RadioGroup>
          </FormControl>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ marginBottom: 2 }}
          >
            <TextField
              label="Wager Amount"
              type="number"
              sx={{ minWidth: "175px" }}
              value={wagerAmount}
              onChange={handleWagerChange}
              inputProps={{ min: 1, max: tokenBalance }}
            />
            <Button
              onClick={handleSubmitWager}
              variant="contained"
              color="primary"
              disabled={wagerAmount < 1 || wagerAmount > tokenBalance}
            >
              {wagerAmount > tokenBalance
                ? "Insufficient Tokens"
                : "Submit Wager"}
            </Button>
          </Stack>
          <WagerHistory />
        </>
      )}
    </Paper>
  );
};

export default CoinTossGame;
