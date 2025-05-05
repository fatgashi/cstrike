import axios from "axios";
import { removeToken } from "./localStorage";
import toast from "../utils/toast"; // ✅ Import toast instance

const instance = axios.create({
  baseURL: "https://zm-westcstrike.com/api",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();

      toast.warning("You should login!", {
        position: "top-right",
        timeout: 5000,
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
