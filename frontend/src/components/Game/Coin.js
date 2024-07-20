import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Coin = ({
  alt,
  display,
  src,
  sx,
}) =>
  <Box component="img" sx={{ ...sx, ...{
    display: display ? 'initial' : 'none',
  } }} alt={alt} src={src} />;

Coin.propTypes = {
  alt: PropTypes.string,
  display: PropTypes.bool,
  src: PropTypes.string,
  sx: PropTypes.shape(),
};

export default Coin;
