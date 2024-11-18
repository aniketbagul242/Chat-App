import React from 'react'
import Search from '../Search/Search'
import User from '../User/User'
import Logout from '../Logout/Logout'

const Left = () => {
  return (

    <div className=' xl:w-[30%] w-full  bg-slate-900 border border-white text-white animate-slide-in-left sm:w-[50%] md:w-[40%] h-screen'>
      <Search />

      <div className='overflow-y-auto flex-1' style={{ minHeight: "calc(90vh - 10vh)" }}>
        <User />
      </div>

      <Logout />
    </div>


  )
}

export default Left