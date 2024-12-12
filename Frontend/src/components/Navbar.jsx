import React, { useState } from "react";
import { logoImg, icons, iconsList } from "./constants/Constant.js";
import Button from "../utils/Button.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between ">
      {/* LOGO */}
      <div className="flex items-center gap-4 text-2xl font-bold ">
        <img src={logoImg} className="w-8 h-8" alt="Logo Image" />
        <span>Bloggify</span>
      </div>
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
                <a href={link.path} key={idx}
                cursor="pointer"
                >
                  {link.title}
                </a>
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
            <a href={link.path} key={idx}
            cursor="pointer"
            >
              {link.title}
              
            </a>
          );
        })}
        <Button 
        value="Login 💛"
        containerClass='py-2 px-4 rounded-3xl bg-blue-800 text-white '
        />
      </div>
    </div>
  );
};

export default Navbar;
