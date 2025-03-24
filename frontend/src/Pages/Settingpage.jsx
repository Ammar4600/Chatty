import React from 'react'
import { useAuthStore } from '../Store/Zustand';

function Settingpage() {
  const themes = [
    'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
    'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
    'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula',
    'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter'
  ];
  const { theme, setTheme } = useAuthStore()

  return (
    <div className='w-[80%] relative mx-auto min-h-[100vh]'>
      <div className='p-7'>
        <h1 className='text-2xl font-semibold'>Theme</h1>
        <p className=''>Chose a theme of your choice</p>
      </div>
      <div className='w-full h-[40%]    gap-7  items-center justify-center  flex flex-wrap'>
       {
        themes.map((e, idx)=>{
          return(
            <div onClick={()=>{setTheme(e)}} key={idx} data-theme={e} className='w-fit flex flex-col rounded-2xl cursor-pointer '>


            <div className='flex gap-1 b w-fit flex-col p-2 bg-base-200 rounded-md'>
              <div className='flex gap-2 b w-fit'>
              <div className='h-5 w-5 rounded-md bg-primary'></div>
              <div className='h-5 w-5 rounded-md bg-secondary'></div>
              <div className='h-5 w-5 rounded-md bg-netural'></div>
              <div className='h-5 w-5 rounded-md bg-accent'></div>
              </div>
            <button  onClick={()=>{setTheme(e)}} className='  bg-base-200 cursor-pointer font-medium truncate '>{e.toUpperCase()}</button>
            </div>
          </div>
          )
        })
       }

      </div>
      
    </div>
  )
}

export default Settingpage
