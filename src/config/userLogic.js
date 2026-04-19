import axios from "./axios"
import { isTokenAvaible, removeToken } from "./localStorage"
import configuration from "./config";
import { jwtDecode } from 'jwt-decode';
import router from "../router";

export function getTokenExpiration(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp) {
            return decoded.exp * 1000; // Convert to milliseconds
        }
    } catch {
        /* invalid token */
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

    } catch {
        return false;
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
    } catch {
        return false;
    }

}

/** JWT/site role: can use VIP RCON tools (`/rcon/add-vip`, `/user/update-vip`). */
export async function isSuperAdminOrOwner() {
    const config = configuration();
    try {
        if (!isTokenAvaible()) return false;
        const user = await axios.get(`/user/profile`, config).then((res) => res.data);
        return user.role === "superadmin" || user.role === "owner";
    } catch {
        return false;
    }
}

export async function isClient(){
    if (!isTokenAvaible()) {
        return false;
    }
    const config = configuration();

    try {
        const user = await axios.get(`/user/profile`, config).then(res => {
            return res.data;
        });
        
        return user.role;

    } catch {
        return false;
    }

}

export async function getCurrentUser(){
    const config = configuration();

    try {
        if (!isTokenAvaible()) {
            return null;
        }
        const res = await axios.get(`/user/profile`, config);
        return res.data;
    } catch {
        return null;
    }

}
