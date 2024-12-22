import React from "react";
import PostListItem from "./PostListItem.jsx";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostData } from "../context/postContext.jsx";

const PostList = () => {
  const {fetchPost}=PostData();
  
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

  const allPosts = data?.pages?.flatMap((page) => page.allPosts) || [];

  return (
    <>
      {allPosts.length > 0 ? (
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<h4>Loading more Posts...</h4>}
          endMessage={
            <p>
              <b>All Posts Loaded</b>
            </p>
          }
        >
          {allPosts.map((post) => (
            <PostListItem key={post._id} post={post} />
          ))}
        </InfiniteScroll>
      ) : (
        <p>No Posts Available</p>
      )}
    </>
  );
  
};

export default PostList;
