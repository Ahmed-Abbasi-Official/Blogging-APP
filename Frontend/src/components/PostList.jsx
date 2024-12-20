import React from 'react'
import PostListItem from './PostListItem.jsx'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const fetchPost=async()=>{
   const res=await axios.get(`${import.meta.env.VITE_API_URL}/posts`)
   return res.data;
}
const PostList = () => {
  
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchPost(),
      
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  console.log("Data =========>>",data);
  
  return (
    <div className='flex   flex-wrap  gap-8 mb-8'>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
       
    </div>
  )
}

export default PostList