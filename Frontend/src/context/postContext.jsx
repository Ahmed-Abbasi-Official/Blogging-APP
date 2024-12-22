import axios from "axios";
import { createContext, useContext } from "react";

const PinContext = createContext();

export const PostProvider = ({ children }) => {

  // ALL POSTS
  
  const fetchPost = async ({ pageParam }) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 2 },
    });
    return res.data;
  };
  return (
    <PinContext.Provider value={{ fetchPost }}>{children}</PinContext.Provider>
  );
};

export const PostData = () => useContext(PinContext);
