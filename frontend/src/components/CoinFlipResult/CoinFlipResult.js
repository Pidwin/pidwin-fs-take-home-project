// External libraries
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

// Component imports
import { Button, Typography } from "@mui/material";

// Internal utilities
import * as api from "../../api";
import * as messages from "../../messages";
import { getLoggedInUser } from "../../utils/get-logged-in-user";

// Stylesheets
import "./CoinFlip.css";

const CoinFlipResult = ({
  handlePlayAgain,
  wagerAmount,
  predictionIsHeads,
}) => {
  const [flipping, setFlipping] = useState(false);
  const [resultIsHeads, setResultIsHeads] = useState(true);
  const [payoutAmount, setPayoutAmount] = useState(0);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let flipTimeout;

    const startFlip = async () => {
      setFlipping(true);
      const user = getLoggedInUser();
      const wagerData = {
        email: user.email,
        wagerAmount: wagerAmount,
        predictionIsHeads: predictionIsHeads,
      };

      try {
        const { data } = await api.wager(wagerData);
        const wagerResultDecoded = data.token ? jwtDecode(data.token) : null;

        flipTimeout = setTimeout(() => {
          setFlipping(false);
          if (wagerResultDecoded) {
            if (wagerResultDecoded.wagerPayout > 0) {
              messages.success("Congratulations, You Won!");
            } else {
              messages.error("Sorry, You Lost! Try Again!");
            }
            setResultIsHeads(wagerResultDecoded.resultIsHeads);
            setPayoutAmount(wagerResultDecoded.wagerPayout);
            dispatch({
              type: "SET_TOKEN_BALANCE",
              data: wagerResultDecoded.newBalance,
            });
          }
        }, 3000);
      } catch (error) {
        console.error("Error with the coin flip:", error);
      }
    };

    startFlip();

    return () => {
      clearTimeout(flipTimeout);
    };
  }, []);

  return (
    <div className="container">
      <div
        className={`coin ${
          flipping ? "flipping" : resultIsHeads ? "heads" : "tails"
        }`}
      />
      <div>
        {flipping || (
          <Typography>
            You Guessed: {predictionIsHeads ? "Heads" : "Tails"}
          </Typography>
        )}
        {flipping || (
          <Typography>Result: {resultIsHeads ? "Heads" : "Tails"}</Typography>
        )}
        {flipping || (
          <Typography
            sx={{
              color: resultIsHeads === predictionIsHeads ? "green" : "red",
            }}
          >
            {resultIsHeads === predictionIsHeads
              ? `You Win! - ${payoutAmount} Tokens`
              : "Sorry, Try Again"}
          </Typography>
        )}
        {flipping || (
          <Typography>
            {payoutAmount > wagerAmount * 2 ? "You Won a Bonus!" : ""}
          </Typography>
        )}
        {flipping || (
          <Button onClick={handlePlayAgain} variant="contained" color="primary">
            Play Again
          </Button>
        )}
      </div>
    </div>
  );
};
export default CoinFlipResult;
