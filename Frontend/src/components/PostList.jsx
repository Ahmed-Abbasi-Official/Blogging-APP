import React, { useState } from "react";
import PostListItem from "./PostListItem.jsx";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostData } from "../context/postContext.jsx";
import { useSearchParams } from "react-router-dom";

const fetchPost = async ({ pageParam ,searchParams}) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  // console.log(searchParamsObj);
  
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 5, ...searchParamsObj },
  });
  return res.data;
};
const PostList = () => {
  const [searchParams] = useSearchParams();
  
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts",searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPost({ pageParam, searchParams }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (isFetching === "loading") return "Loading...";

  if (status === "error") return "An error has occurred: " + error.message;
  // console.log("Data =========>>", data);

  const allPosts = data?.pages?.flatMap((page) => page.allPosts) || [];

  return (
    <>
      {allPosts.length > 0 ? (
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchNextPage}
          hasMore={!hasNextPage}
          loader={<h4>Loading more Posts...</h4>}
          endMessage={
            <p>
              <b>All Posts Loaded</b>
            </p>
          }
        >
          {allPosts.map((post) => (
            <PostListItem key={post?._id} post={post} />
          ))}
        </InfiniteScroll>
      ) : (
        <p>No Posts Available</p>
      )}
    </>
  );
  
};

export default PostList;