import React, { useContext } from 'react'
import { StoreContext } from '../../../context/StoreContext'
import { SocketContext } from '../../../context/SocketContext'

const Users = ({ user }) => {
  const { selectedConversation, setSelectedConversation, unreadCounts, resetUnread } = useContext(StoreContext)
  const { OnlineUsers, typingUser } = useContext(SocketContext)

  const isSelected = selectedConversation?._id === user._id
  const isOnline = OnlineUsers.includes(user._id)

  // 🔑 unread count for this user
  const unread = unreadCounts[user._id] || 0

  const handleSelect = () => {
    setSelectedConversation(user)
    resetUnread(user._id) // reset count when opening chat
  }

  return (
    <div
      className={`hover:bg-slate-600 ${isSelected ? "bg-slate-600" : ""}`}
      onClick={handleSelect}
    >
      <div className="flex mt-4 pl-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div id="profile">
          <div className="relative">
            <img
              className="w-10 sm:w-14 bg-white rounded-full"
              src="profile.png"
              alt=""
            />
            {/* ✅ green dot for online */}
            {isOnline && (
              <span className="absolute top-0 right-0">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </span>
            )}
            {/* ✅ unread badge */}
            {unread > 0 && !isSelected && (
              <span className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {unread}
              </span>
            )}
          </div>
        </div>

        <div className="pl-4">
          <h1 className="font-bold">{user.fullname}</h1>
          {/* ✅ typing indicator */}
          <span className="text-base hidden sm:block">
            {typingUser === user._id ? "typing..." : user.email}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Users
