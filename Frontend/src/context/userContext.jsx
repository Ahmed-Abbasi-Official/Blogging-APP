import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserContext = createContext();

export const PostProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [pImg, setPImg] = useState('');

  const getImg=(img)=>{
    setPImg(img)
  }

  // Set Token
 const storeTokenInLs =(serverToken)=>{
   localStorage.setItem("token", serverToken);
  // setIsAuthenticated(true)
 }
 

 useEffect(() => {
   const token = localStorage.getItem("token");
   if (token) {
    //  setIsAuthenticated(true);
     setToken(token);
     <Navigate to='/'/>
     
   } 
 }, [Navigate,isAuthenticated]);

//  GET USER

const {data:user,isLoading:userLoading,error:userError}=useQuery({
  queryKey: ["user","adminData"],
  queryFn: async () => {

    const res=await axios.get(`${import.meta.env.VITE_API_URL}/user`,{
      headers: { Authorization:`${token}` },
    })
    // console.log(res)
    return res.data;
  },
})
  return (
    <UserContext.Provider value={{setIsAuthenticated,getImg,storeTokenInLs,isAuthenticated,token,pImg,user,userLoading,userError}}>{children}</UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
