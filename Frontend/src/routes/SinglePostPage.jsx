import Image from "../utils/Image.jsx";
import Button from "../utils/Button.jsx";
import PostMenuActions from "../components/PostMenuActions.jsx";
import Search from "../components/Search.jsx";
import Comments from "../components/Comments.jsx";
import {useQuery} from '@tanstack/react-query'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { format } from "timeago.js";

const fetchPost=async(slug)=>{
  
   const res=await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`)
   return res.data;
}

const SinglePostPage = () => {
 
  const {slug}=useParams();
  const {isLoading,error,data} = useQuery({
    queryKey: ['post',slug],
    queryFn: () => fetchPost(slug),
  })

  if(isLoading) return "Loading....."
  if(error) return "Error............" + error.message 
  if(!data) return "Post Not Found....."
  console.log("AFTER",data);
  
  return (
    <div className="flex gap-8 flex-col">
      {/* DETAILS */}
      <div className="flex gap-8">
        {/* DETAILS */}
        <div className="lg:w-3/5  flex-col flex gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Button containerClass="text-blue-800" value={data.user.fullName} />
            <span>on</span>
            <Button containerClass="text-blue-800 capitalize" value={data.category}/>
            <span>{format(data.createdAt)}</span>
          </div>
          <p>
            {data.desc}
          </p>
        </div>
        {/* IMAGE */}
        { data?.img &&  <div className="hidden lg:block w-2/5">
           <Image
            src={`${data.img}`}
            alt="SingleImage"
            className="rounded-xl"
            // w={600}
          />
        </div>
          }
      </div>
      {/* CONTENT */}
      <div className="flex md:flex-row flex-col gap-8">
        {/* TEXT */}
        <div
  className="flex flex-col gap-6 lg:text-lg text-justify"
  dangerouslySetInnerHTML={{ __html: data.content }}
></div>

        {/* menu */}
        <div className="px-4 h-max sticky top-8 ">
          <h1  className="font-medium  mb-4 text-sm">Author</h1>
          <div className="flex  flex-col gap-4">
          <div className="flex  items-center gap-8">
           { data.user.userImg && <Image
            src={data.user.userImg}
            className='w-12 h-12 rounded-full object-cover'
            w={48}
            h={48}
            />}
            <Button
            value={data.user.username}
            />
            </div>
            <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur</p>
            <div className="flex gap-2">
            <Button
            value={<Image
            src='Blogging%20Website/facebook.svg'
            alt='Facebook'
            />}
            />
            <Button
            value={<Image
            src='Blogging%20Website/instagram.svg'
            alt='Insta'
            />}
            />
            </div>
            </div>
          <PostMenuActions post={data} />
          <h1  className="font-medium mt-8 mb-4 text-sm">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Button
            value='All'
            containerClass='underline'
            />
            <Button
            value='Web Design'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Development'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Databases'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Search Engines'
            to='/'
            containerClass='underline'
            />
            <Button
            value='Marketing'
            to='/'
            containerClass='underline'
            />
          </div>
          <h1 className="font-medium mt-8 mb-4 text-sm">Search</h1>
          <Search/>
        </div>
      </div>
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
