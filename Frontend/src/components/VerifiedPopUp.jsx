import React, { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import Image from "../utils/Image";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fetchCheckOtp = async (otp, userId) => {
  // console.log(otp,userId);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/webhooks/verifyemail`,
    { otp, userId }
  );
  //   console.log(res);
  return res.data;
};
const fetchResendOtp = async (userId, email) => {
  // console.log(otp,userId);
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/webhooks/resendOTP`,
    { userId, email }
  );
  //   console.log(res);
  return res.data;
};

const VerifiedPopUp = ({ email, userId }) => {
  // console.log(userId);

  const [getOtp, setGetOtp] = useState("");
  const [timer, setTimer] = useState();
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isResendDisabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [timer, isResendDisabled]);
  4;
  console.log("isResendDisabled", isResendDisabled);

  const handleVerifyOTP = async () => {
    await verifyOTP(otp);
  };

  //   FOR VERIFIED OTP

  const checkOtp = useMutation({
    mutationFn: (otp) => fetchCheckOtp(otp, userId),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      navigate("/login");
    },
    onError: (error) => {
      const cError = error?.response?.data?.message;
      toast.error(cError);
    },
  });
  // FOR RESEND OTP
  const resendOtp = useMutation({
    mutationFn: () => fetchResendOtp(userId, email),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      // navigate('/login')
    },
    onError: (error) => {
      const cError = error?.response?.data?.message;
      toast.error(cError);
    },
  });

  const onOtpSubmit = (otp) => {
    setGetOtp(otp);
  };

  const handleOtp = () => {
    console.log("Done1");
    if (getOtp) return checkOtp.mutate(getOtp);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[65%] md:w-[55%] lg:w-[40%] md:h-[55%] h-[65%] p-2 py-4 bg-white  text-black text-center rounded-lg shadow-2xl shadow-black ">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src="/logo.png" className="w-16 h-16" />
        <h2 className="text-lg font-bold text-[#444] ">Bloggify</h2>
        <p className="mb-4 w-[90%] sm:w-[60%] text-[12px] text-[#bebebe">
          We have sent a verification code to your email{" "}
          <strong>{email || "email"}</strong>. Please enter it below to
          continue.
        </p>
        <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
        <button
          className="mt-4 px-12 py-2 bg-blue-800 hover:bg-blue-500 rounded-lg text-white"
          disabled={!getOtp && true}
          onClick={handleOtp}
        >
          Verify
        </button>
        <p className="text-xs text-gray-700">
          Dont't recive code?{" "}
          <button
            className="text-blue-700 font-semibold cursor-pointer hover:text-blue-900 disabled:text-gray-400 disabled:cursor-not-allowed"
            onClick={() => {
              resendOtp.mutate();
              setIsResendDisabled(true);
              setTimer(60);
            }}
            disabled={isResendDisabled}
          >
            Resend
            {isResendDisabled && `(${timer}s)`}
          </button>
        </p>
        
      </div>
    </div>
  );
};

export default VerifiedPopUp;
