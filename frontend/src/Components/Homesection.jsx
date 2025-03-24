import React from 'react';
import { MessageSquare } from 'lucide-react';
import HomeStore from '../Store/Home';
import HeadChat from './HeadChat';
import ChatWindow from './ChatWindow';
import Chatiput from './Chatiput';


const Homesection = () => {
  const { openModal ,openChatboxHideSide , setopenChatboxHideSide } = HomeStore();

  return openModal ? (
    <div className={`${openChatboxHideSide == false ? 'hidden' : 'block'} w-full h-full flex flex-col relative  `}>
      <HeadChat/>
     <ChatWindow />
     <Chatiput/>


    </div>
  ) : (
    <div className="lg:flex h-full w-full rounded-r-2xl hidden">
      <div className="h-full w-full flex flex-col justify-center items-center gap-4">
        <MessageSquare className="font-bold text-xl" size={50} />
        <h1 className="text-2xl">Welcome to Chatty!</h1>
        <p className="text-xl">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default Homesection;
