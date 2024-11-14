import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'

const Nochat = () => {
  const { authuser, show, SetShow } = useContext(StoreContext)
  return (
    <>

      <div className={`flex h-screen items-center justify-center bg-slate-700  ${show ? "w-[70%]" : "w-full"} relative `}>

        <button onClick={() => SetShow(true)} className="absolute top-2 left-1 " > <img className={`w-9 ${show ? "hidden" : "block"}`} src="menu-icon.png" alt="" /></button>
        <div>
          <h1 className='text-center text-white'>Welcome <span>{authuser.fullname}</span>
            <br />
            <p className=''>No chat Selected, please start conversation by selecting anyone to your contacts  </p>
          </h1>
        </div>
      </div>
    </>
  )
}

export default Nochat