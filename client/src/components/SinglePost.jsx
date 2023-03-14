import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, Link, useNavigate} from 'react-router-dom'
import { Context } from '../context/Context'
import '../styles/singlepost.css'

const SinglePost = () => {
    const {user, dispatch} = useContext(Context)
    const PF = 'http://localhost:4000/images/'
    const location = useLocation()
    const postId = location.pathname.split('/')[2]
    const [post, setPost] = useState([])
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    const handleUpdate = async () => {
        try {
            await axios.put(process.env.REACT_APP_SERVER_URL + '/posts/' + postId, 
           {username:user.username, title: title, desc: desc}
        )
            setUpdateMode(false)
        } catch (error) {
            console.log(error)
        }
    }

    const navigate = useNavigate()
    const handleDelete = async () => {
        try {
            await axios.delete(process.env.REACT_APP_SERVER_URL + '/posts/' + postId, {
            data: {username:user.username}
        })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(()=>{
    const fetchPost = async () => {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/posts/' + postId)
        setPost(response.data)
        setTitle(response.data.title)
        setDesc(response.data.desc)
    }
    fetchPost()

   }, [postId])
  return (
    <div className='singlePost'>
        <div className="singlePostWrapper">
            {
                post.postPhoto && (
                <img className='singlePostImage' src={PF + post.postPhoto} alt=''/>
            )}
            {updateMode ? (
                <input type='text' name='Title' value={title} onChange={(e)=>setTitle(e.target.value)} className='singlePostTitleInput' autoFocus/>
            ) : 
            <h1 className='singlePostTitle'>
                {title}
                {user.username === post.username &&
                <div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen" onClick={()=>setUpdateMode(true)}></i> 
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                </div>
                }
            </h1>
            }
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Author: 
                    <Link to={`/?user=${post.username}`} className='link'>
                        <b>{post.username}</b>
                    </Link>
                </span>
                <span className='singlePostDate'>Posted: {new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
                <textarea className='singlePostDescInput' value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            ) : (
                <p className='singlePostDesc'>{desc}</p>
            )}

        </div>
        {updateMode && (
            <div className='buttonContainer'>
                <button className='updateButton' onClick={handleUpdate}>Update</button>
                <button onClick={()=>setUpdateMode(false)} className='cancelUpdateButton'>Cancel</button>
            </div>
        )}
    </div>
  )
}

export default SinglePost
