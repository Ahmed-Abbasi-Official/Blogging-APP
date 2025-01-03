import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/userContext";
import Image from "../utils/Image";
import { toast } from "react-toastify";
import './Modal.css'

const Modal = ({ update,setUpdate,setShow }) => {
  const { token } = useAuth();

  //  GET USER INFO

  const {
    isPending: isAdminPending,
    error: adminError,
    data: adminData,
  } = useQuery({
    queryKey: ["adminData", "updated"],
    queryFn: async () => {
      return await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
    },
  });
  const userData = adminData?.data?.userData;
  //  console.log(userData);

  // FOR LOAGOUT

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    toast.success("Logged out");
    window.location.reload();
    navigate("/login");
  };

  return (
    <div
      className={`absolute right-0 top-16 md:text-start text-center w_480px shadow-md shadow-black  z-20 w-[45%] sm:w-[35%] md:w-[28%] bg-white p-4 rounded animate-slide`}
    >
      <span className="absolute right-4 top-2 text-lg font-semibold cursor-pointer md:hidden" onClick={()=>setShow(false)}>X</span>
      <div className="flex flex-col gap-4 justify-center md:justify-start  ">
        {/* USER INFO */}
        <div className="flex flex_col md:flex-row flex-col items-center gap-4">
          <Image
            src={userData?.userImg || "/User.png?updatedAt=1735717183257"}
            className="md:w-10 md:h-10 w-16 h-16 bg-cover rounded-full"
          />
          <div>
            <h1 className="text-black font-bold ">
              {userData?.fullName || "User"}
            </h1>
            <p className="text-sm text-gray-600">{userData?.username}</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex flex-col gap-2">
          {/* UPDATED PROFILE BUTTON */}
          <button className="md:py-2 md:px-4 py-1 px-2 bg-[#2563ea] text-white rounded " onClick={()=>{
            setUpdate(true)
            
            
          }}>
            Update Profile
          </button>
          {/* LOGOUT  BUTTON */}
          <button
            className="bg-[#dc2525] md:py-2 md:px-4 py-1 px-2 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
