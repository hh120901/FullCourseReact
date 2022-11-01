import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle} from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar , UserProfile, Login }from '../components';
import { client } from '../client'
import Pins from './Pins.jsx';
import logo from '../assets/logo.png'
import { userQuery } from '../utils/data';
const Home = () => {
  const [toggleSidebar, settoggleSidebar] = useState(false);
  const [user, setUser] = useState()
  const scrollRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  localStorage.clear();

  useEffect(()=>{
    const query = userQuery(userInfo?.sub);

    client.fetch(query)
      .then((data)=>{
        setUser(data[0])
      })
  },[]);

  useEffect(()=>{
    scrollRef.current.scrollTo(0,0)
  },[]);
  return (
    <div className='flex bg-gray-50 md:flex-row  flex-col h-screen transaction-height duration-75 ease-out'>
        <div className='hidden md:flex h-screeen flex-initial'>
          <Sidebar user ={user && user} closeToggle={settoggleSidebar}/> 
        </div>

        <div className='flex md:hidden flex-row'>
          <div className='p-3 w-full flex flex-row justify-between shadow-md items-center'>
            <HiMenu fontSize={40} className='cusor-pointer' onClick={()=> settoggleSidebar(true)} ></HiMenu>
            <Link to="/">
              <img src={logo} alt="logo" className='w-28' />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="logo" className='w-28' />
            </Link>
          </div>
        
          {toggleSidebar && (
            <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'> 
                <AiFillCloseCircle fontSize={30}  className="cursor-pointer" onClick={()=>{settoggleSidebar(false)}}> </AiFillCloseCircle>
              </div>
              <Sidebar user ={user && user} closeToggle/>
            </div>
          )}
        </div> 
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile:userId' element={<UserProfile />}/>
            <Route path='/*' element={<Pins user ={user && user} />} />
          </Routes>
        </div> 
    </div>
  )
}

export default Home