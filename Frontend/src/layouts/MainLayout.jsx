import React, { useEffect, useState } from "react";
import {Outlet} from 'react-router-dom'
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { useAuth } from "../context/userContext";

const MainLayout = () => {
  const {user,userLoading,setIsAuthenticated}=useAuth();
  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  if (userLoading) return <Loader />;
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
          <>
          <Navbar />
          <Outlet />
          </>
    </div>
  );
};

export default MainLayout;
