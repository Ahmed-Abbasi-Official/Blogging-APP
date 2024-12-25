import React from "react";
import Image from "../utils/Image.jsx";
import { format } from "timeago.js";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Comment = ({ comment }) => {
  let image=comment?.user.userImg;
  console.log(image);
  
  
  
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate=useNavigate();

  //  GET USER

  const {
    isPending: isAdminPending,
    error: adminError,
    data: adminData,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      const token = await getToken();
      return await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  //  DELETE COMMENT

  const handelDelete=async()=>{
     await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${comment._id}`);
    toast.success(`Comment deleted`)
    return navigate(`/`);
  }

  const role=adminData?.data?.role==="admin"? true : false;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8 ">
      <div className="flex items-center gap-4">
        <img
          src={image}
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm to-gray-500">{format(comment.createdAt)}</span>
        {user &&
          (comment.user.username === user.username || role ) && (
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={() => handelDelete()}
            >
              delete
              {/* {mutation.isPending && <span>(in progress)</span>} */}
            </span>
          )}
      </div>
      <div className=" mt-4">
        <p className="text-justify">{comment.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
