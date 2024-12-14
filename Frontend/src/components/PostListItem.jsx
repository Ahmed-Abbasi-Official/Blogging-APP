import React from "react";
import Image from "../utils/Image.jsx";
import Button from "../utils/Button.jsx";
const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* IMAGE */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="Blogging%20Website/postImg.jpeg"
          className="rounded-2xl object-cover"
          w={735}
        />
      </div>
      {/* DETAILS */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Button
          value="Lorem ipsum dolor sit amet consectetur adipisicing elit."
          to="/test"
          containerClass="text-4xl font-semibold"
        />
        <div className="flex items-center gap-2 text-gray-400 text-sm">
        <span>Written by</span>
        <Button containerClass="text-blue-800" value="John Doe" />
        <span>on</span>
        <Button containerClass="text-blue-800" value="Web Design" />
        <span>2 days ago</span>
      </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim alias nostrum dolorum similique molestiae numquam asperiores totam debitis iusto! Distinctio ab sint ea velit facere vel quae impedit fugit nihil!</p>
          <Button
          to='/test'
          value='Read More'
          containerClass='text-sm underline text-blue-800'
          />
      </div>
    </div>
  );
};

export default PostListItem;
