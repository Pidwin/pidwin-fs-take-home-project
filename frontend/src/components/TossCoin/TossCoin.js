import React, { useState } from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {tossCoin} from "../../actions/wager";
import {getUser} from "../../actions/user";

function TossCoin({userId}) {
  const [wager, setWager] = useState('');
  const [choice, setChoice] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(tossCoin({ choice, wager, userId }, history))
      .then(() => dispatch(getUser()));
  };

  return (
    <div>
      <label>
        Wager:
        <input
          type="number"
          value={wager}
          onChange={(e) => setWager(e.target.value)}
          min={0}
        />
      </label>
      <fieldset>
        <label>
          <input
            type="radio"
            name="choice"
            value="Heads"
            checked={choice === 'Heads'}
            onChange={(e) => setChoice(e.target.value)}
          />
          Heads
        </label>
        <label>
          <input
            type="radio"
            name="choice"
            value="Tails"
            checked={choice === 'Tails'}
            onChange={(e) => setChoice(e.target.value)}
          />
          Tails
        </label>
      </fieldset>
      <button type="button" onClick={handleClick}>Submit</button>
    </div>
  );
}

export default TossCoin;
