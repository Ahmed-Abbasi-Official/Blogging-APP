import React, { useState } from "react";
import { logoImage, icons, iconsList } from "../constants/Constant.js";
import Button from "../utils/Button.jsx";
import Image from "../utils/image.jsx";
import {Link} from 'react-router-dom'


const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between ">
      {/* LOGO */}
      <Link to='/' className="flex items-center gap-4 text-2xl font-bold ">
        <Image
        src={logoImage.logoImg}
        alt={logoImage.alt}
        w={32}
        h={32}

        />
        <span>Bloggify</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* TOGGLE BUTTON */}
        <div
          className="cursor-pointer text-4xl  "
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : <icons.hamburger />}
        </div>
        {/* MOBILE MENU LIST */}
        <div
          className={`w-full h-52   flex flex-col px-4 justify-center absolute top-16 items-start  transition-all duration-500 ease-in-out ${
            open ? "left-0" : "left-[100%]"
          } gap-4 font-medium text-sm `}
          style={{boxShadow: '0px 1px 10px 2px #8d86ff'}}
        >
          {
            iconsList.map((link, idx) => {
              return (
                <Link to={link.path} key={idx}
                cursor="pointer"
                >
                  {link.title}
                </Link>
              );
            })
          }
          <Button 
        value="Login 💛"
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        {iconsList.map((link, idx) => {
          return (
            <Link to={link.path} key={idx}
            cursor="pointer"
            >
              {link.title}
              
            </Link>
          );
        })}
        <Button 
        value="Login 💛"
        to='/login'
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />
      </div>
    </div>
  );
};

export default Navbar;
