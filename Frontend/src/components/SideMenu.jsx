import React from 'react'
import Search from '../components/Search.jsx'
import Button from '../utils/Button.jsx'

const SideMenu = () => {
  return (
    <div className='px-4 h-max sticky top-8 '>
      <h1 className='mb-4 text-sm font-medium'>Search</h1>
      <Search/>
      <h1 className='mb-4 mt-8 text-sm font-medium'>Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='newest' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white '/>
          Newest
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='popular' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white '/>
          Most Popular
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='trending' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white '/>
          Trending
        </label>
        <label htmlFor="" className='flex items-center gap-2 cursor-pointer'>
          <input type="radio" name='sort' value='oldest' className='appearance-none w-4 h-4 border-[1.5px] border-blue-800 hover:cursor-pointer rounded-sm checked:bg-blue-800 bg-white '/>
          Oldest
        </label>
      </div>
      <h1 className='mb-4 mt-8 text-sm font-medium'>Categaries</h1>
      <div className='flex flex-col gap-2 text-sm'>
        <Button
        containerClass="underline"
        to='/posts'
        value='All'
        />
        <Button
        containerClass="underline"
        to='/posts?cat=web-design'
        value='Web Design'
        />
        <Button
        containerClass="underline"
        to='/posts?cat=development'
        value='Development'
        />
        <Button
        containerClass="underline"
        to='/posts?cat=database'
        value='Database'
        />
        <Button
        containerClass="underline"
        to='/posts?cat=seo'
        value='Search Engine'
        />
        <Button
        containerClass="underline"
        to='/posts?cat=marketing'
        value='Marketing'
        />
      </div>
    </div>
  )
}

export default SideMenu