import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
