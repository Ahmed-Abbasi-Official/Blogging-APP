import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const PostProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  // Set Token
 const storeTokenInLs =(serverToken)=>{
  return localStorage.setItem("token", serverToken);
 }
 

 useEffect(() => {
   const token = localStorage.getItem("token");
   if (token) {
     setIsAuthenticated(true);
     setToken(token);
     <Navigate to='/'/>
     
   } else {
     setIsAuthenticated(false);
    // <Navigate to='/' />
   }
 }, [Navigate]);
  return (
    <UserContext.Provider value={{storeTokenInLs,isAuthenticated,token}}>{children}</UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
