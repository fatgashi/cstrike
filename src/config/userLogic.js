import axios from "./axios"
import { isTokenAvaible, removeToken } from "./localStorage"
import configuration from "./config";
import { jwtDecode } from 'jwt-decode';
import router from "../router";

export function getTokenExpiration(token) {
    const decoded = jwtDecode(token);
    if (decoded.exp) {
        return decoded.exp * 1000; // Convert to milliseconds
    }
    return null;
}

export function logout() {
    removeToken();
    router.push('/home');
}

export async function isAdmin(){
    const config = configuration();

    try {
        const user = await axios.get(`/user/profile`, config).then(res => {
            return res.data;
        });
        
        return user.role == 'admin' ? true : false;

    } catch(err) {
        return err.message;
    }

}

export async function isSuperAdmin(){
    const config = configuration();

    try {
        if(isTokenAvaible()){
            const user = await axios.get(`/user/profile`, config).then(res => {
                return res.data;
            });
            
            
            return user.role == 'superadmin' ? true : false;
        }
        return false;
    } catch(err) {
        return err.message;
    }

}

export async function isClient(){
    const config = configuration();

    try {
        const user = await axios.get(`/user/profile`, config).then(res => {
            return res.data;
        });
        
        return user.role;

    } catch(err) {
        return err.message;
    }

}

export async function getCurrentUser(){
    const config = configuration();

    try {
        if(isTokenAvaible()){
            const user = await axios.get(`/user/profile`, config).then(res => {
                return res.data;
            });
            
            return user;

        }

    } catch(err) {
        return err.message;
    }

}
