import React from 'react';
import { useSelector } from 'react-redux';

import List from '../List/List';

import {
  Divider,
  Paper,
  Typography,
} from '@mui/material';

import {
  MIN_WAGER,
  WELCOME_TEXT,
  WELCOME_SUB_TEXT,
  GETTING_STARTED_TEXT,
  GETTING_STARTED_STEP_1_PRIMARY_TEXT,
  GETTING_STARTED_STEP_1_SECONDARY_TEXT,
  GETTING_STARTED_STEP_2_PRIMARY_TEXT,
  GETTING_STARTED_STEP_3_PRIMARY_TEXT,
  REWARD_SYSTEM_TEXT,
  REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT,
  REWARD_SYSTEM_TEXT_STEP_2_PRIMARY_TEXT,
} from '../../constants/cointoss';

const HowToPlay = () => {
  const { cointoss } = useSelector((state) => state.cointoss);

  return (
    <Paper sx={{
      position: 'absolute',
      right: 0,
      left: 0,
      zIndex: 2,
      p: 1,
      bgcolor: 'background.paper',
    }}>
      <Typography variant="h4" color="secondary">
        {WELCOME_TEXT}
      </Typography>
      <br />

      <Typography variant="h5" color="secondary">
        {WELCOME_SUB_TEXT}
      </Typography>
      <br />

      <Typography variant="h6" color="secondary">
        {GETTING_STARTED_TEXT}
      </Typography>
      <Divider />
      <List
        items={[
          {
            primary: {
              color: 'secondary',
              value: GETTING_STARTED_STEP_1_PRIMARY_TEXT,
              variant: 'h6',
            },
            secondary: {
              color: 'secondary',
              value: GETTING_STARTED_STEP_1_SECONDARY_TEXT(MIN_WAGER, cointoss.tokens),
              variant: 'h7',
            },
          },
          {
            primary: {
              color: 'secondary',
              value: GETTING_STARTED_STEP_2_PRIMARY_TEXT,
              variant: 'h6',
            },
          },
          {
            primary: {
              color: 'secondary',
              value: GETTING_STARTED_STEP_3_PRIMARY_TEXT,
              variant: 'h6',
            },
          },
        ]}
      />
      <br />

      <Typography variant="h6" color="secondary">
        {REWARD_SYSTEM_TEXT}
      </Typography>
      <Divider />
      <List
        items={[
          {
            primary: {
              color: 'secondary',
              value: REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT,
              variant: 'h6',
            },
          },
          {
            primary: {
              color: 'secondary',
              value: REWARD_SYSTEM_TEXT_STEP_2_PRIMARY_TEXT,
              variant: 'h6',
            },
          },
        ]}
      />

    </Paper>
  );
};

export default HowToPlay;
