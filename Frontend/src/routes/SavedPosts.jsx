import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PostListItem from "../components/PostListItem";
import { useAuth } from "../context/userContext";

const SavedPosts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array

  const { isError, isLoading, data: savedPosts } = useQuery({
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
      // console.log(res.data);
      return res.data; // Ensure the response data matches the expected structure
    },
    enabled: !!token,
  });

  // Update posts when data is successfully fetched
  useEffect(() => {
    console.log(savedPosts);
    
    if (savedPosts) {
      setPosts(savedPosts);
    }
  }, [savedPosts]);

  // Loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: Unable to fetch posts.</p>;
console.log(posts);

  return (
    <div>
      {
        isLoading && (
          <p>
            Loading...
          </p>
        )
      }
      {savedPosts.length === 0 ? (
        <p className="text-center mb-6">No post</p>
      ) : (
        savedPosts?.map((post) => <PostListItem key={post?._id} post={post} />)
      )}
    </div>
  );
};

export default SavedPosts;
