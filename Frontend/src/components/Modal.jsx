import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useAuth } from '../context/userContext';
import Image from '../utils/Image';

const Modal = () => {
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

     
  return (
    <div className='absolute right-0 top-16  z-20 w-[28%] bg-white p-4 rounded '>
      <div className='flex flex-col gap-4'>
        {/* USER INFO */}
        <div className='flex items-center gap-4'>
            <Image
            src={userData?.userImg || "/User.png?updatedAt=1735717183257"}
            className='w-10 h-10 bg-cover rounded-full' 
            />
            <div>
                <h1 className='text-black font-bold'>{userData?.fullName}</h1>
                <p className='text-sm text-gray-600'>{userData?.username}</p>
            </div>
        </div>
        {/* BUTTONS */}
      <div className='flex flex-col gap-2'>
         {/* UPDATED PROFILE BUTTON */}
         <button className='py-2 px-4 bg-[#2563ea] text-white rounded '>Update Profile</button>
            <button className='bg-[#dc2525] py-2 px-4 text-white rounded'>Logout</button>
        {/* LOGOUT  BUTTON */}
       </div>
      </div>
    </div>
  )
}

export default Modal