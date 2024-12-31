import React from "react";
import { useForm } from "react-hook-form";

const ShowPopUp = () => {
  // FOR USE FORM

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   FOR ONSUBMIT

  const onSubmit = (data) => {
console.log(data);

  };

  return (
    <div className=" text-black flex flex-col  content-between px-24 py-4 gap-4 rounded shadow-sm shadow-black  absolute top-32 w-[65%]  h-[50%] z-20 bg-white">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* FOR USERNAME */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            username :
          </label>
          <input
            {...register("username", {
              pattern: {
                value: /^[a-z]+[0-9]/,
                message: "Username must contain only lowercase plus letters",
              },
            })}
            className="w-full px-3 py-2 border outline-none border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
            placeholder="Enter username"
            id="username"
            name="username"
          />
          {/* ERROR IN USERNAME */}
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>
        {/* FOR FULLNAME */}
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fullname :
          </label>
          <input
            {...register("fullname", {})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
            placeholder="Enter username"
            id="fullname"
            name="fullname"
          />
          {/* ERROR IN USERNAME */}
          {errors.fullname && (
            <p className="text-xs text-red-500">{errors.fullname.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Profile Pic :
          </label>
          <input type="file"  {...register("img")} />
        </div>
       <div className="flex gap-4">
       <button className="w-full bg-gray-900 text-white rounded-lg py-1 px-2 hover:bg-gray-800 transition-colors flex items-center justify-center">
              <span typeof="submit">Save</span>
            </button>
       <button className="w-full bg-gray-900 text-white rounded-lg py-1 px-2 hover:bg-gray-800 transition-colors flex items-center justify-center">
              <span typeof="submit">Logout</span>
            </button>
       </div>
      </form>
    </div>
  );
};

export default ShowPopUp;
