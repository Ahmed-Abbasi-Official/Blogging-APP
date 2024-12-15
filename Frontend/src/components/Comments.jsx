import React from "react";
import Comment from "../components/Comment.jsx";

const Comments = () => {
  return (
    <div className="flex flex-col gap-8 lg:w-3/5">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>

      {/* INPUT + SEND BUTTON */}

      <div className="flex gap-8 justify-between w-full items-center">
        <textarea
          className="rounded-xl w-full outline-none px-4 py-4 "
          placeholder="Write a comment..."
        />
        <button className="bg-blue-800 px-4 py-3 font-medium text-white rounded-xl outline-none hover:bg-blue-950 transition-all duration-300 ease-out ">
          Send
        </button>
      </div>

      {/* SINGLE COMMENT LIST */}

      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;
