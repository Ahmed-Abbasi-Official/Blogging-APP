import React from 'react'
import { categoriesList } from '../constants/Constant'
import Button from '../utils/Button'
import Search from './Search'

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
       <Search/>

    </div>
  )
}

export default MainCategories