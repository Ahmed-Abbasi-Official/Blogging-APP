import React, { useState } from "react";
import "../transition.css";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useAuth } from "../context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Image from "../utils/Image";

const ShowPopUp = ({ setShow,show,setUpdate }) => {
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [editProfile, setEditProfile] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  setShow(false)

  // FOR USE FORM

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  

  // FRO UPDATION USER

  // Inside your component
  const queryClient = useQueryClient();

  const user = useMutation({
    queryKey: ["updated"],
    mutationFn: async (data) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/webhooks/updateUser`,
        data,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(res.data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["adminData"]);
      console.log("Success Data:", data); // Log to verify data

      toast.success(data.message);
      // window.location.reload();
      // Invalidate the adminData query to trigger refetch
      navigate("/");
    },
    onError: (error) => {
      toast.error("Updation failed, please try again : ", error.message);
      navigate("/");
    },
  });

  //   FOR ONSUBMIT

  const onSubmit = (data) => {
    console.log(data);
    
    const updateUser = {
      ...data,
      userImg: cover.filePath,
    };
    user.mutate(updateUser);
    console.log(updateUser);
  };

  // FOR USER INFO

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
  console.log(userData);

  return (
    <>
    
   <div className="fixed bg-black  w-full right-0 bottom-0 opacity-[.3] h-full ">
     
   </div>
   <div
      className="md:w-[40%] w-[50%] h-3/5 text-black animate-slide fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded shadow-xl shadow-gray-800 bg-white z-20 overflow-y-auto
    "
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold md:text-xl text-lg  ">Personal Details</h1>
          <button className="text-lg font-bold" onClick={()=>setUpdate(false)}>X</button>
        </div>
        {/* PROFILE */}
        <div className="mb-6 flex justify-between items-center md:gap-0 gap-4 md:flex-row flex-col">
          {/* EDIT PROFILE */}
          <div className="flex items-center lg:flex-row flex-col gap-4">
            <Image
              src={userData?.userImg || "/User.png?updatedAt=1735717183257"}
              className="md:w-20 md:h-20 w-24 h-24 rounded-full bg-cover"
            />
            <h1 className="text-lg font-semibold">
              {userData?.fullName || "User Name"}
            </h1>
          </div>
          <button
            className="border border-gray-400 py-1 px-2 text-sm shadow-sm shadow-gray-400 rounded"
            onClick={() => setEditProfile((prev) => !prev)}
          >
            Edit profile
          </button>
        </div>
        {editProfile && (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* FOR USERNAME */}
            <div className="mb-4 flex md:flex-row flex-col gap-2 md:gap-8 md:items-center  items-start">
              <label
                htmlFor="username"
                className=" text-sm font-medium text-gray-700 mb-2"
              >
                username
              </label>
              <input
                {...register("username", {
                  pattern: {
                    value: /^[a-z]+[0-9]/,
                    message:
                      "Username must contain only lowercase plus letters",
                  },
                })}
                className="w-3/4 px-3 py-2 border outline-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter username"
                id="username"
                name="username"
              />
            </div>
            {/* ERROR IN USERNAME */}
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
            {/* FOR FULLNAME */}
            <div className="mb-4 flex  gap-2 md:gap-8 md:items-center items-start md:flex-row flex-col">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Fullname
              </label>
              <input
                {...register("fullname")}
                className="w-3/4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm  "
                placeholder="Enter fullname"
                id="fullname"
                name="fullname"
              />
            </div>
            {/* ERROR IN USERNAME */}
            {errors.fullname && (
              <p className="text-xs text-red-500">{errors.fullname.message}</p>
            )}
            <div className="mb-4 text-start">
              <Upload
                setProgress={setProgress}
                setCover={setCover}
                type="image"
              >
                <span className="w-max p-2  shadow-md rounded-xl text-sm text-gray-900 bg-white">
                  Add a profile image
                </span>
              </Upload>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button
                className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={user.isPending || (0 < progress && 100 < progress)}
              >
                <span typeof="submit">
                  {user.isPending ? "saving..." : "save"}
                </span>
              </button>
              {"Uploading :: " + progress}
            </div>
          </form>
        )}
        {/* EMAIL ADDRESS */}
        <div className="text-start mb-6 flex flex-col gap-2">
          <h2 className="text-[18px] font-[550] mt-4 ">Email Adressess</h2>
          <p className="text-sm text-gray-600">{userData?.email}</p>
        </div>
        {/* CONNECTED ACCOUNTS */}
        {/* <div>
      <h1>Connected Accounts</h1>
    </div> */}
      </div>
    </div>
    </>
   
  );
};

export default ShowPopUp;
