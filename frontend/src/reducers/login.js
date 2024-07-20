import { jwtDecode } from 'jwt-decode';

import { LOGIN, LOGOUT } from '../constants/actionTypes';

const filter = (object) => ({
  ...jwtDecode(object.token),
  token: object.token,
});

const defaultLogin = { token: 'null' };

export const getLogin = () => {
  const login = localStorage.getItem('login');
  if (!login) {
    return defaultLogin;
  }
  return filter(JSON.parse(login));
};

export const setLogin = (data) => {
  const login = localStorage.getItem('login');
  data = login ? { ...JSON.parse(login), ...data } : data;
  localStorage.setItem('login', JSON.stringify(data));
  return data;
};

const defaultState = {
  login: {
    ...defaultLogin,
    _loaded: false,
  },
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      const login = setLogin(action.data);
      return { ...state, login: filter(login), _loaded: true };
    }

    case LOGOUT: {
      localStorage.clear();
      return defaultState;
    }

    default: {
      if (state.login._loaded) {
        return state;
      }
      const login = getLogin();
      return { ...state, login, _loaded: true };
    }
  }
}
export default loginReducer;
