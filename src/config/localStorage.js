import store from "../store/index";

export function setTokenTo(token) {
    store.dispatch('updateToken', token);
}

export function isTokenAvaible() {
    return !!store.state.token;
}

export function removeToken() {
    store.dispatch('updateToken', null);
    store.dispatch('updateLogged', false);
}

export function getToken() {
    if(isTokenAvaible()){
        return store.state.token;
    } else {
        return null;
    }
}