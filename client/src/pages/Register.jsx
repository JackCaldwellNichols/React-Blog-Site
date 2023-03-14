import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/register.css'
import axios from 'axios'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
      try{
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/register', {
          username,
          email, 
          password
        })

        response.data && (
          navigate('/login')
        )
      }catch(error){
      alert(error.response.data)
      setError(true)
      }
  }

  return (
    <div className='register'>
        <span className='registerTitle'>Sign Up</span>
        <form className='registerForm' onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='Username' className='registerInput' onChange={(e)=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type='text' placeholder='Email' className='registerInput' onChange={(e)=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='password' placeholder='Password' className='registerInput' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='registerButton' type='submit'>Sign Up</button>
        </form>
        <button className='loginRegButton'>
            <Link to='/login' className='link'>
              Login
            </Link>
          </button>
          {error && (
              <span style={{color: 'red', marginTop:'10px'}}>Something went wrong!</span>
          )}
    </div>
  )
}

export default Register
