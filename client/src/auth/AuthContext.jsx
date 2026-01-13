
import { createContext, useContext, useEffect, useState } from "react";
import { clearAuth, getAuth, setAuth } from "./authStorage";
import { meApi } from "../api/authapi";

const AuthContext = createContext(null);

export function AuthProvider({ children }){

    const [auth, setAuthState] = useState(() => getAuth());
    const [loading, setLoading] = useState(true);

    async function refreshMe() {
        // return immediately if ther's no accesstoken
        if(!auth?.accessToken){
            setLoading(false);
            return;
        }
        // if there is AT, then validate by calling /me
        try{
            const user = await meApi();
            const updatedUser = {
                ...auth,
                user
            };
            setAuth(updatedUser);
            setAuthState(updatedUser);
        }catch(err){
            logout();
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=>{
        refreshMe();
    },[]);

    function login(authResponse){
        setAuth(authResponse);
        setAuthState(authResponse);
    }

    function logout(){
        clearAuth();
        setAuthState(null);
    }

    const value = {
        auth,
        user: auth?.user ?? null,
        isLoggedIn: auth?.accessToken ? true : false,
        login,
        logout,
        loading
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export function useAuth(){
    return useContext(AuthContext);
}
