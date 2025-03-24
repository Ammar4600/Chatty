import React, { useState } from 'react'
import { MessageSquare, Mail,Lock,Eye, EyeOff, UserRound ,LoaderCircle } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom'
import RightSide from '../Components/RightSide'
import toast from 'react-hot-toast';
import { useAuthStore } from '../Store/Zustand';




useState

function Signuppage() {
 const {createAccount , isSigningup} = useAuthStore()
 const [showPassword , setshowPassword] = useState(false)
 
  const [formdata, setformData] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  function validateForm() {
    if (!formdata.fullname || !formdata.email || !formdata.password) {
      toast.error("All fields are required");
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formdata.email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (formdata.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      createAccount(formdata)
    }
  }

  return (
    <div className='grid lg:grid-cols-2 bg-base-100  w-screen h-[92vh] overflow-hidden justify-center '>
      {/* {Left Side } */}

      <div className='flex relative flex-col  gap-2 justify-center items-center'>
        <div className='flex py-2 flex-col gap-3 justify-center items-center '>
          <div className='p-4 rounded-2xl bg-base-200'>
            <MessageSquare size={30} color="#7E6756" />
          </div>
          <h1 className='text-primary text-xl'>Create Account</h1>
          <p className=' secondary text-[15px]'>Get Started with your free account</p>
        </div>

        <form onSubmit={HandleSubmit} className='relative flex flex-col gap-5'>
          <label>
            <h1>Full Name</h1>
            <UserRound className="absolute left-3 top-13 transform -translate-y-1/2 text-base-300 w-5 h-5" />
            <input
              onChange={(e) => setformData({ ...formdata, fullname: e.target.value })}
              value={formdata.fullname}
              type="text"
              placeholder="Enter your name"
              className="pl-10 border  input-bordered p-4 rounded-md w-full "
            />
          </label>
          <label>
            <h1>Email</h1>
            < Mail className="absolute left-3 top-39 transform -translate-y-1/2 text-base-300 w-5 h-5" />
            <input
              onChange={(e) => { setformData({ ...formdata, email: e.target.value }) }}
              value={formdata.email}
              type="text"
              placeholder="Enter your email"
              className="pl-10 border  input-bordered p-4 rounded-md w-full outline-none"
            />
             
          </label>
          <label>
            <h1>Password</h1>
            <Lock className="absolute left-3 top-[257px] transform -translate-y-1/2 text-base-300 w-5 h-5" />
            <input
              onChange={(e) => { setformData({ ...formdata, password: e.target.value }) }}
              value={formdata.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 border  input-bordered p-4  rounded-md w-full outline-none"
            />
            {showPassword ? <Eye onClick={()=> {setshowPassword(false)}}  className='absolute cursor-pointer right-3 top-62'/> : <EyeOff onClick={()=> {setshowPassword(true)}}  className='absolute cursor-pointer right-3 top-62' /> } 
          </label>
          <motion.button
            whileTap={{ scale: 0.9, rotate: 0 }}

            className="px-6 py-4 btn text-center rounded-md shadow-md font-semibold transition-all"
          >
            {isSigningup ? <ClipLoader color="#ffffff" size={15} /> : 'Create Account' }
          </motion.button>
        </form>
        <p className='p-5'>
          Already have an account? <Link to={'/login'}><span className='text-secondary hover:text-primary'>Sign In</span></Link>
        </p>
      </div>

      {/* {Right Side } */}
      <RightSide />
    </div>
  )
}

export default Signuppage
