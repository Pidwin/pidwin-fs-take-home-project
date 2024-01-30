import axios from "axios";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { logoutUser } from "../actions/auth"

const API = axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: true
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.data)
    if (error.response.data === "Invalid Token") {
      window.location.href = '/auth'
    }
    return Promise.reject(error);
  }
);

export const login = (formData) => API.post("/api/user/login", formData);
export const logout = () => API.get("/api/user/logout");
export const signUp = (formData) => API.post("/api/user/signup", formData);
export const tossCoin = (formData) => API.post("/api/user/toss-coin", formData);
export const getUser = () => API.get("/api/user/profile");
export const changePassword = (formData) =>
  API.post("/api/user/changePassword", formData);
