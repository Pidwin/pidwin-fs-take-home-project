/**
 * The shape of the input required to login as a user.
 */
export type LoginInput = {
  email: string;
  password: string;
};

/**
 * The shape of the input required to sign up as a user.
 */
export type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

/**
 * The shape of the input required to change a user's password.
 */
export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
  email: string;
};

/**
 * The shape of a response to a successful login request.
 */
export type LoginResponse = {
  token: string;
};
