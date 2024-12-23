import axios from "axios";
import { createContext, useContext } from "react";

const PinContext = createContext();

export const PostProvider = ({ children }) => {

  // ALL POSTS
  
 
  return (
    <PinContext.Provider value={{  }}>{children}</PinContext.Provider>
  );
};

export const PostData = () => useContext(PinContext);
