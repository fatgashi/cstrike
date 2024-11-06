import { getToken } from "./localStorage";




export default function configuration(){
    const token = getToken();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    
    return config;
}