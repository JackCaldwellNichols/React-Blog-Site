import axios from 'axios'
import React, {useContext, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context.js'
import '../styles/login.css'

const Login = () => {

  const {dispatch, isFetching} = useContext(Context)
  const userRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try {
      const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/login', {
        username:userRef.current.value,
        password: passwordRef.current.value 
      })
        dispatch({type: "LOGIN_SUCCESS", payload: response.data})
        navigate('/')
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE"})
    }
  }


  return (
    <div className='login'>
        <span className='loginTitle'>Login</span>
        <form className='loginForm' onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' placeholder='Username' className='loginInput' ref={userRef}/>
            <label>Password</label>
            <input type='password' placeholder='Password' className='loginInput' ref={passwordRef}/>
            <button className='loginButton' type='submit' disabled={isFetching}>Login</button>
        </form>
        <button className='regLoginButton'>
          <Link to='/register' className='link'>
            Sign Up
          </Link>
          </button>
    </div>
  )
}

export default Login
