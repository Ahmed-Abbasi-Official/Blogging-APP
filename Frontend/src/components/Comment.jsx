import React from "react";
import { format } from "timeago.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/userContext.jsx";

const deletePost=async(id)=>{
 const res= await axios.delete(`${import.meta.env.VITE_API_URL}/comments/${id}`);
 
 toast.success(`Comment deleted`)
  return res
}

const Comment = ({ comment,postId,qu }) => {
  let image=comment?.user.userImg;
  // console.log(comment);
  
  // console.log(image);
  
  
  
  
  const { token } = useAuth();

  //  GET USER

  const {
    isPending: isAdminPending,
    error: adminError,
    data: adminData,
  } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => {
      return await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
        headers: {
          Authorization:`${token}`,
        },
      });
    },
  });

  const user=adminData?.data?.userData
  // console.log(user);
  

  //  DELETE COMMENT
  
  const queryClient=useQueryClient();   // Use to get Cache Data .

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess:(data,id)=>{
        queryClient.setQueryData(qu,(elm)=>{  
         const res= elm?.filter((postId)=>postId._id !== id )
         return res
        })
    }
  })

 

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
              onClick={() => deleteMutation.mutate(comment._id)}
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
