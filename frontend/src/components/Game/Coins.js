import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import headsSvg from './images/heads.svg';
import tailsSvg from './images/tails.svg';

import Coin from './Coin';

const coinStyles = {
  height: '60%',
  width: '60%',
  filter: 'invert(18%) sepia(95%) saturate(2288%) hue-rotate(278deg) brightness(99%) contrast(95%)',
};

const Coins = () => {
  const { cointoss } = useSelector((state) => state.cointoss);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Coin alt="heads" display={!cointoss.answer || cointoss.answer === 'heads'} src={headsSvg} sx={coinStyles} />
      <Coin alt="tails" display={cointoss.answer === 'tails'} src={tailsSvg} sx={coinStyles} />
    </Box>
  );
};

export default Coins;
