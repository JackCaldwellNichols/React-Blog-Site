import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/post.css'
const Post = ({post}) => {

    const PF = 'http://localhost:4000/images/'
    return (
        <div className='post'>
            {
                post.postPhoto && 
                <img className='postImg' alt='' src={PF + post.postPhoto}/>
            }
           
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((cat)=> (
                         <span className='postCat'>{cat.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className='postDesc'>
                {post.desc}
            </p>
        </div>
    )
}

export default Post
