import React from 'react'
import PostListItem from './PostListItem.jsx'

const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message
  return (
    <div className='flex   flex-wrap  gap-8 mb-8'>
        <PostListItem/>
        <PostListItem/>
        <PostListItem/>
       
    </div>
  )
}

export default PostList