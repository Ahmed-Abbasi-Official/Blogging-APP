import React from "react";
import Search from "../components/Search.jsx";
import Button from "../utils/Button.jsx";
import { useSearchParams } from "react-router-dom";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {

      
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });

    }
  };

  const handleCategoryChange = (category) => {
    
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
    console.log(Object.fromEntries(searchParams.entries()));
  };

  return (
    <div className="px-4 h-max sticky top-8 ">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white "
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white "
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white "
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white "
          />
          Oldest
        </label>
      </div>
      <h1 className="mb-4 mt-8 text-sm font-medium">Categaries</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span  onClick={()=>handleCategoryChange('general')} >
          {" "}
          <Button containerClass="underline" to="/posts" value="All" />
        </span>
        <span onClick={()=>handleCategoryChange('web-design')} >
          {" "}
          <Button
            containerClass="underline cursor-pointer"
            to="/posts?cat=web-design"
            value="Web Design"
          />
        </span>
        <span onClick={()=>handleCategoryChange('development')} >
          <Button
            containerClass="underline"
            to="/posts?cat=development"
            value="Development"
          />
        </span>
        <span onClick={()=>handleCategoryChange('databases')} >
          <Button
            containerClass="underline"
            to="/posts?cat=databases"
            value="Database"
          />
        </span>
        <span onClick={()=>handleCategoryChange('seo')} >
          {" "}
          <Button
            containerClass="underline"
            to="/posts?cat=seo"
            value="Search Engine"
          />
        </span>
        <span onClick={()=>handleCategoryChange('marketing')} >
          <Button
            containerClass="underline"
            to="/posts?cat=marketing"
            value="Marketing"
          />
        </span>
      </div>
    </div>
  );
};

export default SideMenu;
