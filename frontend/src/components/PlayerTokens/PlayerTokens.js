import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
// import { getTokens } from "../../actions/tokens";

const PlayerTokens = () => {
  const playerTokens = useSelector((state) => state.tokens);

  console.log(playerTokens);
  return (
    <div>
      <Typography>Player Tokens: {playerTokens}</Typography>
    </div>
  );
};

export default PlayerTokens;
