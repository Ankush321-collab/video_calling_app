import { createContext, useContext, useState, useEffect } from "react";
import cookie from "js-cookie";

export const Authcontext = createContext();

export const useAuth = () => {
  return useContext(Authcontext);
};

export const AuthProvider = ({ children }) => {
  const [authuser, setauthuser] = useState(null);
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user")) || cookie.get("jwt") || null;
    setauthuser(storedUser);
    setIsloading(false);
  }, []);

  return (
    <Authcontext.Provider value={[authuser, setauthuser, isloading]}>
      {children}
    </Authcontext.Provider>
  );
};
