import React, { useEffect, useState } from "react";
import { logoImage, icons, iconsList } from "../constants/Constant.js";
import Button from "../utils/Button.jsx";
// import Image from "../utils/image.jsx";
import {Link} from 'react-router-dom'
import { useAuth } from "../context/userContext"; 
import ShowPopUp from "./ShowPopUp.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
   const { isAuthenticated } = useAuth();

   

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between ">
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
            open ? "left-0" : "left-[100%]"
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
        { isAuthenticated ? (<p>USER</p>):( <Button 
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
          <img src="/User.png" alt="User"
          className="w-7 h-7 cursor-pointer bg-cover"
          onClick={()=>setShowPopUp((prev)=>!prev)}
          />
        ):( <Button 
        value="Login 💛"
        to='/login'
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />)
     }
      </div>
      {
        showPopUp && (
          <ShowPopUp/>
        )
      }
    </div>
  );
};

export default Navbar;
