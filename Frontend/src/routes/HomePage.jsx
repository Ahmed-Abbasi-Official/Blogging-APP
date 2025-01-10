import React from "react";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";
import { useAuth } from '../context/userContext'

const HomePage = () => {
  const {isAuthenticated}=useAuth();
  // console.log("Login===>>>",isAuthenticated);
  return (
    <div className="mt-4 flex flex-col gap-4 overflow-hidden">
      {/* BREADCRUMB */}
      <div className="flex gap-4   ">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}

      <div className="flex items-center justify-between">
        {/* TITLES */}

        <div className="">
          <h1 className="text-4xl text-gray-800 md:text-5xl lg:text-6xl font-bold">
          Explore ideas, insights, and inspiration for everyday growth.
          </h1>
          <p className="mt-8 text-lg md:text-lg">
          A dynamic blogging app for effortlessly creating, managing, and sharing content.
          </p>
        </div>
        {/* ANIMATED BUTTON */}
        <Button
          containerClass="hidden md:block relative"
          to="/write"
          value={
            <>
              <svg
                // className="text-lg tracking-widest"
                className="text-lg tracking-widest animate-spin animatedButton "
                viewBox="0 0 200 200"
                width="200"
                height="200"
              >
                <path
                  id="circlePath"
                  fill="none"
                  d="M 100, 100 m -75 , 0 a 75, 75 0 1 , 1 150 , 0 a 75, 75 0 1,1 -150,0"
                ></path>
                <text>
                  <textPath startOffset="0%" href="#circlePath">
                    Write your story •
                  </textPath>
                  <textPath startOffset="50%" href="#circlePath">
                    Share your idea •
                  </textPath>
                </text>
              </svg>
              <button
                className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="50"
                  height="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <line x1="6" y1="18" x2="18" y2="6" />
                  <polyline points=" 9 6 18 6 18 15" />
                </svg>
              </button>
            </>
          }
        />
      </div>
      {/* CATEGARIES */}
      <MainCategories/>
      {/* FEATURES POST */}
      <FeaturedPosts/>
      {/* POST LIST */}
      <div className="">
        <h1 className="text-gray-600 my-8 text-2xl">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default HomePage;
