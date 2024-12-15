import React from 'react'
import {useUser} from '@clerk/clerk-react'
const Write = () => {
  const {isloaded,isSignedIn}=useUser();
  if(!isloaded){
   return  <div className="">Loading...</div>
  }
  if(isloaded && !isSignedIn){
   return  <div className="">You Should Sign In </div>
  }

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-cl font-light'>Create a New Post</h1>
      <form action="" className='flex flex-col gap-6 flex-1 mb-6'>
        <button className=' w-max p-2 shadow-md rounded-xl text-sm to-gray-500 bg-white'>Add a cover image</button>
        <input type="text" placeholder='My Awesome Story'
        className='text-4xl bg-transparent font-semibold outline-none'
        />
        <div className='flex items-center gap-4'>
          <label htmlFor="" className='text-sm'>Choose a category</label>
          <select name="cat" id="" className='p-2 rounded-xl bg-white shadow-md'>
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="database">Database</option>
            <option value="seo">Search Engines</option>
            <option value="arketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" placeholder='A Short Description'
        className='p-4 rounded-xl bg-white shadow-md'
        />
        <button className='bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36'>Send</button>
      </form>
    </div>
  )
}

export default Write