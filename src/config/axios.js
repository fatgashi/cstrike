import axios from "axios";


const instance = axios.create({
    baseURL: 'https://zm-westcstrike.com/api',
})

export default instance;