import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import HomeStore from '../Store/Home';
import Headskelton from './Skeltons/Headskelton';
import { useAuthStore } from '../Store/Zustand';
import socket from '../Config/Socket';

const HeadChat = () => {

  const { SelectedUser, getAllMessages, isGettingMsgs, isUserOnline ,setopenChatboxHideSide } = HomeStore()
  const { userstatus } = useAuthStore()






  if (isGettingMsgs) {
    return <Headskelton />
  }

  return (
    <div className='  justify-between flex gap-3 p-2 items-center'>
      <div className='flex gap-5 items-center'>
        <div >
          <img className='h-10 object-cover w-10 text-primary rounded-full' src={SelectedUser.profilePic || 'user.png'} alt="" />
        </div>
        <div>
          <h1 className='text-primary font-bold'>{SelectedUser.fullname}</h1>
          <p className='text-secondary'>
            {isUserOnline[SelectedUser._id]
              ? 'Online'
              : userstatus[SelectedUser._id]
                ? `Last Seen: ${userstatus[SelectedUser._id]}`
                : SelectedUser.status}
          </p>

        </div>
      </div>
      <X onClick={() => {
         getAllMessages() 
         setopenChatboxHideSide()  // close the chat window when the close icon is clicked
         }} size={40} className=' p-2 text-primary  transition-all duration-300 cursor-pointer  hover:bg-primary hover:text-white rounded-full' />

    </div>
  )
}

export default HeadChat
