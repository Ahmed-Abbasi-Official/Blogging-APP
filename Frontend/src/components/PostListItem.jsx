import React from "react";
import Image from "../utils/Image.jsx";
import Button from "../utils/Button.jsx";
const PostListItem = () => {
  return (
    <div className="flex  max-w-[48.1%] flex-col  flex-wrap gap-8 xl:gap-0">
      {/* IMAGE */}
    <div className="flex gap-8 xl:flex-col flex-col mb-8">
    <div className="md:hidden xl:block xl:w-9/12">
        <Image
          src="Blogging%20Website/postImg.jpeg"
          className="rounded-2xl object-cover"
          w={735}
        />
      </div>
      {/* DETAILS */}
      <div className="flex flex-col gap-4 xl:w-10/12">
        <Button
          value="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          to="/test"
          containerClass="text-4xl font-semibold "
        />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span>Written by</span>
        <Button containerClass="text-blue-800" value="John Doe" />
        <span>on</span>
        <Button containerClass="text-blue-800" value="Web Design" />
        <span>2 days ago</span>
      </div>
          <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim alias nostrum dolorum similique molestiae numquam asperiores totam debitis iusto! Distinctio ab sint ea velit facere vel quae impedit fugit nihil!</p>
          <Button
          to='/test'
          value='Read More'
          containerClass='text-sm underline text-blue-800'
          />
      </div>
    </div>
   
   
   
    </div>
  );
};

export default PostListItem;
