import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Posts from '../components/Posts'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import '../styles/home.css'
import { useLocation } from 'react-router-dom'

const Home = () => {

  const [posts, setPosts] = useState([])
  const {search} = useLocation()



  useEffect(()=>{

    const getPosts = async () => {
      const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/posts'+search)
      setPosts(response.data)
    }
    getPosts()
  }, [search])

  return (
    <>
        <Header />
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar />        
        </div>
    </>
  )
}

export default Home
