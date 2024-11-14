import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'
import { SocketContext } from '../../../context/SocketContext'

const Chatuser = () => {
  const { selectedConversation, show, SetShow } = useContext(StoreContext)
  console.log(selectedConversation);

  const { OnlineUsers } = useContext(SocketContext)

  const getOnlineUserStatus = (userId) => {
    return OnlineUsers.includes(userId) ? "Online" : "Offline"
  }

  return (
    <div className='flex space-x-3 items-center justify-center bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh] relative'>
      <button onClick={() => SetShow(true)} ><img className={`w-9 absolute left-2 top-4 ${show ? "hidden" : "block"}`} src="menu-icon.png " alt="" /> </button>
      <div id='profile'>
        <div >
          <img className='w-10 sm:w-16 bg-white rounded-full' src="profile.png" alt="" />

        </div>
      </div>
      <div>
        <h1 className='text-base sm:text-xl'>{selectedConversation.fullname}</h1>
        <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
      </div>
    </div>
  )
}

export default Chatuser