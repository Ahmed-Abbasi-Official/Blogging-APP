import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItem from "../components/PostListItem";
import { useAuth } from "../context/userContext";

const MyBlog = () => {
  const[posts,setPosts]=useState([])
    const {token}=useAuth();
  const savedPosts = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/my-blog`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      //  console.log(res.data);
      return res.data;
    },
  });
  
  

  if (savedPosts?.isPending) return <p>Loading...</p>;
  if (savedPosts?.isError) return <p>Error: {savedPosts.error.message}</p>;
  // console.log(savedPosts.savedPosts);
  useEffect(()=>{
    if(savedPosts?.data){
      setPosts(savedPosts?.data)
    }
  },[savedPosts])
  console.log(posts);
  
  
  


  return (
    <>

    {
      savedPosts.isLoading?(
        <p>Loading...</p>
      ):(
        posts.length===0 && (
          <p className="text-center mb-6">No posts found.</p>
        )
      )
    }


        
            {posts.map((post) => (
              <PostListItem key={post?._id} post={post} />
            ))}
      
          
  </>
  );
};

export default MyBlog;
