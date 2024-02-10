import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { getTokens } from "../../actions/tokens";

const PlayerTokens = () => {
  const dispatch = useDispatch();
  const playerTokens = useSelector((state) => state.tokens);

  useEffect(() => {
    dispatch(getTokens());
  }, [dispatch]);

  return (
    <div>
      <Typography>Player Tokens: {playerTokens}</Typography>
    </div>
  );
};

export default PlayerTokens;
