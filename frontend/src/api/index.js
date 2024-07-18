import axios from "axios";
import { getLogin } from '../reducers/login';

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  const login = getLogin();
  if (login.token !== 'null' && login.token !== null) {
    req.headers.Authorization = `Bearer ${login.token}`;
  }
  return req;
});

export const login = (formData) => API.post("/api/user/login", formData);
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const changePassword = (formData) => API.post("/api/user/changePassword", formData);
export const wager = (formData) => API.post('/api/wager', formData);
