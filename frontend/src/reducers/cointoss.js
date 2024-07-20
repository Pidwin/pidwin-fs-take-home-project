import { omit } from 'lodash-es';

import { WAGER } from '../constants/actionTypes';

const filter = (object) => omit(object, 'token');

const defaultCointoss = {};

export const getCointoss = () => {
  const cointoss = localStorage.getItem('cointoss');
  if (!cointoss) {
    return defaultCointoss;
  }
  return filter(JSON.parse(cointoss));
};

export const setCointoss = (data) => {
  const cointoss = localStorage.getItem('cointoss');
  data = cointoss ? { ...JSON.parse(cointoss), ...data } : data;
  localStorage.setItem('cointoss', JSON.stringify(data));
  return data;
};

const defaultState = {
  cointoss: {
    ...defaultCointoss,
    _loaded: false,
  }
};

const cointossReducer = (state = defaultState, action) => {
  switch (action.type) {
    case WAGER: {
      const cointoss = setCointoss(action.data);
      return { ...state, cointoss: filter(cointoss), _loaded: true };
    }

    default: {
      if (state.cointoss._loaded) {
        return state;
      }
      const cointoss = getCointoss();
      return { ...state, cointoss, _loaded: true };
    }
  }
}
export default cointossReducer;
