import axios from "axios";
import { getUserFromLocalStorage } from "../context/globalContext";

export const customFetch = axios.create({
  baseURL: "http://3.225.61.15/api/1.0",
});

customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();

    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
