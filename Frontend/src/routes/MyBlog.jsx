import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItem from "../components/PostListItem";
import { useAuth } from "../context/userContext";

const MyBlog = () => {
  const { token } = useAuth();

  const { data: posts, isLoading, isError, error } = useQuery({
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
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      {
        isLoading ?(
          <p>Loading...</p>
        ):(
          posts?.length === 0 && (
            <p className="text-center mb-6">No posts found.</p>
          ) 
        )
      }
     { posts.map((post) => <PostListItem key={post._id} post={post} />)}
    
    </>
  );
};

export default MyBlog;
