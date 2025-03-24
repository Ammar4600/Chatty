import React, { useState } from 'react'
import { useAuthStore } from '../Store/Zustand.js'
import { CircleUser, ArrowDown, Pencil, ArrowLeft, UserRound, Camera, Mail, Info, CircleArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';


function Profilepage() {
  const { authUser, isUploading, uploadProfilepic, updataAbout, isAboutUPdating } = useAuthStore();
  const [about, setabout] = useState('')
  const [showSlide, setshowSlide] = useState(false);
  
  const handleUpload = async (file) => {
    if (!file) {
      toast.error('Please Select a File');
      return;
    }
    toast('Uploading...');
    await uploadProfilepic(file)
  }

  const HandleAbout = async () => {
    toast('Updating About')
    await updataAbout(about)

  }


  return (
    <div className=' overflow-hidden relative bg-base-200 w-full lg:w-[53%] h-[92vh]   mx-auto'>
      <div className=' text-secondary-content/300 lg:gap-4 relative flex flex-col gap-2 justify-center items-center pt-2'>
        <h1 className='lg:text-2xl font-bold'>Profile</h1>
        <p className='lg:text-xl'>Your profile information</p>
        <img
          className="rounded-full re w-30 h-30 lg:h-50 lg:w-50 object-cover center z-10 bg-white"
          src={authUser.profilePic || "/user.png"}
          alt="User Profile"
        />
      </div>
      <label className=' absolute top-38 left-54 z-20 lg:top-58 lg:left-128'>

        <input type="file"
          name="profilepic"
          accept="image/png, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            handleUpload(file);
          }}
          className='hidden'

        />
        {
          isUploading ?
            <ClipLoader color='white' cssOverride={{ borderWidth: "6px" }} className=' text-white  rounded-full ' size={45} />
            :
            <Camera 
            className="bg-[#BF9E68] text-white p-2 rounded-full"
            size={window.innerWidth >= 1024 ? 45 : 34} 
          />
          


        }
      </label>
      <p className='  text-accent-content/200 text-center pt-2 lg:pt-4'>Click the camera icon to update your photo</p>
      <div className=' text-primary-content/200 infoSec w-[90%] flex flex-col gap-3 mx-auto pt-4 relative'>
        <label className=' relative w-full'>
          <div className='flex  items-center gap-1 pb-1'>
            <UserRound className="   w-5 h-5" />
            <h1>Full Name</h1>
          </div>

          <input
            value={authUser.fullname}
            type="text"
            disabled='true'
            className=" pl-10 w-full
               border  p-3 rounded-md  outline-none"
          />
        </label>
        <label className=' relative w-full-'>
          <div className='flex  items-center gap-1 pb-1'>
            <Mail className="   w-5 h-5" />
            <h1>Email</h1>
          </div>

          <input
            value={authUser.email}
            type="text"
            disabled='true'
            className="pl-10 w-full
               border  p-3 rounded-md  outline-none"
          />
        </label>
        <label className=' relative w-full-'>
          <div className='flex  items-center gap-1 pb-1'>
            <Info className="   w-5 h-5" />
            <h1>About</h1>
          </div>

          <input
            value={authUser.about}
            type="text"
            disabled='true'
            className="pl-5  pr-20 w-full
               border p-3 rounded-md  outline-none"
          />
          <Pencil onClick={() => setshowSlide(true)} className=' cursor-pointer absolute right-5 top-[43px]' />
        </label>
      </div>
      <h1 className='text-base-content/70 w-full mx-auto px-10 pt-2'>
        Joined on{" "}
        {new Date(authUser.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h1>


      <div className={`updateabout-slide pt-10 z-30 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
  h-screen w-full transition-all duration-1000 bg-base-300 ${showSlide ? "top-1/2 " : "top-[170%] "
        }`}>
        <div className='flex gap-4  p-5 items-center'>
          <ArrowDown className='cursor-pointer hover:text-base-300 hover:bg-primary p-2 rounded-full transition-all duration-500' onClick={() => setshowSlide(false)} size={40} />
          <h1 className='font-semibold text-2xl'>About</h1>
        </div>
        <p className='p-5 px-10 text-'>Currently set to </p>
        <h1 className='border-2 min-h-52 mx-10 overflow-hidden break-all p-4'>{authUser.about}</h1>
        <label className='relative' >
          <input placeholder='Add bio here' type="text" onChange={(e) => { setabout(e.target.value) }} className='border-b-1 border-[#ffffff2c] p-5 mt-5 mx-10 w-[90%] ' />
          {
            isAboutUPdating ?
              <ClipLoader  cssoverride={{ borderWidth: "6px" }} className='   rounded-full absolute right-14 top-[3px] ' size={20} />
              :
              <CircleArrowUp onClick={HandleAbout}  size={20} cssoverride={{ borderWidth: "6px" }} className=' cursor-pointer absolute right-14 top-[3px]' />
          }
        </label>

      </div>


    </div>
  )
}

export default Profilepage
