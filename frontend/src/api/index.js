import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });
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
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);
export const flipCoin = (formData) => API.post("/api/game/flipCoin", formData);
export const fetchGame = (email) => API.post("/api/game/fetch", email);
