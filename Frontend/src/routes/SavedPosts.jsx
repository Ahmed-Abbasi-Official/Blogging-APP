import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import PostListItem from "../components/PostListItem";

const SavedPosts = () => {
    const {getToken}=useAuth();
  const savedPosts = useQuery({
    queryKey: ["savedPosts"],
    queryFn: async () => {
        const token=await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/saved-posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
  });


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
