import React, { useContext, useEffect, useState } from 'react'
import { useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import { Context } from '../context/Context'
import '../styles/settings.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Settings = () => {

  const {user, dispatch} = useContext(Context)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const PF = 'http://localhost:4000/images/'

  const handleSubmit = async (e) => {
    dispatch({type:'UPDATE_START'})
    e.preventDefault()
    const updatedUser = {
        userId: user._id,
        username,
        email,
        password
    };
    if(file){
        const data = new FormData()
        const filename= Date.now() + file.name;
        data.append('name', filename)
        data.append('file', file)
        updatedUser.profilePic = filename
        try {
            await axios.post(process.env.REACT_APP_SERVER_URL + '/uploads', data)
        } catch (error) {
            console.log(error)
        }
    }
    try {
      const response = await axios.put(process.env.REACT_APP_SERVER_URL + '/users/' + user._id, updatedUser)
      setSuccess(true)
      dispatch({type:'UPDATE_SUCCESS', payload: response.data})
    } catch (error) {
        console.log(error)
        dispatch({type:'UPDATE_FAILURE'})
    }
}

const handleDelete = async () => { 
  try {
    await axios.delete(process.env.REACT_APP_SERVER_URL + '/users/' + user._id,{
      data: {userId: user._id }
      
    })
    setSuccess(true)
    dispatch({type: 'LOGOUT'})
  } catch (error) {
    setSuccess(false)
    console.log(error)
  }
}

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className='settingsUpdateTitle'>Update Your Account</span>
            <span className='settingsDeleteTitle' onClick={handleDelete}>Delete Your Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src={file ? URL.createObjectURL(file) : PF + user.profilePic}  alt=''/>
                <label htmlFor='fileInput'>
                <i className="settingsUserIcon fa-solid fa-user"></i>    
            </label>
            <input id='fileInput' style={{display: 'none '}} type='file' onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <label>Username</label>
            <input type='text' placeholder={username} onChange={(e)=>setUsername(e.target.value)} />
            <label>Email</label>
            <input type='text' placeholder={email} onChange={(e)=>setEmail(e.target.value)} />
            <label>Password</label>
            <input type='password' onChange={(e)=>setPassword(e.target.value)} />
            <button className='settingsSubmit' type='submit'>Update</button>
            {success && (
              <span style={{color: 'green', alignSelf: 'center', marginTop: '15px'}}>Account updated successfully.</span>
            )}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}

export default Settings
