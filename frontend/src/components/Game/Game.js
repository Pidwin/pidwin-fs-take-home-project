import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';

import { wager } from '../../actions/cointoss';

import Input from '../Input/Input';
import List from '../List/List';
import RadioGroup from '../RadioGroup/RadioGroup';

import {
  Box,
  Button,
  Divider,
  Paper,
  Typography,
} from '@mui/material';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import {
  CLICK_AWAY_OPEN_BY_DEFAULT,
  DEFAULT_WAGER,
  MIN_WAGER,
  BACK_TO_GAME_TEXT,
  HOW_TO_PLAY_TEXT,
  WELCOME_TEXT,
  WELCOME_SUB_TEXT,
  GETTING_STARTED_TEXT,
  GETTING_STARTED_STEP_1_PRIMARY_TEXT,
  GETTING_STARTED_STEP_1_SECONDARY_TEXT,
  GETTING_STARTED_STEP_2_PRIMARY_TEXT,
  GETTING_STARTED_STEP_3_PRIMARY_TEXT,
  REWARD_SYSTEM_TEXT,
  REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT,
  WAGER_TEXT,
  HEADS_TEXT,
  TAILS_TEXT,
  WAGER_BUTTON_TEXT,
  DEFAULT_GUESS,
} from '../../constants/cointoss';

import headsSvg from './images/heads.svg';
import tailsSvg from './images/tails.svg';

const Game = () => {
  const [clickAwayOpen, setClickAwayOpen] = useState(CLICK_AWAY_OPEN_BY_DEFAULT.toBoolean());
  const [formData, setFormData] = useState({
    wager: DEFAULT_WAGER.toNumber(),
    guess: DEFAULT_GUESS.toKey(),
  });

  const toggleClickAway = () => {
    setClickAwayOpen((prevState) => !prevState);
  };

  const hideClickAway = () => {
    setClickAwayOpen(false);
  };

  const formDataChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();
  const history = useNavigate();
  const submitWager = (e) => {
    e.preventDefault();
    dispatch(wager(formData, history));
  };

  const { cointoss } = useSelector((state) => state.cointoss);

  const coinStyles = {
    height: '80%',
    width: '80%',
    filter: 'invert(18%) sepia(95%) saturate(2288%) hue-rotate(278deg) brightness(99%) contrast(95%)',
  };

  return (
    <>
      <ClickAwayListener onClickAway={hideClickAway}>
        <Box>
          <Button color="secondary" type="button" onClick={toggleClickAway}>
            { clickAwayOpen ? BACK_TO_GAME_TEXT.toString() : HOW_TO_PLAY_TEXT.toString() }
          </Button>
          {clickAwayOpen ? (
            <Paper sx={{
              position: 'absolute',
              right: 0,
              left: 0,
              zIndex: 2,
              p: 1,
              bgcolor: 'background.paper',
            }}>
              <Typography variant="h4" color="secondary">
                {parse(WELCOME_TEXT.toString())}
              </Typography>
              <br />

              <Typography variant="h5" color="secondary">
                {parse(WELCOME_SUB_TEXT.toString())}
              </Typography>
              <br />

              <Typography variant="h6" color="secondary">
                {GETTING_STARTED_TEXT.toString()}
              </Typography>
              <Divider />
              <List
                items={[
                  {
                    primary: {
                      color: 'secondary',
                      value: parse(GETTING_STARTED_STEP_1_PRIMARY_TEXT.toString()),
                      variant: 'h6',
                    },
                    secondary: {
                      color: 'secondary',
                      value: parse(GETTING_STARTED_STEP_1_SECONDARY_TEXT.format(MIN_WAGER.toNumber(), cointoss.tokens)),
                      variant: 'h7',
                    },
                  },
                  {
                    primary: {
                      color: 'secondary',
                      value: parse(GETTING_STARTED_STEP_2_PRIMARY_TEXT.toString()),
                      variant: 'h6',
                    },
                  },
                  {
                    primary: {
                      color: 'secondary',
                      value: parse(GETTING_STARTED_STEP_3_PRIMARY_TEXT.toString()),
                      variant: 'h6',
                    },
                  },
                ]}
              />
              <br />

              <Typography variant="h6" color="secondary">
                {REWARD_SYSTEM_TEXT.toString()}
              </Typography>
              <Divider />
              <List
                items={[
                  {
                    primary: {
                      color: 'secondary',
                      value: parse(REWARD_SYSTEM_TEXT_STEP_1_PRIMARY_TEXT.toString()),
                      variant: 'h6',
                    },
                  },
                ]}
              />

            </Paper>
          ) : null}
        </Box>
      </ClickAwayListener>
      <br />

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="img" sx={{ ...coinStyles, ...{
          display: cointoss.answer === 'heads' ? 'initial' : 'none',
        } }} alt="heads" src={headsSvg} />
        <Box component="img" sx={{ ...coinStyles, ...{
          display: cointoss.answer === 'tails' ? 'initial' : 'none',
        } }} alt="tails" src={tailsSvg} />
      </Box>
      <br />

      <form onSubmit={submitWager}>

        <Input
          name={WAGER_TEXT.toKey()}
          label={WAGER_TEXT.toString()}
          type="bigint"
          handleChange={formDataChange}
          value={formData.wager}
          max={BigInt(cointoss.tokens)}
          min={MIN_WAGER.toNumber()}
          fullWidth
        />
        <br />

        <RadioGroup
          color="secondary"
          handleChange={formDataChange}
          value={formData.guess}
          name='guess'
          options={[
            { value: HEADS_TEXT.toKey(), label: HEADS_TEXT.toString() },
            { value: TAILS_TEXT.toKey(), label: TAILS_TEXT.toString() },
          ]}
          row
          fullWidth
        />
        <br />

        <br />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
        >
          {WAGER_BUTTON_TEXT.toString()}
        </Button>

      </form>
    </>
  );
};

export default Game;
