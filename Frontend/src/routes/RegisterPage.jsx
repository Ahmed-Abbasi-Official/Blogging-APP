// import { SignUp } from "@clerk/clerk-react";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Conf/firebase"; 
import VerifiedPopUp from "../components/VerifiedPopUp";


const RegisterPage = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [otpPopUp, setOtpPopUp] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const navigate=useNavigate();
  const provider = new GoogleAuthProvider();
  
  // const {storeTokenInLs}=useAuth();

  // NEW USER

  const newUser = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/webhooks/signup`, data);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      setUserId(data?.data?.userId)
      toast.success(data.message);
      setOtpPopUp(true)
      // navigate('/login');
    },
    onError: (error) => {
      
      
      if (error.response?.status === 400 && error.response?.data?.message === 'Email already registered') {
        toast.error('This email is already registered. Please try logging in.');
      }
      else if(error.response?.status === 400 && error.response?.data?.message === 'username already registered'){
        toast.error('This username is already registered. Please try logging in.');
      } else {
        toast.error('Registration failed, please try again.');
      }
    },
  });
  
  

  // FOR USEFORM

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //  For PASSWORD SEEN UN SEEN
  
  const handleSeePassword = (e) => {
    setSeePassword(!seePassword);
  };

  //  FOR ON SUBMIT

  const onSubmit = (data) => {
    setEmail(data?.email);
    newUser.mutate(data);
    
  };
  

  //  FOR GOOGLE

  const handleGoogleBtnClick =async () => {
  
  
       signInWithPopup(auth, provider)
     .then((result) => {
       const credential = GoogleAuthProvider.credentialFromResult(result);
       const token = credential.accessToken;
       const user = result.user;
       console.log(user);
   
      const data = {
           username: user?.email.split(' ')[0].slice(0,8),
           fullname:user.displayName || "fullname",
           email: user.email || "eamil",
           userImg: user.photoURL || "/User.png",
           isVerified: user.emailVerified || "fale",
         };
         
         
         return newUser.mutate(data)
       
     }).catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       const email = error.customData.email;
       const credential = GoogleAuthProvider.credentialFromError(error);
       // ...
     });
   
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="my-6 flex items-center pb-6 flex-col bg-gray-50 rounded-2xl justify-center">
        <div className="w-full sm:w-96 bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="text-gray-500 mt-1 text-sm text-center">
              Welcome! Please fill in the details to get started
            </p>
          </div>

          <form  onSubmit={handleSubmit(onSubmit)}>
            {/* Username Input */}
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                username
              </label>
              <input
                {...register("username", {
                  required: "Username is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter username"
                id="username"
                name="username"
              />
              {/* ERROR IN USERNAME */}
              {/* {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )} */}
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address or username
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                // name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter your email address"
              />
            </div>

            {/* Password Input */}

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "password is required",
                })}
                // ref={passwordFieldRef}
                type={seePassword ? "text": "password"}
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent placeholder-gray-400 text-sm"
                placeholder="Enter your password"
              />
              {/* ERROR IN PASSWORD */}
              {/* {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )} */}
              <div
                className="absolute bottom-[10px] right-4 cursor-pointer hover:scale-105"
                onClick={handleSeePassword}
              >
                {seePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>

            {/* Continue Button */}
            <button className="w-full bg-gray-900 text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition-colors flex items-center justify-center">
              <span typeof="submit">Continue</span>
              <span className="ml-2">→</span>
            </button>
          </form>

          {/* Divider */}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}

          <div className="flex items-center gap-3 mb-2">
            {/* Google Button */}
            <button className="flex justify-center items-center w-full h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={handleGoogleBtnClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/login" className="text-gray-900 hover:underline">
              Sign in
            </Link>
          </p>

              {/* FOR VERIFIED POPUP */}

              {
                otpPopUp ?
                (<div >
                  <VerifiedPopUp email={email} userId={userId}  />
                  </div>):(null)
              }
          
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
