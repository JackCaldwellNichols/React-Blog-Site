import React from 'react'
import '../styles/header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="headerTitles">
        <span className='headerTitleSm'>React & Node</span>
        <span className='headerTitleLg'>Blog</span>
      </div>
      <img className='headerImg' src='https://images.pexels.com/photos/721999/pexels-photo-721999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt=''/>
    </div>
  )
}

export default Header
