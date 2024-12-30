import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItem from "../components/PostListItem";
import { useAuth } from "../context/userContext";

const SavedPosts = () => {
    const {token}=useAuth();
  const savedPosts = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/saved-posts`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
       console.log(res.data);
      return res.data;
    },
    enabled: !!token,
  });
  console.log(savedPosts?.data);

  if (savedPosts.isLoading) return <p>Loading...</p>;
  if (savedPosts.isError) return <p>Error: {savedPosts.error.message}</p>;
  


  return (
    <>
        {savedPosts?.data?.length>0?(
            savedPosts?.data?.map((post) => (
              <PostListItem key={post?._id} post={post} />
            ))
      
          ):(
            <h1>NO POSTS</h1>
        )}
  </>
  );
};

export default SavedPosts;
