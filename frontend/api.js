import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_BACKEND_URI,
});
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
