import { JwtPayload, jwtDecode } from "jwt-decode";

/**
 * The shape of the payload received from jwt about the user.
 */
interface IUserPayload extends JwtPayload {
  name: string;
  email: string;
  picture?: string;
}

/**
 * Gets the user from local storage.
 * @returns Returns the user payload stored in local storage.
 */
export const getUser = (): IUserPayload | null => {
  const localProfile = localStorage.getItem("profile");
  return localProfile
    ? jwtDecode<IUserPayload>(JSON.parse(localProfile).token)
    : null;
};
