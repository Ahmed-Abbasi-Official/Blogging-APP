import React, { useState } from "react";
import {Outlet} from 'react-router-dom'
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const MainLayout = () => {
  const [loader,setLoader]=useState(true)
  setTimeout(()=>setLoader(false),2000)
  console.log(loader);
  
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      {
        loader ? (
          <Loader/>
        ):(
          <>
          <Navbar />
          <Outlet />
          </>
        )
      }
    </div>
  );
};

export default MainLayout;
