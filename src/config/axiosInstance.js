import Axios from "axios";

const axiosInstance = Axios.create({
  baseURL: "https://dog.ceo/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
