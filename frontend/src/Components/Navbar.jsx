import React, { useEffect } from 'react'
import { Settings,MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../Store/Zustand';
import HomeStore from '../Store/Home';

function Navbar() {
  const {logout , authUser} = useAuthStore()
  const {openChatboxHideSide} = HomeStore()
  const navigate = useNavigate();




  async function handlelogout(e) {
    console.log('im in')
    e.preventDefault()
    await logout();
    navigate('/signup');


  }
  return (
    <div className='relative bg-base-100 w-screen border-b-1 h-[9vh]  border-gray-300  flex px-10 py-3 items-center justify-center lg:justify-start  '>
      <Link to={'/'}>
      <div className='flex gap-3  items-center '>
       <MessageSquare  size={30} className='hidden lg:block' />
        <h1 className='btn btn-primary rounded-full font-bold text-xl '>Chatty</h1>
      </div>
      </Link>
      <div className={`${!authUser ? 'hidden' : openChatboxHideSide ? 'hidden' : 'block'}  lg:top-2 lg:right-3 z-50 fixed bg-primary p-2 top-[90vh] flex rounded-2xl gap-5`}>


        <Link  to={'/profile'}>
        <div className=' hover:bg-base-300 cursor-pointer flex gap-2 items-center bg-base-200 p-2 rounded-2xl '>
          <Settings size={20}/>
          <h1>Profile</h1>
        </div>
        </Link>

        <Link to={'/setting'}>
        <div className=' hover:bg-base-300 cursor-pointer flex gap-2 items-center bg-base-200 p-2 rounded-2xl '>
          <Settings size={20}/>
          <h1>Setting</h1>
        </div>
        </Link>
        <Link onClick={handlelogout} >
        <div className=' hover:bg-base-300 cursor-pointer flex gap-2 items-center bg-base-200 p-2 rounded-2xl '>
          
          <h1 >Logout</h1>
        </div>
        </Link>

     
     </div>
    </div>
  )
}

export default Navbar
