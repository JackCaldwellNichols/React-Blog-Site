import React, { useContext, useState } from 'react'
import '../styles/write.css'
import axios from 'axios'
import { Context } from '../context/Context.js'

const Write = () => {
    const {user} = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user.username,
            title: title,
            desc: desc,
        };
        if(file){
            const data = new FormData()
            const filename= Date.now() + file.name;
            data.append('name', filename)
            data.append('file', file)
            newPost.postPhoto = filename
            try {
                await axios.post(process.env.REACT_APP_SERVER_URL + '/uploads', data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
          const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/posts', newPost)
          window.location.replace('/post/' + response.data._id)
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className='write'>
        {file && 
        <img src={URL.createObjectURL(file)} alt='' className='writeImg'/>
        }
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor='fileInput'>
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type='file' id='fileInput' style={{display: 'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
                <input type='text' placeholder='Title' className='writeInput' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Tell your story...' type='text' className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)}>
                </textarea>
            </div>
            <button className='writeSubmit' type='submit' >Post</button>
        </form>
    </div>
  )
}

export default Write
