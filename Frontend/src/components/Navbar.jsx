import React, { useEffect, useState } from "react";
import { logoImage, icons, iconsList } from "../constants/Constant.js";
import Button from "../utils/Button.jsx";
// import Image from "../utils/image.jsx";
import {Link} from 'react-router-dom'
import { useAuth } from "../context/userContext"; 
import ShowPopUp from "./ShowPopUp.jsx";
import Image from "../utils/Image.jsx";
import { useQuery } from "@tanstack/react-query";
import Modal from "./Modal.jsx";
import axios from "axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const[update,setUpdate]=useState(false);
   const { isAuthenticated,token } = useAuth();

  

   //  GET USER
 
   const {
    isPending: isAdminPending,
    error: adminError,
    data: adminData,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("API Response:", res.data); // Debug API response
      return res.data; // Return actual data
    },
  });

  const user = adminData?.userData || {}; // Safely access user data
  console.log("User Data:", user); // Debug user data

  // if (isAdminPending) {
  //   return <div className="absolute w-full h-full bg-black z-20 top-0 left-0 text-white">Loading...</div>; // Show a loader if data is fetching
  // }

  // if (adminError) {
  //   console.error("Error fetching admin data:", adminError);
  //   return <div>Error loading data</div>;
  // }


   

  return (
    <div className="relative w-full h-16 md:h-20 flex items-center justify-between ">
      {/* LOGO */}
      <Link to='/' className="flex items-center gap-4 text-2xl font-bold ">
        <img
        src={logoImage.logoImg}
        alt={logoImage.alt}
        width='32'
        height='32'

        />
        <span>Bloggify</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden ">
        {/* TOGGLE BUTTON */}
        <div
          className="cursor-pointer text-4xl  "
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : <icons.hamburger />}
        </div>
        {/* MOBILE MENU LIST */}
        <div
          className={`w-full h-52   flex flex-col px-4 justify-center absolute top-16 items-start z-10  transition-all duration-500 ease-in-out ${
            open ? "left-0" : "left-[120%]"
          } gap-4 font-medium text-sm  bg-white`}
          style={{boxShadow: '0px 1px 10px 2px #8d86ff'}}
        >
          {
            iconsList.map((link, idx) => {
              return (
                <Button to={link.path} key={idx}
                cursor="pointer"
                 containerClass='cursor-pointer '
                value={link.title}
                />
                
              );
            })
          }
        { isAuthenticated ? (
          user?.userImg ? (
            <div    onClick={()=>{
              setShow((prev)=>!prev)
              setOpen((prev)=>!prev)
            }} className="cursor-pointer">
              <Image
            src={user?.userImg}
            className="w-10 h-10 rounded-full object-cover"
            alt="image"
            // w="40"
          />
            </div>
          ) :(
            <img src="/User.png" alt="User"
            className="w-7 h-7 cursor-pointer bg-cover"
          onClick={()=>{
            setShow((prev)=>!prev)
            setOpen((prev)=>!prev)
          }}
          />
          )
        ):( <Button 
        value="Login 💛"
        to='/login'
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />)
     }
    
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        {iconsList.map((link, idx) => {
          return (
            <Link to={link.path} key={idx}
            cursor="pointer"
            className={`${!isAuthenticated && link.class}`}
            >
              {link.title}
              
            </Link>
          );
        })}
        { isAuthenticated ? (
          user?.userImg ? (
            <div    onClick={()=>setShow((prev)=>!prev)} className="cursor-pointer">
              <Image
            src={user?.userImg}
            className="w-10 h-10 rounded-full object-cover"
            alt="image"
            // w="40"
          />
            </div>
          ) :(
            <span  onClick={()=>setShow((prev)=>!prev)}>
              <Image src={user?.userImg}alt="User"
            className="w-7 h-7 cursor-pointer bg-cover"
         
          />
            </span>
          )
          
        ):( <Button 
        value="Login 💛"
        to='/login'
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />)
     }
      </div>
      {
        show && (
          <Modal update={update} setUpdate={setUpdate} />
        )
      }
      {
        update && (
          <ShowPopUp  show={show} setUpdate={setUpdate} setShow={setShow}  />
        )
      }
      </div>
      
  );
};

export default Navbar;
