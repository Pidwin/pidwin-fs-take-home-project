const userReducer = (user = null, action) => {
  switch (action.type) {
    case 'GET_USER':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return user;
  }
};

export default userReducer;
