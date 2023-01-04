import { destroyLocalClothing, destroyLocalShoes, destroyToken, destroyUser, getUser } from "./StorageService"

const logout = () => {
    destroyToken();
    destroyUser();
    destroyLocalClothing();
    destroyLocalShoes();
};


const isAuthenticated = (): boolean =>{
    return JSON.parse(getUser()).auth ? true : false;
}

const isAdmin = (): boolean =>{
    // return JSON.parse(getUser()).auth === 'ADMIN' ? true : false;
    return true;
}


export { logout, isAuthenticated, isAdmin }
