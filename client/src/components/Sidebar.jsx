import React, { useContext, useEffect, useState } from 'react'
import '../styles/sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'

const Sidebar = () => {
  const {user} = useContext(Context)
  const PF = 'http://localhost:4000/images/'
  const [cat, setCat] = useState([])

  useEffect(()=>{
    const getCats = async () => {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/categories')
      setCat(response.data)
    }
    getCats()
  }, [])
 
  return (

    <div className='sidebar'>
      {user &&
      <div className="sidebarItem">
        <span className='sidebarTitle'>
            ABOUT ME
        </span>
        
        <img src={PF + user.profilePic} className='sidebarImage' alt=''/>
        
       
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate atque dolores consectetur.</p>
      </div>
}
      <div className="sidebarItem">
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList' >
                {cat.map((c)=>(
              <Link to={`/?cat=${c.name}`} className='link' key={c._id}>
                <li className='sidebarListItem'>
                  {c.name}
                </li>
              </Link>
              ))}
            
        </ul>
      </div>
      <div className="sidebarItem">
        <span className='sidebarTitle'>
            FOLLOW US
        </span>
        <div className="sidebarSocial"> 
             <i className="sideIcon fa-brands fa-facebook"></i>
             <i className="sideIcon fa-brands fa-twitter"></i>
             <i className="sideIcon fa-brands fa-square-pinterest"></i>
             <i className="sideIcon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
    
  )
}

export default Sidebar
