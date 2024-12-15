import React from "react";
import Image from "../utils/Image.jsx";
const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8 ">
      <div className="flex items-center gap-4">
        <Image
          src="Blogging%20Website/userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          w="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm to-gray-500">2 days ago</span>
      </div>
      <div className=" mt-4">
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eos qui sunt iusto reiciendis? Alias recusandae nulla quibusdam suscipit nostrum expedita, cupiditate tempora doloribus eum possimus nemo quod ipsa vitae?</p>
      </div>
    </div>
  );
};

export default Comment;
