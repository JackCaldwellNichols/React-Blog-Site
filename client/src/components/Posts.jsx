import React from 'react'
import Post from './Post.jsx'
import '../styles/posts.css'

const Posts = ({posts}) => {
  return (

    <>
        {posts.length !== 0 ? (
    <div className='posts'>
             {posts.map((post=>(
              <Post post={post} key={post._id}/>
  
            )))}
    </div>
      ) : (
        <div className='posts'>
          Oops! No posts to show! 
        </div>
      )}
    </>  
  )
}

export default Posts
