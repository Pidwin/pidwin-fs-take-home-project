/**
 * The shape of the input required to login as a user.
 */
export interface ILoginInput {
  email: string;
  password: string;
}

/**
 * The shape of the input required to sign up as a user.
 */
export interface ISignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * The shape of the input required to change a user's password.
 */
export interface IChangePasswordInput {
  oldPassword: string;
  newPassword: string;
  email: string;
}

/**
 * The response shape of a successful login request.
 */
export interface ILoginResponse {
  token: string;
}
