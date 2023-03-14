import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import '../styles/topbar.css'

const Topbar = () => {
  const {user, dispatch} = useContext(Context)
  const PF = 'http://localhost:4000/images/'
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'})
  }
  console.log("TOP BAR DATA", user)
  return (
    <div className='top'>
        <div className="topleft">
             <i className="topIcon fa-brands fa-facebook"></i>
             <i className="topIcon fa-brands fa-twitter"></i>
             <i className="topIcon fa-brands fa-square-pinterest"></i>
             <i className="topIcon fa-brands fa-instagram"></i>
        </div>
      <div className="topcenter">
        <ul className='topList'>
            <li className='topListItem'>
              <Link to='/' className='link'>
              HOME
              </Link>
            </li>
            <li className='topListItem'>
              <Link to='/' className='link'>
                ABOUT
              </Link>
            </li>
            <li className='topListItem'>
            <Link to='/' className='link'>
                CONTACT
              </Link>
            </li>
            <li className='topListItem'>
              <Link to='/publish' className='link'>
                WRITE
              </Link>
            </li>
          
            <li className='topListItem' onClick={handleLogout}>
                {user && 'LOGOUT'}
            </li>
        </ul>
      </div>
      <div className="topright">
        {user ? (
              <Link to='/settings' className='link'>
                {user.profilePic ? (

              
                  <img src={PF + user.profilePic} className='topImage' alt=''/>

                  ) : (
                    <img src='https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' className='topImage' alt=''/>
                  )
                }
              </Link>

        ) : (
            <ul className='topList'>
              <li className='topListItem'>
              <Link to='/login' className='link'>
                  LOGIN
              </Link>
              </li>
              <li className='topListItem'>
              <Link to='/register' className='link'>
                  REGISTER
              </Link>
              </li>
            </ul>

        )
      }
        <i className="topSearch fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default Topbar
