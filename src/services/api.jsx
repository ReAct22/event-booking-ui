import axios from "axios";

const api = axios.create({
  baseURL: "http://202.10.35.18:8015/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;