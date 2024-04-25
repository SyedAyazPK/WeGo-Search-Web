import axios from "axios";
// import { clearState } from "../store"; // import logout action from your auth slice
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get the token from local storage
  if (token) {
    config.headers.token = `${token}`; // add the token to the Authorization header
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       const navigate = useNavigate();
//       navigate("/login");
//       // clearState();
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
