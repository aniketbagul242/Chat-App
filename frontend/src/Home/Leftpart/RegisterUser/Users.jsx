import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'
import { SocketContext } from '../../../context/SocketContext'

const Users = ({ user }) => {

  const { selectedConversation, setSelectedConversation } = useContext(StoreContext)
  const { OnlineUsers } = useContext(SocketContext)

  const isSelected = selectedConversation?._id === user._id
  const isOnline = OnlineUsers.includes(user._id)
  

  return (
    <div className={`hover:bg-slate-600 ${isSelected ? "bg-slate-600" : ""}`} onClick={() => setSelectedConversation(user)} >
      <div className='flex mt-4 pl-3 hover:bg-slate-700 duration-300 cursor-pointer '>
        <div id='profile'>
          <div className='relative' >
            <img className='w-10 sm:w-14 bg-white rounded-full' src="profile.png" alt="" /> <span className='absolute top-0 right-0'> <div className={`${isOnline?"h-3 w-3 bg-green-500 rounded-full":""}`} > </div> </span>
          </div>

        </div>
        <div className='pl-4'>
          <h1 className='font-bold'>{user.fullname}</h1>
          <span className='text-base hidden sm:block' >{user.email}</span>
        </div>
      </div>


    </div>
  )
}

export default Users