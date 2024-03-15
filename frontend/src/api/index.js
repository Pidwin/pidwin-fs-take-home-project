import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
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
export const wager = (formData) => API.post("/api/user/wager", formData);
export const wagerHistory = (formData) =>
  API.post("/api/user/wager-history", formData);
export const tokenBalance = (formData) =>
  API.post("/api/user/token-balance", formData);
