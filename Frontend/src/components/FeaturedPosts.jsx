import React from "react";
import Image from "../utils/Image.jsx";
import Button from "../utils/Button";
import {  logoImage } from "../constants/Constant";
import { IKImage } from "imagekitio-react";
const FeaturedPosts = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* FIRST */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* IMAGE */}
        <Image src='Blogging%20Website/featured1.jpeg'
        w={895}
        alt='Featured'
        className="rounded-3xl object-cover" />

        {/* DETAILS */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold  lg:text-lg ">01.</h1>
          <Button
            value="Web Design"
            containerClass="text-blue-800 lg:text-lg"
          />
          <span className="text-gray-500">2 days ago</span>
        </div>
        {/* TITLE */}
        <Button
        to='/test'
        containerClass='text-xl lg:text-3xl font-semibold lg:font-bold'
        value="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      </div>
      {/* OTHERS */}
      <div className="w-full lg:w-1/2 flex-col gap-4">
      {/* SECOND */}
      <div className="lg:h-1/3 flex justify-between gap-4 text-sm lg:text-base mb-4">
      <div className="w-1/3 aspect-video">
      <Image
      src='Blogging%20Website/featured2.jpeg'
      alt='featured2'
      className='rounded-3xl object-cover w-full h-full'
      w={298}
      />
      </div>
      {/* DETAILS AND TITLE */}
      <div className="w-2/3">
      {/* DETAILS */}
      <div className="flex items-center gap-4">
        <h1 className="font-semibold">02.</h1>
        <Button
        value='Web Design'
        containerClass='text-blue-800'
        />
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      <Button
      containerClass='text-base md:text-2xl sm:text-lg lg:text-xl xl:text-2xl font-medium'
      value='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
      to='/test'
      />
      </div>
      </div>
      {/* THIRD */}
      <div className="lg:h-1/3 flex justify-between gap-4 mb-4 ">
      <div className="w-1/3 aspect-video">
      <Image
      src='Blogging%20Website/featured3.jpeg'
      alt='featured3'
      className='rounded-3xl object-cover w-full h-full '
      w={298}
      />
      </div>
      {/* DETAILS AND TITLE */}
      {/* DETAILS */}
      <div className="w-2/3">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold">03.</h1>
        <Button
        value='Web Design'
        containerClass='text-blue-800'
        />
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      <Button
      containerClass='text-base md:text-2xl sm:text-lg lg:text-xl xl:text-2xl font-medium'
      value='Lorem ipsum dolor, sit amet consectetur adipisicing elit.'
      to='/test'
      />
      </div>
      
      </div>
      {/* FOURTH */}
      <div className="lg:h-1/3 flex justify-between gap-4 ">
      <div className="w-1/3 aspect-video">
      <Image
      src='Blogging%20Website/featured4.jpeg'
      alt='featured4'
      className='rounded-3xl object-cover w-full h-full '
      w={298}
      />
      </div>
      {/* DETAILS AND TITLE */}
      <div className="  w-2/3 ">
      <div className="flex gap-4 mb-4 lg:text-base text-sm items-center">
        <h1 className="font-semibold">04.</h1>
        <Button
        value='Web Design'
        containerClass='text-blue-800'
        />
        <span className="text-gray-500 text-sm">2 days ago</span>
      </div>
      <Button
      to='/test'
      value=' Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      containerClass='font-medium text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl'
      />
      </div>
      </div>

      </div>
    </div>
  );
};

export default FeaturedPosts;
