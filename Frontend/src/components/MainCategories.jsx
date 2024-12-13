import React from 'react'
import { categoriesList } from '../constants/Constant'
import Button from '../utils/Button'

const MainCategories = () => {
  return (
    <div className='hidden  md:flex  bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8'>


        {/* CATEGORIES LINKS */}

        <div className=" flex-1  flex items-center justify-between flex-wrap">
            {
                categoriesList.map((cat)=>(
                    <Button
                    containerClass={`${cat.class} hover:bg-blue-50 px-2 py-1 rounded-full `}
                    key={cat.title}
                    to={cat.path}
                    value={cat.title}
                    />
                ))
            }
        </div>
        <span className='text-xl font-medium'>|</span>
        <div className="bg-gray-100 rounded-full p-2 flex items-center gap-2 ">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="search a post..."
        className="bg-transparent outline-none"
      />
        </div>

    </div>
  )
}

export default MainCategories