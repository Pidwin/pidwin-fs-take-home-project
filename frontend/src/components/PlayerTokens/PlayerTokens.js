import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { styles } from "./styles";

const PlayerTokens = () => {
  const playerTokens = useSelector((state) => state.tokens);

  return (
    <Box sx={styles.playerTokens}>
      <Typography variant="h5" sx={{ fontSize: "1.2rem" }}>
        Tokens
      </Typography>
      <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
        {playerTokens}
      </Typography>
    </Box>
  );
};

export default PlayerTokens;
