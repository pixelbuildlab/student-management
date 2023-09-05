import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3001/api",
  timeout: 15000,
  withCredentials: true,
});
