import { useEffect, useState } from 'react'
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Settingpage from './Pages/Settingpage';
import Signuppage from './Pages/Signuppage';
import Loginpage from './Pages/Loginpage';
import Navbar from './Components/Navbar';
import { useAuthStore } from './Store/Zustand';
import { ClipLoader } from 'react-spinners';
import Profilepage from './Pages/Profilepage';
import { Toaster } from 'react-hot-toast';

function App() {
  const { authUser, checkauth, isCheckingAuth , theme} = useAuthStore()

 

 
  useEffect(() => {
 
    
    checkauth();

  }, [checkauth ])

  if (isCheckingAuth ) {
    return (<div className="flex items-center justify-center h-screen">
               <ClipLoader color="#36d7b7" size={50} />
    </div>)
  }

  
  return (
    <div data-theme={theme || "light"}`}   >
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path='/signup' element={!authUser ? <Signuppage /> : <Navigate to={'/'} />} />
        <Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to={'/'} />} />
        <Route path='/setting' element={<Settingpage />} />
        <Route path='/profile' element={authUser ? <Profilepage /> : <Navigate to={"/login"}/>}  />
      </Routes>
      <Toaster /> 
    </div>

  )
}

export default App
