import React from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup as RadioGroupMui,
} from '@mui/material';

const RadioGroup = ({
  color = 'primary',
  fullWidth = false,
  handleChange,
  label,
  name,
  options,
  row = false,
  sx = {},
  value,
}) => {
  return (
    <FormControl fullWidth={fullWidth}>
      {label ? <FormLabel id={`${name}-label`}>{label}</FormLabel> : null}
      <RadioGroupMui
        row={row}
        aria-labelledby={label ? `${name}-label` : null}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map((option, key) =>
          <FormControlLabel
            key={key}
            value={option.value}
            control={<Radio color={color} sx={sx} />}
            label={option.label}
          />)}
      </RadioGroupMui>
    </FormControl>
  );
};

RadioGroup.propTypes = {
  color: PropTypes.string,
  fullWidth: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  row: PropTypes.bool,
  sx: PropTypes.shape(),
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default RadioGroup;
