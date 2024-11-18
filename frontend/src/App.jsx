import React, { useContext, useState } from 'react'
import Left from './Home/Leftpart/Left/Left'
import Right from './Home/Rightpart/Right/Right'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import { StoreContext } from './context/StoreContext'
import { Routes, Route, Navigate } from "react-router-dom"




const App = () => {

  const { authuser, show } = useContext(StoreContext)



  return (
    <>
      <div className='bg-slate-700 max-h-screen '>
        <Routes>
          <Route path='/' element={authuser ? <div className='flex h-screen'>
            {show ? <Left /> : <></>}

            <Right />

          </div> : <Navigate to="/login" />} />

          <Route path='/login' element={authuser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authuser ? <Navigate to="/" /> : <Signup />} />

        </Routes>
      </div>
    </>

  )
}

export default App