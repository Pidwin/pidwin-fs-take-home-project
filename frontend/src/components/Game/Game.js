import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { wager } from '../../actions/cointoss';

import Input from '../Input/Input';
import RadioGroup from '../RadioGroup/RadioGroup';
import History from './History';
import HowToPlay from './HowToPlay';
import Coins from './Coins';

import {
  Box,
  Button,
} from '@mui/material';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import {
  HISTORY_OPEN_BY_DEFAULT,
  HOW_TO_PLAY_OPEN_BY_DEFAULT,
  DEFAULT_WAGER,
  MIN_WAGER,
  BACK_TO_GAME_TEXT,
  HOW_TO_PLAY_TEXT,
  HISTORY_TEXT,
  WAGER_TEXT,
  HEADS_TEXT,
  TAILS_TEXT,
  WAGER_BUTTON_TEXT,
  DEFAULT_GUESS,
} from '../../constants/cointoss';

const Game = () => {
  const [historyOpen, setHistoryOpen] = useState(HISTORY_OPEN_BY_DEFAULT);
  const [howToPlayOpen, setHowToPlayOpen] = useState(HOW_TO_PLAY_OPEN_BY_DEFAULT);

  const [formData, setFormData] = useState({
    wager: DEFAULT_WAGER.toString(),
    guess: DEFAULT_GUESS,
  });

  const backToGame = () => {
    setHowToPlayOpen(false);
    setHistoryOpen(false);
  };

  const toggleHowToPlay = () => {
    setHowToPlayOpen((prevState) => !prevState);
    setHistoryOpen(false);
  };

  const toggleHistory = () => {
    setHistoryOpen((prevState) => !prevState);
    setHowToPlayOpen(false);
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

  return (
    <>
      <ClickAwayListener onClickAway={backToGame}>
        <Box>
          {howToPlayOpen || historyOpen
            ? <Button color="secondary" type="button" onClick={backToGame}>{BACK_TO_GAME_TEXT}</Button>
            : <>
              <Button color="secondary" type="button" onClick={toggleHowToPlay}>{HOW_TO_PLAY_TEXT}</Button>
              {cointoss.history
                ? <Button color="secondary" type="button" onClick={toggleHistory}>{HISTORY_TEXT}</Button>
                : null
              }
            </>}
          {howToPlayOpen ? <HowToPlay /> : null}
          {historyOpen ? <History /> : null}
        </Box>
      </ClickAwayListener>
      <br />
      <Coins />
      <br />
      <form onSubmit={submitWager}>

        <Input
          name={WAGER_TEXT.toLowerCase()}
          label={WAGER_TEXT}
          type="bigint"
          handleChange={formDataChange}
          value={formData.wager}
          max={BigInt(cointoss.tokens)}
          min={MIN_WAGER}
          fullWidth
        />
        <br />

        <RadioGroup
          color="secondary"
          handleChange={formDataChange}
          value={formData.guess}
          name='guess'
          options={[
            { value: HEADS_TEXT.toLowerCase(), label: HEADS_TEXT },
            { value: TAILS_TEXT.toLowerCase(), label: TAILS_TEXT },
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
          {WAGER_BUTTON_TEXT}
        </Button>

      </form>
    </>
  );
};

export default Game;
