import React, { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <h1 className="mb-8 text-2xl">Delvelopment Blog</h1>
      <button
       onClick={() => setOpen((prev) => !prev)}
       className="bg-blue-800 text-sm text-white px-4 py-2 rounded-2xl md:hidden mb-4 hover:bg-blue-900 transition-all ease-out duration-500"
       >
        {open ? "Close" : "Filter Search"}
      </button>
      <div className="flex md:flex-row flex-col-reverse gap-8">
      <div className="">
        <PostList />
      </div>
      <div className={`${open ? 'block' : 'hidden' } md:block`}>
        <SideMenu />
      </div>
      </div>
    </div>
  );
};

export default PostListPage;
