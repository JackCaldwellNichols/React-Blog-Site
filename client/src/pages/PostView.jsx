import React from 'react'
import Sidebar from '../components/Sidebar'
import SinglePost from '../components/SinglePost'
import '../styles/postview.css'

const PostView = () => {
  return (
    <div className='single'>
        <SinglePost />
        <Sidebar />
    </div>
  )
}

export default PostView
