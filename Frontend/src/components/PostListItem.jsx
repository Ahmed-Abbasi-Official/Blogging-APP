import React from "react";
import Image from "../utils/Image.jsx";
import Button from "../utils/Button.jsx";
import { format } from "timeago.js";

const PostListItem = ({post}) => {
 

  return (
    <div className="flex   flex-col  flex-wrap gap-8 xl:gap-0 mb-12">
      {/* IMAGE */}
    <div className="flex gap-8 xl:flex-row flex-col mb-8">
    { post?.img && <div className="md:hidden xl:block xl:w-[40%]  ">
        <Image
          src={post?.img || ''}
          className="rounded-2xl object-cover w-full"
          w={735}
        />
      </div>}
      {/* DETAILS */}
      <div className="flex flex-col gap-4 xl:w-10/12">
        <Button
          value={post?.title}
          to={`/${post?.slug}`}
          containerClass="text-4xl font-semibold "
        />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span>Written by</span>
        <Button containerClass="text-blue-800 capitalize " to={`/posts?author=${post?.user?.username}`} value={post?.user.fullName} />
        <span>on</span>
        <Button containerClass="text-blue-800 capitalize" value={post?.category} />
        <span>{format(post?.createdAt)}</span>
      </div>
          <p className="text-justify">{post?.desc}</p>
          <Button
          to={`/${post?.slug}`}
          value='Read More'
          containerClass='text-sm underline text-blue-800'
          />
      </div>
    </div>
   
   
   
    </div>
  );
};

export default PostListItem;
