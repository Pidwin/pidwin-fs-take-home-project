import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from 'prop-types';

const Input = ({
  name,
  value,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  required = true,
  fullWidth = true,
  max,
  min,
}) => {
  const defaultHandleChange = (e) => {
    let value = e.target.value;
    if ((type === 'bigint' && value.match(/^(-|)[0-9]+$/)) || type === 'number') {
      value = type === 'bigint' ? BigInt(value) : value;
      value = value < min ? min : value;
      value = value > max ? max : value;
      e.target.value = value;
    }
    handleChange(e);
  };

  return <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={defaultHandleChange}
      variant="outlined"
      required={required}
      fullWidth={fullWidth}
      label={label}
      autoFocus={autoFocus}
      type={type === 'bigint' ? 'string' : type}
      value={value}
      max={max}
      min={min}
      InputProps={
        name === "password" || name === "oldPassword"
          ? {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
          : null
      }
    />
  </Grid>
};

Input.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  handleChange: PropTypes.func,
  label: PropTypes.string,
  half: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  handleShowPassword: PropTypes.func,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  min: PropTypes.oneOfType([
    PropTypes.bigint,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.bigint,
    PropTypes.number,
  ]),
};

export default Input;
