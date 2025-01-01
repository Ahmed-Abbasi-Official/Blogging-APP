import React, { useState } from "react";
import "../transition.css";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import { useAuth } from "../context/userContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ShowPopUp = ({showPopUp,setShowPopUp}) => {
  const [cover, setCover] = useState("");
  const [progress, setProgress] = useState(0);
  const [edit, setEdit] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

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
    // console.log(res.data);
    return res.data;
  },
  onSuccess: (data) => {
    console.log("Success Data:", data); // Log to verify data
    toast.success(data.message);

    // Invalidate the adminData query to trigger refetch
    queryClient.invalidateQueries(["adminData"]);
    window.location.reload();
    navigate("/");
  },
  onError: (error) => {
    toast.error("Updation failed, please try again : ", error.message);
    navigate("/");
  },
});

  //   FOR ONSUBMIT

  const onSubmit = (data) => {
    const updateUser = {
      ...data,
      userImg: cover.filePath,
    };
    user.mutate(updateUser);
    console.log(updateUser);
  };

  // FOR LOAGOUT

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/login");
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
  // console.log(userData);

 

  return (
    <div className=" text-black flex flex-col    items-center justify-center px-6 md:px-12 gap-4 rounded shadow-sm shadow-black  absolute   md:right-64 lg:right-96 top-32 w-[90%]  md:w-[55%]   h-[50%] z-20 bg-white">
      <span className="md:hidden block absolute top-4 text-xl font-bold right-4" onClick={()=>setShowPopUp(false)}>{showPopUp ? "X" : "none"}</span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* FOR USERNAME */}
        <div className="mb-4 flex gap-2 md:gap-8 items-center">
          <label
            htmlFor="username"
            className=" text-sm font-medium text-gray-700 mb-2"
          >
            username
          </label>
          <input
            readOnly={edit ? true : false}
            {...register("username", {
              pattern: {
                value: /^[a-z]+[0-9]/,
                message: "Username must contain only lowercase plus letters",
              },
            })}
            className="w-full px-3 py-2 border outline-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-800 text-sm"
            placeholder={userData?.username}
            id="username"
            name="username"
          />
          <span onClick={() => setEdit(false)}>
            <img
              src="/edit.png"
              alt="edit_user"
              className="w-9 h-9 cursor-pointer bg-cover"
            />
          </span>
          </div>
          {/* ERROR IN USERNAME */}
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        {/* FOR FULLNAME */}
        <div className="mb-4 flex  gap-2 md:gap-8 items-center">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fullname
          </label>
          <input
          readOnly={edit ? true : false}
            {...register("fullname")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-800 text-sm"
            placeholder={userData?.fullName || "Enter fullname"}
            id="fullname"
            name="fullname"
          />
          <span onClick={() => setEdit(false)}>
            <img
              src="/edit.png"
              alt="edit_user"
              className="w-9 h-9 cursor-pointer bg-cover"
            />
          </span>
          </div>
          {/* ERROR IN USERNAME */}
          {errors.fullname && (
            <p className="text-xs text-red-500">{errors.fullname.message}</p>
          )}
        <div className="mb-4">
          <Upload setProgress={setProgress} setCover={setCover} type="image">
            <span className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
              Add a profile image
            </span>
          </Upload>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-blue-800 text-white font-medium rounded-xl p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={user.isPending || (0 < progress && 100 < progress)}
          >
            <span typeof="submit">{user.isPending ? "saving..." : "save"}</span>
          </button>
         
          <button
            className="w-full bg-gray-900 text-white rounded-lg py-1 px-2 hover:bg-gray-800 transition-colors flex items-center justify-center"
            onClick={handleLogout}
          >
            <span typeof="submit">Logout</span>
          </button>
        </div>
          {"Progress :: " + progress}
      </form>
    </div>
  );
};

export default ShowPopUp;
