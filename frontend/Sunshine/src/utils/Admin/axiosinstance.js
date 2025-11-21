import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
//   timeout: 10000,
});

//  //
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwt_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
