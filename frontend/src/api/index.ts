import axios from "axios";
import {
  IChangePasswordInput,
  ILoginInput,
  ISignupInput,
} from "shared/interfaces";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  const localProfile = localStorage.getItem("profile");
  if (localProfile) {
    req.headers.Authorization = `Bearer ${JSON.parse(localProfile).token}`;
  }
  return req;
});

export const login = (input: ILoginInput) => API.post("/api/user/login", input);
export const signup = (input: ISignupInput) =>
  API.post("/api/user/signup", input);
export const changePassword = (input: IChangePasswordInput) =>
  API.post("/api/user/changePassword", input);
export const fetchGame = () => API.get("/api/game/fetch");
