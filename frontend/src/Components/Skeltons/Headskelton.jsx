import React from 'react'

const Headskelton = () => {
  return (
    <div className="flex w-full p-5  flex-col gap-4 border-b-1 border-base-100/30">
    <div className="flex items-center gap-4">
      <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
      <div className="flex flex-col gap-4">
        <div className="skeleton h-4 w-20"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>
    
  </div>
  )
}

export default Headskelton
