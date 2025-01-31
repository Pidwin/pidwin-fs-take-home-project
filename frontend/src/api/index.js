import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const betGame = (betData) => API.post("/api/game/bet", betData);
export const getUserBets = () => API.get("/api/user/bets");
export const getLeaderboard = (limit = 10) =>
  API.get(`/api/game/leaderboard/${limit}`);
export const getUserStreaks = () => API.get("/api/user/streaks");
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);
