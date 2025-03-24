import React from 'react'
import { MessageCircleHeart,Globe,Droplet,Antenna,Mail,Handshake , Send ,User, Infinity} from 'lucide-react';

const RightSide = () => {
  const icons =[
    <MessageCircleHeart size={60}/>,
    <Send size={60}/>,
    <User size={60} />,
    <Mail size={60}/>,
    <Infinity size={60}/>,
    <Antenna size={60} />,
    <Handshake size={60} />,
    <Droplet size={60} />,
    <Globe size={60}/>,
  ]
    const repeat = 9;
  return (
    <div className=' hidden lg:flex lg:pt-25 lg:w-full  h-full flex-col justify-center items-center '>
     <div className="boxes w-[70%] flex gap-5 justify-center items-center flex-wrap p-4 h-[60%] rounded-2xl ">
    {
      icons.map((icon, index) => (
        <div key={index} className="box card bg-base-100 shadow-xl flex justify-center items-center  hover:bg-base-200 transition-all duration-750  h-[30%] w-[30%] rounded-2xl">
          {icon}
        </div>
      ))

 
    }
     </div>
     <h1 className='text-2xl p-5 pt-7 text-neutral-content'>Join our community</h1>
     <p className='text-secondary w-md text-center'>Connect with friends, share moments and stay in touch with loved ones.</p>
    </div>
  )
}

export default RightSide
