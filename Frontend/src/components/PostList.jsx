import React from "react";
import PostListItem from "./PostListItem.jsx";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPost = async ({ pageParam }) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam },
  });
  return res.data;
};
const PostList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPost(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (isFetching === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  console.log("Data =========>>", data);

  const allPosts=data?.pages?.flatMap((page)=>page.allPosts) || [];

  return (
    <div className="flex   flex-wrap  gap-8 mb-8">

      {allPosts.map((post)=>(
      <PostListItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
