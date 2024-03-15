import { jwtDecode } from "jwt-decode";

export const getLoggedInUser = () => {
	const user =  localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  return user;
};
