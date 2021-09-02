import { destroyToken, destroyUser, getUser } from "./StorageService"

const logout = () => {
    // setUser(null);
    destroyToken();
    destroyUser();
};


const isAuthenticated = (): boolean =>{
    return JSON.parse(getUser()).auth ? true : false;
}

const isAdmin = (): boolean =>{
    return JSON.parse(getUser()).auth === 'ADMIN' ? true : false;
}


export { logout, isAuthenticated, isAdmin }
