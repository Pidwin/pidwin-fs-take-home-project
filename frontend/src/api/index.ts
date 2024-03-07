import axios from "axios";
import {
  ChangePasswordInput,
  GameWagerInput,
  LoginInput,
  SignupInput,
} from "shared/interfaces";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  const localProfile = localStorage.getItem("profile");
  if (localProfile) {
    req.headers.Authorization = `Bearer ${JSON.parse(localProfile).token}`;
  }
  return req;
});

export const login = (input: LoginInput) => API.post("/api/user/login", input);
export const signup = (input: SignupInput) =>
  API.post("/api/user/signup", input);
export const changePassword = (input: ChangePasswordInput) =>
  API.post("/api/user/changePassword", input);
export const fetchGame = () => API.get("/api/game/fetch");
export const wager = (input: GameWagerInput) =>
  API.post("/api/game/wager", input);
