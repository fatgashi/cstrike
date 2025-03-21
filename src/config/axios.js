import axios from "axios";
import { removeToken } from "./localStorage";
// import router from "../router";
import Vue from "vue";


const instance = axios.create({
    baseURL: 'https://zm-westcstrike.com/api',
})

instance.interceptors.response.use(
    (response) => response, // Return response if successful
    (error) => {
        if (error.response && error.response.status === 401) {
            
            // Remove token from local storage
            removeToken();

            

            Vue.$toast.warning("You should login!", {
                position: "top-right",
                timeout: 5000, // Auto-close after 5s
            });
            
        }

        return Promise.reject(error); // Forward error to be handled where called
    }
);

export default instance;