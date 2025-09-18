import { createContext, useContext, useState } from "react";
import cookie from "js-cookie";

// creating authcontext
export const Authcontext = createContext();

// using authuser context
export const useAuth = () => {
    return useContext(Authcontext);
};

export const AuthProvider = ({ children }) => {
    const [authuser, setauthuser] = useState(
        JSON.parse(localStorage.getItem("user")) || cookie.get("jwt") || null
    );

    return (
        <Authcontext.Provider value={[authuser, setauthuser]}>
            {children}
        </Authcontext.Provider>
    );
};
