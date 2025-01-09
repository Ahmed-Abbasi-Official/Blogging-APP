import React, { useEffect, useState } from "react";
import PostListItem from "./PostListItem.jsx";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const fetchPost = async (searchParams,pageParam) => {
  // console.log(searchParams);
  // console.log(pageParam);
  const searchParamsObj = Object.fromEntries([...searchParams]);

  // console.log(searchParamsObj);
  
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`,{
    params: { page: pageParam, limit: 2 ,...searchParamsObj }
  }); 
  return res.data;
};
const PostList = () => {
  const [searchParams,setSearchParams]=useSearchParams();
  // console.log(searchParams);
  
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
    queryFn:({pageParam=1})=>fetchPost(searchParams, pageParam),
    getNextPageParam:(lastPage,allPages) => {
        return lastPage.allPosts.length===2 ? allPages.length + 1 :undefined; 
    }
  });
   //  USE EFFECT

   const handleScroll=()=>{
    const bottom=window.innerHeight +window.scrollY >= document.documentElement.scrollHeight -1 ;
        if (bottom && hasNextPage) {
            fetchNextPage();
        }
   }

   useEffect(() => {
    window.addEventListener("scroll",handleScroll);
  return ()=>  window.removeEventListener("scroll",handleScroll);
  }, [hasNextPage])

  if (isFetching === "loading") return "Loading...";
  

  if (status === "error") return "An error has occurred: " + error.message;
  const allPosts = data?.pages[0].allPosts|| [];
  
  // console.log("Data =========>>", data );
  


  return (
    <>
    {
        isFetching ? (
          <p className="text-center mb-6">Loading posts...</p>
        ) : allPosts.length === 0 && (
          <p className="text-center mb-6">No posts found.</p>
        )
      }
      
            {data?.pages.map((page, idx) => (
              page.allPosts.map((post) => (
                <PostListItem key={post?._id} post={post} />
              ))
            ))
            }
            {
              allPosts.length !== 0 &&(
                !hasNextPage && <h1 className="text-xl font-bold -mt-12">All Posts are Loaded</h1>
              )
            }
         
    </>
  );
  
  
};

export default PostList;