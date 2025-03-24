import React, { useEffect } from 'react'
import HomeSide from '../Components/HomeSide'
import Homesection from '../Components/Homesection'
import socket from '../Config/Socket'



function Homepage() {

  
  

  return (
    <div className='  bg-base-100 relative h-[92vh]  overflow-hidden lg:p-5 w-screen '>
      <div className='relative h-full flex w-full bg-base-100   mx-auto lg:bg-base-300/80  rounded-2xl'>
        <HomeSide />
        <Homesection />

      </div>
    </div>
  )
}

export default Homepage
