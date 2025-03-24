import React, { useState } from 'react'
import RightSide from '../Components/RightSide'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { MessageSquare, Mail, Lock,Eye, EyeOff, UserRound ,LoaderCircle } from 'lucide-react';
import { motion } from "framer-motion";
import { useAuthStore } from '../Store/Zustand';
import toast from 'react-hot-toast';

function Loginpage() {

  const {loginAccount,isLogingin} = useAuthStore();
  const [showPassword , setshowPassword] = useState(false)
  const [formdata , setformData] = useState({
    email: '',
    password: '',
  })


  function validateForm() {
    if (!formdata.email || !formdata.password) {
      toast.error("Please fill the required feilds")
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formdata.email)) {
      toast.error("Please enter a valid email")
      return false;
    }
    if(formdata.password.length < 6){
      toast.error("Password must be at least 6 characters long")
      return false;
    }



    return true;
    
  }

  function HandleSubmit(e) {
    e.preventDefault();
    const success = validateForm();
    if (success) {
      loginAccount(formdata)
      setformData({email: '', password: ''})
    }
  }
  return (
    <div className='grid lg:grid-cols-2 bg-base-100  lg:justify-start h-[92vh]   w-screen  overflow-hidden items-center justify-center'>
            <div className=' w-screen lg:w-full flex relative flex-col justify-center items-center'>
        <div className='flex py-2 flex-col gap-3 justify-center items-center '>
          <div className='p-4 rounded-2xl bg-base-200'>
            <MessageSquare  size={30} color="#7E6756" />
          </div>
          <h1 className=' 	text-primary text-xl'>Welcome Back</h1>
          <p className=' text-secondary text-[15px]'>Login to your account</p>
        </div>

        <form onSubmit={HandleSubmit} className='relative  flex flex-col gap-5'>
        
          <label>
            <h1>Email</h1>
            < Mail className="absolute left-3 top-[54px] transform -translate-y-1/2 text-base-300 w-5 h-5" />
            <input
              onChange={(e) => { setformData({ ...formdata, email: e.target.value }) }}
              value={formdata.email}
              type="text"
              placeholder="Enter your email"
              className="pl-10 border  input-bordered p-4  rounded-md w-full outline-none"
            />
          </label>
          <label>
            <h1>Password</h1>
            <Lock className="absolute left-3 top-[155px] transform -translate-y-1/2 text-base-300 w-5 h-5" />
            <input
              onChange={(e) => { setformData({ ...formdata, password: e.target.value }) }}
              value={formdata.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 input-bordered pr-15 border p-4  rounded-md w-full outline-none"
            />
           {showPassword ? <Eye onClick={()=> {setshowPassword(false)}}  className='absolute cursor-pointer right-5 top-36'/> : <EyeOff onClick={()=> {setshowPassword(true)}}  className='absolute cursor-pointer right-5 top-36' /> } 
          </label>
          <motion.button
            whileTap={{ scale: 0.9, rotate: 0 }}

            className="px-6 btn py-4 text-center rounded-md shadow-md font-semibold transition-all"
          >
            {isLogingin ? <ClipLoader color="#ffffff" size={15} /> : 'Login' }
          </motion.button>
        </form>
        <p className='p-5'>
          Already have an account? <Link to={'/signup'}><span className='text-secondary hover:text-primary'>Create account</span></Link>
        </p>
      </div>

      {/* {part 2 } */}
      <RightSide/>
    </div>
  )
}

export default Loginpage
