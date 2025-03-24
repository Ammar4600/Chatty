import React, { useEffect, useState } from 'react'
import HomeStore from '../Store/Home'
import MessageSkelton from './Skeltons/MessageSkelton';
import socket from '../Config/Socket';

const ChatWindow = () => {
  const { SelectedUser, AllMessages, myself, isGettingMsgs } = HomeStore();
  




  if (isGettingMsgs) {
    return <MessageSkelton />
  }
  return (
    <div className='w-full flex rounded-1xl flex-col bg-[#F7F6F2] flex-grow overflow-scroll'>
      {
        AllMessages
        .filter(msg => msg.receiver === SelectedUser._id || msg.sender === SelectedUser._id)
        .map((e, idx) => {
          return (
            <div key={idx} className={`${String(e.receiver) === String(SelectedUser._id) ? 'items-end' : 'items-start'} h-fit w-full flex flex-col justify-end`}>
              <div className={`${String(e.receiver) === String(SelectedUser._id) ? 'rounded-br-none bg-blue-500 text-white' : 'rounded-bl-none bg-gray-300 text-black'} p-3 mt-4 mr-6 ml-6 w-fit flex flex-col items-end justify-center rounded-3xl`}>

                {e.image ? <img className=' shadow-lg  bg-base-200 p-0 rounded-2xl' src={e.image} alt="ss" /> : ''}
                <h1 className='text-sm'>{e.text}</h1>
              </div>
              <p className="text-sm mr-6 ml-6 text-base-100/30">
                {e.createdAt
                  ? new Date(e.createdAt).toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                  })
                  : "Time Unavailable"}
              </p>

            </div>
          );
        })
      }
    </div>
  );
}

export default ChatWindow;
