import React, { useState } from "react";
import OtpInput from "./OtpInput";
import Image from "../utils/Image";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fetchCheckOtp = async (otp) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/webhooks/verifyemail`,
    { code: otp }
  );
//   console.log(res);
  return res.data;
};

const VerifiedPopUp = ({ email }) => {
  const [getOtp, setGetOtp] = useState("");
  const navigate=useNavigate();
  

  //   FOR VERIFIED OTP

  const checkOtp = useMutation({
    mutationFn: fetchCheckOtp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(data?.message);
      navigate('/login')
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
    console.log("Done");
    if (getOtp) return checkOtp.mutate(getOtp);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[50%] p-2 py-4 bg-white  text-black text-center rounded-lg ">
      <div className="flex flex-col justify-center items-center gap-2">
        <img src="/logo.png" className="w-16 h-16" />
        <h2 className="text-lg font-bold text-[#444] ">Bloggify</h2>
        <p className="mb-4 w-[60%] text-[12px] text-[#bebebe">
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
      </div>
    </div>
  );
};

export default VerifiedPopUp;
