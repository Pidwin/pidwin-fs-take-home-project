import React from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { clone, reverse, map } from 'lodash-es';
import List2 from '../List/List2';

import {
  Divider,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';

import {
  HISTORY_TEXT,
  HISTORY_TEXT_YOU_WON,
  HISTORY_TEXT_YOU_LOST,
} from '../../constants/cointoss';

const History = () => {
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
      <Typography variant="h5" color="secondary">
        {parse(HISTORY_TEXT)}
      </Typography>
      <br />
      <Divider />
      <List2 items={map(reverse(clone(cointoss.history)), (each) =>
        <ListItemText
          disableTypography={true}
          key={0}
          primary={
            <Typography color="secondary" variant="h6">{each.winner
              ? HISTORY_TEXT_YOU_WON(each.payout)
              : HISTORY_TEXT_YOU_LOST(each.wager)
            }</Typography>}
          secondary={
            <List2 items={[
              <ListItemText
                disableTypography={true}
                key={0}
                primary={<Typography color="secondary" variant="h7">Consecutive wins: {each.consecutive}</Typography>}
              />,
              <ListItemText
                disableTypography={true}
                key={0}
                primary={<Typography color="secondary" variant="h7">You wagered: {each.wager}</Typography>}
              />,
              <ListItemText
                disableTypography={true}
                key={0}
                primary={<Typography color="secondary" variant="h7">You guessed: {each.guess}</Typography>}
              />,
              <ListItemText
                disableTypography={true}
                key={0}
                primary={<Typography color="secondary" variant="h7">Coin result: {each.answer}</Typography>}
              />,
              <ListItemText
                disableTypography={true}
                key={0}
                primary={<Typography color="secondary" variant="h7">Payout rate: {each.rate}</Typography>}
              />,
            ]} />
          }
        />
      )} />
    </Paper>
  );
};

export default History;
