import React, { useState } from "react";
import Comment from "../components/Comment.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/userContext.jsx";

const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  
  const [value,setValue]=useState(' ')
  const { token } = useAuth();
  // console.log(token);
  

  const userInfo = useQuery({
    queryKey: ["user",postId],
    queryFn: async() =>{
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/user`,{
        headers: { Authorization:`${token}` },
      })
     
      
      return res.data
    } ,
    
  });

  if(userInfo.error){
    console.log(error);
  }
  
  const user=userInfo?.data?.userData;
  // console.log(user);
  
  
  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });
  // console.log(data);

  if(isLoading) {
    <div>load</div>
  }
  if(error) {
    <div>{error}</div>
  }
  
  const queryClient = useQueryClient();

  // MUTAION FUNCTIONALITY

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: { Authorization: `${token}` },
        }
      );
      return data.post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });


  //  HANDLE SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const data = {
      desc: formData.get("desc"),
    };
    // console.log(data);
    
    setValue('')
    
    mutation.mutate(data);
  };
  

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>

      {/* INPUT + SEND BUTTON */}

      <form
        onSubmit={handleSubmit}
        className="flex gap-8 justify-between w-full items-center"
      >
        <textarea
          name="desc"
          value={value}
          onChange={(e)=>setValue(e.target.value)}
          className="rounded-xl w-full outline-none px-4 py-4 "
          placeholder="Write a comment..."
        />
        <button className="bg-blue-800 px-4 py-3 font-medium text-white rounded-xl outline-none hover:bg-blue-950 transition-all duration-300 ease-out ">
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
      {isLoading
        ? "Loading .... "
        : error
        ? "Error in Loading Comments........"
        :<>
        {
          mutation.isPending &&(
            <Comment comment={{
              desc:`${mutation.variables.desc} (Sending wait...)`,
              createdAt: new Date(),
              user:{
                img:user?.imageUrl,
                username:user?.username
              }


            }}/>
          )
        }
        {data.map((comment) => (
            <Comment key={comment._id} comment={comment} post={fetchComments} 
            postId={postId}
            qu={["comments", postId]}
            />
          ))}
        </>}
    </div>
  );
};

export default Comments;
